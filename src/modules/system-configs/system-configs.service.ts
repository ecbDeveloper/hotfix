import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemConfigsRepository } from './system-configs.repository';
import { CreateSystemConfigDto } from './dto/create-system-config.dto';
import { UpdateSystemConfigDto } from './dto/update-system-config.dto';

@Injectable()
export class SystemConfigsService {
  constructor(private readonly systemConfigsRepository: SystemConfigsRepository) {}

  async findAll() {
    return this.systemConfigsRepository.findAll();
  }

  async findOne(id: number) {
    const config = await this.systemConfigsRepository.findOne(id);
    if (!config) {
      throw new NotFoundException(`System config with ID ${id} not found`);
    }
    return config;
  }

  async findByKey(key: string) {
    const config = await this.systemConfigsRepository.findByKey(key);
    if (!config) {
      throw new NotFoundException(`System config with key ${key} not found`);
    }
    return config;
  }

  async create(createSystemConfigDto: CreateSystemConfigDto) {
    return this.systemConfigsRepository.create(createSystemConfigDto);
  }

  async update(id: number, updateSystemConfigDto: UpdateSystemConfigDto) {
    await this.findOne(id); // Ensure exists
    return this.systemConfigsRepository.update(id, updateSystemConfigDto);
  }

  async delete(id: number) {
    await this.findOne(id); // Ensure exists
    await this.systemConfigsRepository.delete(id);
  }
}