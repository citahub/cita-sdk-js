import Dialog from '@material-ui/core/Dialog'
import * as React from 'react'
import './dialogue.css'

export interface IDialogue {
  fullScreen: boolean
  dialogueOn: boolean
}

const Dialogue: React.SFC<IDialogue> = props => (
  <Dialog classes={{ paper: 'dialogue__container' }} fullScreen={props.fullScreen} open={props.dialogueOn}>
    {props.children}
  </Dialog>
)

export default Dialogue
