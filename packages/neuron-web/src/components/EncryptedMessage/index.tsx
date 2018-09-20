import { Button, TextField } from '@material-ui/core'
import * as React from 'react'
import { EncryptedMessageAction } from '../../hoc/UniComp'

const EncryptedMessage = ({
  encryptedMessage,
  handleEncryptedMessageEdit,
  handleEncryptedMessageAction,
}: {
  encryptedMessage?: string
  handleEncryptedMessageEdit: (e: any) => void
  handleEncryptedMessageAction: (type: EncryptedMessageAction) => (e: any) => void
}) => (
  <div>
    <TextField
      value={encryptedMessage}
      placeholder="Encrypted Message"
      fullWidth={true}
      multiline={true}
      onChange={handleEncryptedMessageEdit}
    />
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      <Button
        classes={{ root: 'button-1 primary transaction__button--submit' }}
        onClick={handleEncryptedMessageAction(EncryptedMessageAction.REJECT)}
      >
        Reject
      </Button>
      <Button
        classes={{ root: 'button-1 primary transaction__button--submit' }}
        onClick={handleEncryptedMessageAction(EncryptedMessageAction.SUBMIT)}
      >
        Submit
      </Button>
    </div>
  </div>
)

export default EncryptedMessage
