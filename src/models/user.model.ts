import { randomUUID } from 'crypto';

class User {
  private id: string;
  private createdAt: Date

  constructor(
    private name: string,
    private email: string,
    private password: string,
    id?: string,
  ) {
    this.id = id || randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  public get Id(): string {
    return this.id;
  }

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }

  public get Password(): string {
    return this.password;
  }
}

export default User;