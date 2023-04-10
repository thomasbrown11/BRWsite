export class ContactObject {
  constructor(
    public name: string,
    public email: string,
    public message: string,
    public subject: string,
    public file: any, //null | string blob? | File []?
    public phone?: string,
    public listOpt?: boolean,
    public selectedFile?: any,
  ) { }
}
