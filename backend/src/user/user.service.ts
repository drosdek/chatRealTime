import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HistoricLogin } from './entities/historic-login.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(HistoricLogin)
    private historicLoginRepository: Repository<HistoricLogin>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const result = await this.userRepository.findOne({
      where: { username: username },
    });
    return result;
  }

  async historicLogin(
    userId: number,
    lastIpLogin: string,
  ): Promise<HistoricLogin | undefined> {
    const historicLogin = this.historicLoginRepository.create({
      userId: String(userId),
      lastLogin_at: new Date(),
      lastIpLogin,
    });
    return this.historicLoginRepository.save(historicLogin);
  }
}
