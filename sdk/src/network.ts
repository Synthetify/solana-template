export enum Network {
  LOCAL,
  DEV
}

export const getProgramAddress = (network: Network) => {
  switch (network) {
    case Network.LOCAL:
      return 'R9PatsTac3Y3UpC7ihYMMgzAQCe1tXnVvkSQ8DtLWUc'
    case Network.DEV:
      return 'R9PatsTac3Y3UpC7ihYMMgzAQCe1tXnVvkSQ8DtLWUc'
    default:
      throw new Error('Unknown network')
  }
}
