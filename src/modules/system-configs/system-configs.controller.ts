import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SystemConfigsService } from './system-configs.service';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('System Configs')
@Controller('system-configs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SystemConfigsController {
  constructor(private readonly systemConfigsService: SystemConfigsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new system configuration' })
  @ApiResponse({ status: 201, description: 'The configuration has been created' })
  create(@Body() createSystemConfigDto: CreateSystemConfigDto) {
    return this.systemConfigsService.create(createSystemConfigDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all system configurations' })
  @ApiResponse({ status: 200, description: 'Returns all system configurations' })
  findAll() {
    return this.systemConfigsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a system configuration by id' })
  @ApiResponse({ status: 200, description: 'Returns the found configuration' })
  findOne(@Param('id') id: string) {
    return this.systemConfigsService.findOne(+id);
  }

  @Get('key/:key')
  @ApiOperation({ summary: 'Get a system configuration by key' })
  @ApiResponse({ status: 200, description: 'Returns the found configuration' })
  findByKey(@Param('key') key: string) {
    return this.systemConfigsService.findByKey(key);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a system configuration' })
  @ApiResponse({ status: 200, description: 'The configuration has been updated' })
  update(
    @Param('id') id: string,
    @Body() updateSystemConfigDto: UpdateSystemConfigDto,
  ) {
    return this.systemConfigsService.update(+id, updateSystemConfigDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a system configuration' })
  @ApiResponse({ status: 200, description: 'The configuration has been deleted' })
  remove(@Param('id') id: string) {
    return this.systemConfigsService.delete(+id);
  }
}