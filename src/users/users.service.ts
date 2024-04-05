import { Injectable } from '@nestjs/common';

export type Roles = 'INTERN' | 'ENGINEER' | 'ADMIN';

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type UserUpdate = {
  name?: string;
  email?: string;
  role?: string;
};

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: Roles): User[] {
    if (role) {
      return this.users.filter((user: User) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user: User) => user.id === id);
  }

  create(user: User): User {
    const usersByHighestId: User[] = [...this.users].sort(
      (a: User, b: User) => (b.id = a.id),
    );
    const newUser: User = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UserUpdate): User {
    this.users = this.users.map((user: User) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number): User {
    const removedUser = this.findOne(id);
    this.users.filter((user: User) => user.id !== id);
    return removedUser;
  }
}
