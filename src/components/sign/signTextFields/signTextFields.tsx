import React from 'react'
import { OutlinedTextFieldProps, TextField } from '@material-ui/core'

interface SignTextFieldsProps {
   autoFocus?: boolean,
   error?: boolean,
   helperText?: string,
   value?: string,
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

interface SignPasswordFieldsProps extends SignTextFieldsProps{
   name: string,
   label: string
}

const BaseField: React.FC<Omit<OutlinedTextFieldProps, 'variant'>> = (props) => {
   return (
      <TextField
         variant='outlined'
         margin='normal'
         required
         fullWidth
         {...props}
      />
   )
}

export const UserNameField: React.FC<SignTextFieldsProps> = (props) => {
   return (
      <BaseField
         label='Имя'
         name='userName'
         {...props}
      />
   )
}

export const EmailField: React.FC<SignTextFieldsProps> = (props) => {
   const { autoFocus, ...other } = props;
   return (
      <BaseField
         autoComplete='email'
         autoFocus={autoFocus}
         label='e-mail'
         name='email'
         {...other}
      />
   )
}

const BasePasswordField: React.FC<SignPasswordFieldsProps> = (props) => {
   return (
      <BaseField
         type="password"
         autoComplete="current-password"
         {...props}
      />
   )
}

export const PasswordField: React.FC<SignTextFieldsProps> = (props) => {
   return (
      <BasePasswordField
         label='Пароль'
         name='password'
         {...props}
      />
   )
}

export const RepeatPasswordField: React.FC<SignTextFieldsProps> = (props) => {
   return (
      <BasePasswordField
         label='Повторите пароль'
         name='repeatPassword'
         {...props}
      />
   )
}