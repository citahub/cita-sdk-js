import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'

export enum NotifierType {
  ERROR,
}

export default ({
  message,
  type,
  on,
  handleClose,
}: {
  message: string
  type: NotifierType
  on: boolean
  handleClose: any
}) => (
  <Snackbar
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'top',
    }}
    open={on}
    autoHideDuration={6000}
    onClose={handleClose}
  >
    <SnackbarContent
      message={message}
      action={
        <IconButton key="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  </Snackbar>
)
