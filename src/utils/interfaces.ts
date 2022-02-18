export interface ILogin {
    email: string;
    password: string;
  }

  export interface IUser {
    id:number;
    name: string;
    email: string;
    password: string;
  }


  export interface ITwit {
      id: number;
      twit: string;   
  }

  export interface IComment {
    id: number;
    comment: string;   
}

export interface ErrorInt {
    success: boolean;
    status: number;
    message: string;
    isOperational: boolean;
}

export type ResponseData = Record<string, any> | Record<string, any>[];
