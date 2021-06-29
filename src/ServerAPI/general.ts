export interface ResponseData<T> {
   response?: T,
   errorText?: string
}

export class Api {
   static serverURL: string = 'http://193.124.114.46:3001/';
   
   static async getResponseBody<T>(response: Promise<Response>): Promise<ResponseData<T>> {
      const responseBody = await response;
      let responseData: ResponseData<T> = {
         response: (responseBody.ok) ? await responseBody.json() : {},
         errorText: (!responseBody.ok) ? await responseBody.text() : undefined
      } 
      return responseData;
   }
} 