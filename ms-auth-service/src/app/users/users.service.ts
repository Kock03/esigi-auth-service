import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { HttpService, Injectable, NotFoundException } from '@nestjs/common';

import { FindConditions, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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
    };
    try {
      const users = await this.usersRepository.find(options);

      const collaboratorIdList = users.map((user) => {
        return user.collaboratorId;
      });

      const collaborators = await this.httpService
        .post('http://localhost:3501/api/v1/collaborators/list', {
          idList: collaboratorIdList,
        })
        .toPromise();

      if (collaborators.data) {
        users.map((user) => {
          const collaborator = collaborators.data.find(
            (collaborator) => collaborator.id === user.collaboratorId);
          user.collaborator = {
            firstNameCorporateName: collaborator.firstNameCorporateName,
            lastNameFantasyName: collaborator.lastNameFantasyName,
            office: collaborator.office,
            login: collaborator.login,
            inactive: collaborator.inactive,
          };
          return user;
        })
      }
      const profileIdList = users.map((user) => {
        return user.profileId;
      });
      const profiles = await this.httpService
        .post('http://localhost:3507/api/v1/profiles/list', {
          idList: profileIdList,
        })
        .toPromise();

      if (profiles.data) {
        users.map((user) => {
          const profileFind = profiles.data.find(
            (profile) => profile.id === user.profileId);
          console.log(user.profile)
          user.profile.forEach((profile) => {
            profile.name = profileFind.name
          });
          return user;
        })

      } else {
        return users;
      }

      return users;
    } catch (error) {
      console.log(error)
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
    const passwordd = data.password
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user) && await this.sendEmail(user.email, passwordd, user.login);
  }

  async findForCollaborator(collaborator) {
    return await this.usersRepository
      .find({
        select: ['id', 'login'],
        where:
          { collaboratorId: collaborator },
      });

  }

  async sendEmail(email: string, password: string, login: string): Promise<void> {
    await this.sendGrid.send({
      to: email,
      from: process.env.FROM_EMAIL,
      subject: "Informações do login",
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
    } catch {
      throw new NotFoundException();
    }

    return await this.usersRepository.save({ id: id, ...data });
  }

  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ id });
    this.usersRepository.softDelete({ id });
  }
}
