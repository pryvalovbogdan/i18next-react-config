export class RegistrationReqDTO {
  constructor(
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class RegistrationResDTO extends RegistrationReqDTO {
  constructor(first_name: string, last_name: string, email: string, password: string, public readonly token: string) {
    super(first_name, last_name, email, password);
  }
}
