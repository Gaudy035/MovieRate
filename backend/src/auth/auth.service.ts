import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../users/dtos/create-user.dto';
import { LoginDTO } from '../users/dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDTO: CreateUserDTO) {
    const emailTaken = await this.usersService.findByEmail(createUserDTO.email);
    if (emailTaken) {
      throw new ConflictException('Email address is already taken');
    }

    const usernameTaken = await this.usersService.findByUsername(
      createUserDTO.username,
    );
    if (usernameTaken) {
      throw new ConflictException('Username is already taken');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDTO.password,
      saltRounds,
    );

    const newUser = { ...createUserDTO, password: hashedPassword };
    const user = await this.usersService.create(newUser);
    return this.login({ email: user.email, password: createUserDTO.password });
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.usersService.findByEmail(loginDTO.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user.user_id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
