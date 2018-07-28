export default (wallet: any) => (transaction: any) => {
  if (
    !wallet.length ||
    (transaction.privateKey &&
      (transaction.privateKey.length === 66 ||
        transaction.privateKey.length === 64))
  )
    return transaction
  // if (
  //   transaction.privateKey &&
  //   typeof +transaction.privateKey === 'number' &&
  //   +transaction.privateKey >= 0 + transaction.privateKey < wallet.length
  // ) {
  //   // if transaction.privateKey is index, read wallet
  //   transaction.privateKey = wallet[+transaction.privateKey].privateKey
  //   transaction.from = wallet[+transaction.privateKey].address
  // }

  if (!transaction.privateKey) {
    transaction.privateKey = wallet[0].privateKey
    transaction.from = wallet[0].from
  }
  return transaction
}
