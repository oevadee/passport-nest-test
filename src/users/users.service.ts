import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

export type User = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(userData: any): Promise<any> {
    const salt = await genSalt();
    const hashedPassword = await hash(userData.password, salt);
    const userId = Date.now();

    this.users.push({
      userId,
      username: userData.username,
      password: hashedPassword,
    });

    return true;
  }
}
