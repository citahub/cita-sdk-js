import { ChangeEvent } from 'react'
export const handleInputOf = (ctx: any) => (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
  const { value } = e.currentTarget as any
  ctx.setState({
    [key]: value,
    [`${key}Error`]: '',
  })
}
