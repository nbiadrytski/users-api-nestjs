import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, Roles } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
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
      const filteredUsers: User[] = this.users.filter(
        (user: User) => user.role === role,
      );
      if (filteredUsers.length === 0)
        throw new NotFoundException('User role not found');
      return filteredUsers;
    }
    return this.users;
  }

  findOne(id: number): User {
    const user: User = this.users.find((user: User) => user.id === id);
    if (!user) throw new NotFoundException(`User ${id} Not Found`);
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const usersByHighestId: User[] = [...this.users].sort(
      (a: User, b: User) => b.id - a.id,
    );
    const newUser: User = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    this.users = this.users.map((user: User) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number): User {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user: User) => user.id !== id);
    return removedUser;
  }
}
