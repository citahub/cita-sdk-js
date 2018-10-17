import { Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, TextField } from '@material-ui/core'
import * as React from 'react'
import { IManifest, TransactionAction } from '../../hoc/UniComp'

const fields = ['from', 'to', 'value', 'quota', 'nonce', 'validUntilBlock', 'version', 'chainId', 'data']

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
  manifest,
}: {
  transaction?: any
  handleTxEdit: (key: string) => (e: any) => void
  handleTxAction: (type: TransactionAction) => (e: any) => void
  chain: string
  status: TransactionAction
  manifest: IManifest
}) => (
  <div>
    {status === TransactionAction.SENDING ? 'Sending' : ''}
    {manifest.name ? (
      <ExpansionPanel>
        <ExpansionPanelSummary>DApp Name: {manifest.name}</ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <pre>{JSON.stringify(manifest, null, 2)}</pre>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ) : null}
    <div>
      {// Object.keys(transaction)
      fields.map((key: string) => {
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
