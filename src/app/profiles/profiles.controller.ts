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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('api/v1/profiles')
@UseGuards(AuthGuard('jwt'))
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async index() {
    return await this.profilesService.findAll();
  }

  @Post()
  async store(@Body() body: CreateProfileDto) {
    return await this.profilesService.store(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.profilesService.findOneOrFail({ id });
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProfileDto,
  ) {
    return await this.profilesService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.profilesService.destroy(id);
  }
}
