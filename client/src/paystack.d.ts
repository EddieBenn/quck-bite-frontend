declare module '@paystack/inline-js' {
    interface PaystackTransactionOptions {
    Key:string;
      email: string;
      amount: number;
      firstname:string;
      lastname:string;
      text?:string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess?:(transaction:any)=>void;
      onCancel?:()=>void
      // Add other fields as needed
    }
  
    export default class PaystackPop {
      newTransaction(options: PaystackTransactionOptions): void;
      // Add other methods as needed
    }
  }