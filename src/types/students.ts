export type Status={
  status:"active"|"completed"
}
export type Address={
  city:string;
  state:string;
  pin:string;
}
export type Student = {
  id: number | string;
  name: string;
  discipline: string;
  phone: string;
  email: string;
  img?: string;
  status: Status;
  joiningDate?: string;
  createdAT: string,
  address:Address
};

