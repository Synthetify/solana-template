use anchor_lang::prelude::*;

#[error]
pub enum ErrorCode {
    #[msg("Template error")]
    TemplateError = 0, // 12c
}
