import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly sendGrid: SendGridService
  ) { }


  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail(
    conditions: FindConditions<UsersEntity>,
    options?: FindOneOptions<UsersEntity>,
  ) {
    try {
      return await this.usersRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async store(data: CreateUserDto) {
    const passwordd = data.password
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user) && await this.sendEmail(user.email, passwordd, user.login);
  }

  async sendEmail(email: string, password: string, login: string): Promise<void> {
    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Informações do login",
      text: `Seus dados de acesso são: Login${login} e senha ${password}@envolti.com.br`,
      html: `<div><strong>Bem Vindo a Envolti!</strong> Seus dados de acesso são: Login ${login} e senha ${password}</div>`,
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOneOrFail({ id });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ id });
    this.usersRepository.softDelete({ id });
  }
}
