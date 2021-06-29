import { TextFieldOptions } from "./interfaces";

export const validateEmailField = (email: TextFieldOptions): TextFieldOptions => {
   const validatingEmail: TextFieldOptions = { ...email };
   const validatePattern: RegExp = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   validatingEmail.notValid = !validatePattern.test(validatingEmail.value);
   validatingEmail.errorText = (validatingEmail.notValid) ? 'Некорректный e-mail!' : '';
   return validatingEmail;
}

export const validatePasswordField = (password: TextFieldOptions): TextFieldOptions => {
   const validatingPassword: TextFieldOptions = { ...password };
   const realPassword = validatingPassword.value;
   validatingPassword.notValid = realPassword.length < 8;
   validatingPassword.errorText = (validatingPassword.notValid) ? 'Пароль должен быть не менее 8 символов!' : '';
   return validatingPassword;
}

export const validateRepeatPasswordField = (password: TextFieldOptions, repeatPassword: TextFieldOptions): TextFieldOptions => {
   const validatingRepeatPassword: TextFieldOptions = {...repeatPassword};
   validatingRepeatPassword.notValid = (validatingRepeatPassword.value !== password.value) && (password.value !== '') && (repeatPassword.value !== '');
   validatingRepeatPassword.errorText = (validatingRepeatPassword.notValid) ? 'Пароли не совпадают' : '';
   return validatingRepeatPassword;
}