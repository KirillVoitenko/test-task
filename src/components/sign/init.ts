import { TextFieldOptions, AuthorizationInfo, RegistrationInfo } from './interfaces'

const initTextFieldOptions: TextFieldOptions = {
   notValid: false,
   errorText: '',
   value: ''
}

export const initAuthorizationInfo: AuthorizationInfo = {
   email: initTextFieldOptions,
   password: initTextFieldOptions,
   notValid: true
};

export const initRegistrationInfo: RegistrationInfo = {
   username: initTextFieldOptions,
   email: initTextFieldOptions,
   password: initTextFieldOptions,
   repeatPassword: initTextFieldOptions,
   notValid: true
}