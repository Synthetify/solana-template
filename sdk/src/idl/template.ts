export interface Template {
  version: '0.0.0'
  name: 'template'
  instructions: [
    {
      name: 'createState'
      accounts: [
        {
          name: 'state'
          isMut: true
          isSigner: false
        },
        {
          name: 'admin'
          isMut: true
          isSigner: true
        },
        {
          name: 'programAuthority'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'bump'
          type: 'u8'
        },
        {
          name: 'nonce'
          type: 'u8'
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'state'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'admin'
            type: 'publicKey'
          },
          {
            name: 'nonce'
            type: 'u8'
          },
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'bump'
            type: 'u8'
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 300
      name: 'TemplateError'
      msg: 'Template error'
    }
  ]
}

export const IDL: Template = {
  version: '0.0.0',
  name: 'template',
  instructions: [
    {
      name: 'createState',
      accounts: [
        {
          name: 'state',
          isMut: true,
          isSigner: false
        },
        {
          name: 'admin',
          isMut: true,
          isSigner: true
        },
        {
          name: 'programAuthority',
          isMut: false,
          isSigner: false
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: 'bump',
          type: 'u8'
        },
        {
          name: 'nonce',
          type: 'u8'
        }
      ]
    }
  ],
  accounts: [
    {
      name: 'state',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'publicKey'
          },
          {
            name: 'nonce',
            type: 'u8'
          },
          {
            name: 'authority',
            type: 'publicKey'
          },
          {
            name: 'bump',
            type: 'u8'
          }
        ]
      }
    }
  ],
  errors: [
    {
      code: 300,
      name: 'TemplateError',
      msg: 'Template error'
    }
  ]
}
