import { TextField } from '@material-ui/core'
import * as React from 'react'

export interface ITransaction {
  from: string
  to: string
  value: string
  quota: string
  chainId: string
  validUntilBlock: string
  data: string
  nonce: string
  version: number
}

const transaction = {
  chainId: 0,
  data: '',
  nonce: '',
  quota: '',
  validUntilBlock: 0,
  value: '',
  version: 0,
}

const Transaction = (props: ITransaction) => <React.Fragment />
