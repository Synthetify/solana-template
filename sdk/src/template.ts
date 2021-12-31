import * as anchor from '@project-serum/anchor'
import { Program, Provider } from '@project-serum/anchor'
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction
} from '@solana/web3.js'
import { IWallet } from '.'

import { Template as TemplateType, IDL } from './idl/template'
import { getProgramAddress, Network } from './network'

import { signAndSend } from './utils'
export const SEED = 'Template'
const STATE_SEED = 'statev1'

export const DEFAULT_PUBLIC_KEY = new PublicKey(0)

export class Template {
  public connection: Connection
  public wallet: IWallet
  public program: Program<TemplateType>
  public stateAddress: PublicKey = PublicKey.default
  public programAuthority: PublicKey = PublicKey.default

  private constructor(
    network: Network,
    wallet: IWallet,
    connection: Connection,
    programId?: PublicKey
  ) {
    this.connection = connection
    this.wallet = wallet
    const programAddress = new PublicKey(getProgramAddress(network))
    const provider = new Provider(connection, wallet, Provider.defaultOptions())

    this.program = new Program(IDL, programAddress, provider)
  }

  public static async build(
    network: Network,
    wallet: IWallet,
    connection: Connection,
    programId?: PublicKey
  ): Promise<Template> {
    const instance = new Template(network, wallet, connection, programId)
    return instance
  }

  async getProgramAuthority() {
    const [programAuthority, nonce] = await PublicKey.findProgramAddress(
      [Buffer.from(SEED)],
      this.program.programId
    )
    return {
      programAuthority,
      nonce
    }
  }

  async getStateAddress() {
    const [address, bump] = await PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode(STATE_SEED))],
      this.program.programId
    )
    return {
      address,
      bump
    }
  }

  async createStateInstruction(admin: PublicKey) {
    const { programAuthority, nonce } = await this.getProgramAuthority()
    const { address, bump } = await this.getStateAddress()

    return this.program.instruction.createState(bump, nonce, {
      accounts: {
        state: address,
        admin,
        programAuthority: programAuthority,
        rent: SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId
      }
    })
  }

  async createState(admin: Keypair) {
    const ix = await this.createStateInstruction(admin.publicKey)
    await signAndSend(new Transaction().add(ix), [admin], this.connection)
  }

  async getState() {
    const address = (await this.getStateAddress()).address
    return (await this.program.account.state.fetch(address)) as State
  }
}
export interface State {
  admin: PublicKey
  nonce: number
  authority: PublicKey
  bump: number
}
