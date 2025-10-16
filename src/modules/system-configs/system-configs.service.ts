import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConfig } from '../../common/entities/system-config.entity';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';

@Injectable()
export class SystemConfigsService {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigsRepository: Repository<SystemConfig>,
  ) {}

  async findAll() {
    return this.systemConfigsRepository.find({
      order: { id: 'ASC' }
    });
  }

  async findOne(id: number) {
    const config = await this.systemConfigsRepository.findOne({
      where: { id }
    });
    if (!config) {
      throw new NotFoundException(`System config with ID ${id} not found`);
    }
    return config;
  }

  async findByKey(key: string) {
    const config = await this.systemConfigsRepository.findOne({
      where: { key }
    });
    if (!config) {
      throw new NotFoundException(`System config with key ${key} not found`);
    }
    return config;
  }

  async create(createSystemConfigDto: CreateSystemConfigDto) {
    const config = this.systemConfigsRepository.create(createSystemConfigDto);
    return this.systemConfigsRepository.save(config);
  }

  async update(id: number, updateSystemConfigDto: UpdateSystemConfigDto) {
    await this.findOne(id);
    await this.systemConfigsRepository.update(id, updateSystemConfigDto);
    return this.findOne(id);
  }

  async delete(id: number) {
    await this.findOne(id);
    await this.systemConfigsRepository.delete(id);
  }
}