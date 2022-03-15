import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, ParseUUIDPipe, Put } from '@nestjs/common';
import { RoleService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/roles')
@UseGuards(AuthGuard('jwt'))
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Get()
  async index() {
    return await this.rolesService.findAll();
  }

  @Post()
  async store(@Body() body: CreateRoleDto) {
    return await this.rolesService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.rolesService.findOneOrFail({ id });
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateRoleDto,
  ) {
    return await this.rolesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.rolesService.destroy(id);
  }
}
