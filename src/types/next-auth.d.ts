export type LoginResponseData = {
    email: string;
    accessToken: string;
    id: string;
  };
  
declare module 'next-auth' {
    interface Session {
        user: LoginResponseData;
    }
}