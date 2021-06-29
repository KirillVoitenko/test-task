import { Api, ResponseData } from "./general";

const transactionsOptions: RequestInit = {
   method: 'GET',
   headers: {
      'Content-Type': 'application/json;charset=utf-8',
   }
}

interface Transaction {
   id: number,
   date: Date,
   username: string,
   amount: string,
   balance: number
}

export interface TransactionsResponse {
   trans_token?: Array<Transaction>
}

export class TransactionsApi extends Api {
   static async getUserTransactions(userToken: string): Promise<ResponseData<TransactionsResponse>> {
      const url: string = this.serverURL + '/api/protected/transactions';
      const requestOptions = {...transactionsOptions};
      let initHeaders: Headers = new Headers(requestOptions.headers);
      initHeaders.set('authentication', 'bearer ' + userToken);
      requestOptions.headers = initHeaders;
      return this.getResponseBody<TransactionsResponse>(fetch(url, requestOptions));
   }
}