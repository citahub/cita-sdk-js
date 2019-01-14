import AddCircleIcon from '@material-ui/icons/AddCircle'
import * as React from 'react'
import './cusTextField.module.css'

export default ({
  value = '',
  onChange,
  onKeyPress,
  onClear,
  type = 'text',
  helperText = '',
  error = false,
  style = {},
}: {
  value: string
  onChange: any
  onKeyPress: any
  onClear: any
  type?: string
  helperText?: string
  error?: boolean
  style?: object
}) => (
  <div className="cusTextField__container" style={style}>
    <input type={type} onChange={onChange} onKeyPress={onKeyPress} value={value} />
    {value ? (
      <button onClick={onClear}>
        <AddCircleIcon />
      </button>
    ) : null}
    {error ? <span className="cusTextField__error">{helperText}</span> : null}
  </div>
)
