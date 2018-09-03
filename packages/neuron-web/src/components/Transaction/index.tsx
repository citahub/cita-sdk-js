import { Button, TextField } from '@material-ui/core'
import * as React from 'react'
import { TransactionAction } from '../../hoc/UniComp'

export const tx = {
  chainId: '',
  data: '',
  from: '',
  nonce: Math.floor(Math.random() * 1000).toString(),
  quota: '10000000',
  to: '',
  validUntilBlock: '',
  value: '',
  version: '0',
}

const Transaction = ({
  transaction = tx,
  handleTxEdit,
  handleTxAction,
  chain,
  status,
}: {
  transaction?: any
  handleTxEdit: (key: string) => (e: any) => void
  handleTxAction: (type: TransactionAction) => (e: any) => void
  chain: string
  status: TransactionAction
}) => (
  <div>
    {status === TransactionAction.SENDING ? 'Sending' : ''}
    <div>
      {Object.keys(transaction).map((key: string) => {
        return (
          <TextField fullWidth={true} onChange={handleTxEdit(key)} key={key} value={transaction[key]} label={key} />
        )
      })}
    </div>
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      <Button
        classes={{ root: 'button-1 primary transaction__button--submit' }}
        onClick={handleTxAction(TransactionAction.REJECT)}
      >
        Reject
      </Button>
      <Button
        classes={{ root: 'button-1 primary transaction__button--submit' }}
        onClick={handleTxAction(TransactionAction.SUBMIT)}
      >
        Submit
      </Button>
    </div>
  </div>
)

export default Transaction
