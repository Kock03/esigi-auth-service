import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  Like,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly sendGrid: SendGridService,
    private httpService: HttpService,
  ) { }

  async findAll() {
    const options: FindManyOptions = {
      order: { createdAt: 'DESC' },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'collaboratorId',
        'login',
        'office',
        'inactive',
        'profileId',
        'profileName',
      ],
    };
    try {
      const users = await this.usersRepository.find(options);

      return users;
    } catch (error) {
      throw new NotFoundException();
    }
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
    const passwordd = data.password;
    const user = this.usersRepository.create(data);
    await this.sendEmail(user.email, passwordd, user.login);
    return await this.usersRepository.save(user);
  }

  async findForCollaborator(collaborator) {
    return await this.usersRepository.find({
      select: ['id', 'login'],
      where: { collaboratorId: collaborator },
    });
  }

  async sendEmail(
    email: string,
    password: string,
    login: string,
  ) {
    return await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Informações do login',
      text: `Seus dados de acesso são: Login${login} e senha ${password}@envolti.com.br`,
      html: `<div><h1><strong>Bem Vindo a Envolti!</strong></h1></div>
            <div> <h2>Seus dados de acesso são: </h2></div>
            <div> <h2><strong> Login: ${login}</h2></div>
            <div> <h2>Senha: ${password}</strong> </h2></div> `,
    });
  }

  async update(id: string, data: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOneOrFail({
        id,
      });
      data.password = hashSync(user.password, 10);
    } catch {
      throw new NotFoundException();
    }
    return await this.usersRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ id });
    this.usersRepository.softDelete({ id });
  }

  async findActive() {
    return await this.usersRepository.find({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'collaboratorId',
        'login',
        'office',
        'inactive',
        'profileId',
        'profileName',
      ],
      where: [{ inactive: false }],
    });
  }

  async findInactive() {
    return await this.usersRepository.find({
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'collaboratorId',
        'login',
        'office',
        'inactive',
        'profileId',
        'profileName',
      ],
      where: [{ inactive: true }],
    });
  }

  async findByName(firstName: string, status: number) {
    let user;
    if (firstName === '') {
      switch (status) {
        case 1:
          user = this.findAll();
          return user;
          break;
        case 2:
          user = this.findActive();
          return user;
          break;
        case 3:
          user = this.findInactive();
          return user;
          break;
      }
    } else {
      switch (status) {
        case 1:
          user = await this.usersRepository.find({
            select: [
              'id',
              'firstName',
              'lastName',
              'email',
              'collaboratorId',
              'login',
              'office',
              'inactive',
              'profileId',
              'profileName',
            ],
            where: [{ firstName: Like(`%${firstName}%`) }],
          });
          return user;

          break;
        case 2:
          user = await this.usersRepository.find({
            select: [
              'id',
              'firstName',
              'lastName',
              'email',
              'collaboratorId',
              'login',
              'office',
              'inactive',
              'profileId',
              'profileName',
            ],
            where: [{ firstName: Like(`%${firstName}%`), inactive: false }],
          });
          return user;
          break;
        case 3:
          user = await this.usersRepository.find({
            select: [
              'id',
              'firstName',
              'lastName',
              'email',
              'collaboratorId',
              'login',
              'office',
              'inactive',
              'profileId',
              'profileName',
            ],
            where: [{ firstName: Like(`%${firstName}%`), inactive: true }],
          });
          return user;
          break;
      }
    }
  }
}
