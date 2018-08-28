import { ChangeEvent } from 'react'
export const handleInputOf = (ctx: any) => (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.currentTarget as any
  ctx.setState({
    [key]: value,
    [`${key}Error`]: '',
  })
}

export const copyToClipboard = (text: string = '') => {
  const textField = document.createElement('textarea')
  textField.innerText = text
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  textField.remove()
  return true
}
