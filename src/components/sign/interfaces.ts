export interface TextFieldOptions {
   notValid: boolean,
   errorText: string,
   value: string
}

export interface AuthorizationInfo {
   email: TextFieldOptions,
   password: TextFieldOptions,
   notValid: boolean
}

export interface RegistrationInfo extends AuthorizationInfo {
   username: TextFieldOptions,
   repeatPassword: TextFieldOptions
} 