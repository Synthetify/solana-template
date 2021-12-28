mod errors;
mod instructions;
mod interfaces;
mod structs;

use anchor_lang::prelude::*;
use anchor_spl::token;

use errors::ErrorCode;
use errors::*;
use instructions::*;
use structs::*;

declare_id!("R9PatsTac3Y3UpC7ihYMMgzAQCe1tXnVvkSQ8DtLWUc");
const SEED: &str = "Template";

#[program]
pub mod template {
    use super::*;

    pub fn create_state(ctx: Context<CreateState>, bump: u8, nonce: u8) -> ProgramResult {
        instructions::create_state::handler(ctx, bump, nonce)
    }
}
