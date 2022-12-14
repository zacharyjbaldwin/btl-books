export interface Address {
  _id?: string;
  sendTo: string;
  addrLine1: string;
  addrLine2?: string;
  city: string;
  state: string;
  zip: number;
}
