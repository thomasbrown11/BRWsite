export class ContactObject {
  constructor(
    public name: string,
    public email: string,
    public message: string,
    public subject: string,
    public phone?: string,
    public listOpt?: boolean,
    public upload?: any
  ) { }
}

export interface ContactPrototype {
  name: string,
  email: string,
  message: string,
  subject: string, //you changed from reqType to help servic request
  optList?: boolean,
  phone?: string,
  upload?: any
}
