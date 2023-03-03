export class ContactProtoype {
  constructor(
    public name: string,
    public email: string,
    public message: string,
    public requestType: string,
    public phone?: string,
    public listOpt?: boolean,
    public upload?: any
  ) { }
}

export interface ContactPrototype {
  name: string,
  email: string,
  optList?: boolean,
  message: string,
  requestType: string,
  phone?: string
}