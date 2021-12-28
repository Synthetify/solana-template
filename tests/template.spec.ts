import * as anchor from '@project-serum/anchor'
import { Provider, Program, BN } from '@project-serum/anchor'
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { Keypair, PublicKey, Transaction } from '@solana/web3.js'
import { assert } from 'chai'
import { Network, Template } from '@template-labs/sdk'
import { sleep } from '@template-labs/sdk/lib/utils'

describe('target', () => {
  const provider = Provider.local()
  const connection = provider.connection
  // @ts-expect-error
  const wallet = provider.wallet.payer as Keypair
  const admin = Keypair.generate()
  let template: Template

  before(async () => {
    template = await Template.build(
      Network.LOCAL,
      provider.wallet,
      connection,
      anchor.workspace.Template.programId
    )

    // Request airdrops
    await connection.requestAirdrop(admin.publicKey, 1e9)
    await sleep(500)
  })
  it('#createState()', async () => {
    await template.createState(admin)

    const state = await template.getState()
    const { nonce, programAuthority } = await template.getProgramAuthority()
    const { address, bump } = await template.getStateAddress()

    assert.ok(state.admin.equals(admin.publicKey))
    assert.ok(state.authority.equals(programAuthority))
    assert.ok(state.nonce === nonce)
    assert.ok(state.bump === bump)
  })
})
