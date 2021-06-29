import { Button } from '@material-ui/core'
import React from 'react'
import { SignForm } from '../sign/sign';
import { Link } from 'react-router-dom'
import { loadContext } from '../../general/loader/loader';
import styles from './styles.module.css' 
import { EmailField, PasswordField } from '../signTextFields/signTextFields';
import { validatePasswordField, validateEmailField } from '../validators';
import { TextFieldOptions, AuthorizationInfo } from '../interfaces';
import { initAuthorizationInfo } from '../init';
import { AuthorizationApi as Api, AuthorizationResponse } from '../../../ServerAPI/api';
import { TransactionsApi, TransactionsResponse } from '../../../ServerAPI/transactions';



export const Authorization: React.FC = () => {
   const [userInfo, setUserInfo] = React.useState<AuthorizationInfo>(initAuthorizationInfo);
   const loader = React.useContext(loadContext);

   const viewServerError = (errorText: string) => {
      const newUserInfo: AuthorizationInfo = {
         ...userInfo,
         notValid: true,
         password: {
            ...userInfo.password,
            notValid: true,
            errorText: errorText
         },
         email: {
            ...userInfo.email,
            notValid: true
         }
      }

      setUserInfo(newUserInfo);
   }

   const onBlurTextField = (event: React.FocusEvent<HTMLInputElement>): void => {
      const email: TextFieldOptions = (event.target.name === 'email') ? validateEmailField(userInfo.email) : { ...userInfo.email };
      const password: TextFieldOptions = (event.target.name === 'password') ? validatePasswordField(userInfo.password) : { ...userInfo.password };

      const newUserInfo: AuthorizationInfo = {
         ...userInfo,
         email: email,
         password: password,
         notValid: (email.value === '' || password.value === '' || email.notValid || password.notValid)
      }

      setUserInfo(newUserInfo);
   }

   const onTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const email: TextFieldOptions = { ...userInfo.email };
      const password: TextFieldOptions = { ...userInfo.password };

      if (event.target.name === 'email') {
         email.value = event.target.value;
      } else {
         password.value = event.target.value;
      }

      const newUserInfo: AuthorizationInfo = {
         ...userInfo,
         email: email,
         password: password
      }

      setUserInfo(newUserInfo);
   }

   const onLogin = (email: string, password: string) => {
      loader.onLoad(true);
      Api.onLogin(email, password)
         .then((body) => {
            if(body['errorText']) {
               viewServerError(body['errorText']);
            } else {
               const userData: AuthorizationResponse = (body['response']) ? body['response'] : {id_token: undefined};
               console.log(userData);
               /*if(userData['id_token']) {
                  TransactionsApi.getUserTransactions(userData['id_token']).then((response) => console.log(response));
               };*/
            }
            loader.onLoad(false);
         })
         .catch((err) => {
            console.log(err);
            loader.onLoad(false);
         })
   }

   const onSubmit = (event: React.FormEvent): void => {
      event.preventDefault();
      const email: TextFieldOptions = { ...userInfo.email };
      const password: TextFieldOptions = { ...userInfo.password };
      onLogin(email.value, password.value);
   }

   const onRegistrationClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      loader.onLoad(true);
      setTimeout(() => {
         loader.onLoad(false);
      }, 2000);
   }

   return (
      <SignForm 
         onSubmit={onSubmit}
      >
         <EmailField
            autoFocus
            error={userInfo.email.notValid}
            helperText={userInfo.email.errorText}
            value={userInfo.email.value}
            onChange={onTextChange}
            onBlur={onBlurTextField}
         />
         <PasswordField
            error={userInfo.password.notValid}
            helperText={userInfo.password.errorText}
            value={userInfo.password.value}
            onChange={onTextChange}
            onBlur={onBlurTextField}
         />
         <Button
            disabled={userInfo.notValid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
         >
            Войти
         </Button>
         <Link
            className={styles.registrationLink}
            to='/registration'
            onClick={onRegistrationClick}
         >
            Создать аккаунт
         </Link>
      </SignForm>
   )
}