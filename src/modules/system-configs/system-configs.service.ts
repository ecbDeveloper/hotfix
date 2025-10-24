import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SystemConfig } from '../../common/entities/system-config.entity';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';

@Injectable()
export class SystemConfigsService {
  constructor(
    @InjectModel(SystemConfig)
    private readonly systemConfig: typeof SystemConfig,
  ) {}

  async findAll() {
    return this.systemConfig.findAll({
      order: [['id', 'ASC']]
    });
  }

  async findOne(id: number) {
    const config = await this.systemConfig.findByPk(id);
    if (!config) {
      throw new NotFoundException(`System config with ID ${id} not found`);
    }
    return config;
  }

  async findByKey(key: string) {
    const config = await this.systemConfig.findOne({
      where: { key }
    });
    if (!config) {
      throw new NotFoundException(`System config with key ${key} not found`);
    }
    return config;
  }

  async create(createSystemConfigDto: CreateSystemConfigDto) {
    return this.systemConfig.create(createSystemConfigDto as any);
  }

  async update(id: number, updateSystemConfigDto: UpdateSystemConfigDto) {
    const config = await this.findOne(id);
    await config.update(updateSystemConfigDto);
    return config;
  }

  async delete(id: number) {
    const config = await this.findOne(id);
    await config.destroy();
    return config;
  }
}