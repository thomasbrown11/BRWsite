export class ContactProtoype {
  constructor(
    public name: string,
    public email: string,
    public message: string,
    public requestType: string,
    public phone?: string
  ) { }
}