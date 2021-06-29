import { Api, ResponseData } from "./general";

const authorizationOptions: RequestInit = {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json;charset=utf-8'
   },
   body: ''
}

export interface AuthorizationResponse {
   id_token?: string
}

export class AuthorizationApi extends Api {
   static async onLogin(email: string, password: string): Promise<ResponseData<AuthorizationResponse>> {
      const url: string = this.serverURL + 'sessions/create';
      const requestOptions: RequestInit = { ...authorizationOptions }
      requestOptions.body = JSON.stringify({
         email: email,
         password: password
      });
      return this.getResponseBody<AuthorizationResponse>(fetch(url, requestOptions));
   }

   static async onRegister(username: string, password: string, email: string): Promise<ResponseData<AuthorizationResponse>> {
      const url: string = this.serverURL + 'users';
      const requestOptions: RequestInit = { ...authorizationOptions }
      requestOptions.body = JSON.stringify({
         username: username,
         password: password,
         email: email
      });
      return this.getResponseBody<AuthorizationResponse>(fetch(url, requestOptions));
   }
}