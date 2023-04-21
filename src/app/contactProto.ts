export class ContactObject {
  constructor(
    public name: string,
    public email: string,
    public message: string,
    public subject: string,
    public listOpt: boolean,
    public phone?: string,
    public selectedFile?: any,
  ) { }
}
