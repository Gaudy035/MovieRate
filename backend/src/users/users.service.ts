import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const newUser = this.usersRepository.create(createUserDTO);
    return this.usersRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findById(user_id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { user_id } });
  }

  async updateEmail(user_id: number, new_email: string): Promise<User> {
    const user = await this.findById(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.email = new_email;
    return this.usersRepository.save(user);
  }

  async updatePassword(user_id: number, new_password: string): Promise<User> {
    const user = await this.findById(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = new_password;
    return this.usersRepository.save(user);
  }
}
