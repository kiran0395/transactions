export interface ITransaction {
    id: string;
    date: number;
    sender: ISender;
    recipient: IRecipient;
    Amount: number;
    CurrencyCd: string;
    Comments: string;
    status: string;
  }
  
  export interface ISender {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    IDNumber: string;
  }
  
  export interface IRecipient {
    firstName: string;
    lastName: string;
    email: string;
    accountNumber: string;
    bank: string;
  }
  