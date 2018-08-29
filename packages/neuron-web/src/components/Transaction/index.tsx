import { TextField } from '@material-ui/core'
import * as React from 'react'

export const tx = {
  chainId: 0,
  data: '',
  from: '',
  nonce: '',
  quota: '',
  to: '',
  validUntilBlock: 0,
  value: '',
  version: 0,
}

const Transaction = ({ transaction = tx }) => (
  <React.Fragment>
    {Object.keys(transaction).map((key: string) => {
      return <TextField key={key} value={transaction[key]} label={key} />
    })}
  </React.Fragment>
)

export default Transaction
