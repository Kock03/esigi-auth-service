import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async index() {
    return await this.usersService.findAll();
  }

  @Post()
  async store(@Body() body: CreateUserDto) {
    return await this.usersService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneOrFail({ id });
  }

  @Get('find/:collaboratorId')
  async findCollaborator(@Param('collaboratorId') collaborator: string) {
    return this.usersService.findForCollaborator(collaborator);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return await this.usersService.update(id, body);
  }



  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.destroy(id);
  }

  @Get('list/active')
  async findActive() {
    return await this.usersService.findActive();
  }


  @Get('list/inactive')
  async findInactive() {
    return await this.usersService.findInactive();
  }


  @Post('find/name')
  async findByName(@Body() body: any) {
    return await this.usersService.findByName(body.firstName, body.status);
  }
}
