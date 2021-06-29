import React from 'react'
import { SignForm } from '../sign/sign'
import { EmailField, PasswordField, RepeatPasswordField, UserNameField } from '../signTextFields/signTextFields';
import { Button } from '@material-ui/core'
import { RegistrationInfo } from '../interfaces';
import { initRegistrationInfo } from '../init';
import { validateEmailField, validatePasswordField, validateRepeatPasswordField } from '../validators';
import { AuthorizationApi as Api } from '../../../ServerAPI/api';

export const Registration: React.FC = () => {
   const [registrationInfo, setRegistrationInfo] = React.useState<RegistrationInfo>(initRegistrationInfo);
   const onSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      Api.onRegister(registrationInfo.username.value, registrationInfo.password.value, registrationInfo.email.value)
         .then((data) => {
            if(data['errorText']) {
               const newRegistrationInfo: RegistrationInfo = {
                  ...registrationInfo,
                  email: {
                     ...registrationInfo.email,
                     notValid: true,
                     errorText: data.errorText
                  },
                  password: {
                     ...registrationInfo.password,
                     notValid: true,
                     errorText: ''
                  },
                  repeatPassword: {
                     ...registrationInfo.repeatPassword,
                     notValid: true,
                     errorText: ''
                  },
                  notValid: true
               }
               setRegistrationInfo(newRegistrationInfo);
            } else {
               localStorage.setItem('registration_token', JSON.stringify(data.response));
            }
         })
   }

   const onBlurTextField = (event: React.FocusEvent<HTMLInputElement>): void => {
      const email = (event.target.name === 'email') ? validateEmailField(registrationInfo.email) :  {...registrationInfo.email };
      const password = (event.target.name === 'password') ? validatePasswordField(registrationInfo.password) : { ...registrationInfo.password };
      const repeatPassword = (event.target.name === 'repeatPassword') ? validateRepeatPasswordField(registrationInfo.password, registrationInfo.repeatPassword) : {...registrationInfo.repeatPassword};
      const userName = { ...registrationInfo.username };
      
      const newRegistrationInfo: RegistrationInfo = {
         ...registrationInfo,
         email: email,
         password: password,
         repeatPassword: repeatPassword,
         username: userName,
         notValid: (email.notValid || userName.notValid || password.notValid || repeatPassword.notValid)
      }

      setRegistrationInfo(newRegistrationInfo);
   }
   
   const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const email = { ...registrationInfo.email };
      const password = { ...registrationInfo.password };
      const repeatPassword = { ...registrationInfo.repeatPassword };
      const userName = { ...registrationInfo.username };

      switch(event.target.name) {
         case 'email': {
            email.value = event.target.value;
            break;
         }
         case 'password': {
            password.value = event.target.value;
            break;
         }
         case 'repeatPassword': {
            repeatPassword.value = event.target.value;
            break;
         }
         case 'userName': {
            userName.value = event.target.value;
            break;
         }
      }

      const newRegistrationInfo: RegistrationInfo = {
         ...registrationInfo,
         email: email,
         password: password,
         repeatPassword: repeatPassword,
         username: userName
      }

      setRegistrationInfo(newRegistrationInfo);
   }

   return (
      <SignForm
         onSubmit={onSubmit}
      >
         <UserNameField
            error={registrationInfo.username.notValid}
            helperText={registrationInfo.username.errorText}
            value={registrationInfo.username.value}
            onChange={onTextFieldChange}
         />
         <EmailField
            error={registrationInfo.email.notValid}
            helperText={registrationInfo.email.errorText}
            value={registrationInfo.email.value}
            onChange={onTextFieldChange}
            onBlur={onBlurTextField}
         />
         <PasswordField
            error={registrationInfo.password.notValid}
            helperText={registrationInfo.password.errorText}
            value={registrationInfo.password.value}
            onChange={onTextFieldChange}
            onBlur={onBlurTextField}
         />
         <RepeatPasswordField
            error={registrationInfo.repeatPassword.notValid}
            helperText={registrationInfo.repeatPassword.errorText} 
            value={registrationInfo.repeatPassword.value}
            onChange={onTextFieldChange}
            onBlur={onBlurTextField}
         />
         <Button
            disabled={registrationInfo.notValid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
         >
            Зарегистрироваться
         </Button>
      </SignForm>
   )
}