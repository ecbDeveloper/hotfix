import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StatementsService } from './statements.service';
import { CreateStatementDto } from './dto/create-statement.dto';
import { UpdateStatementDto } from './dto/update-statement.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuditInterceptor } from '../audit/audit.interceptor';

@ApiTags('Statements')
@Controller('statements')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuditInterceptor)
export class StatementsController {
  constructor(private readonly statementsService: StatementsService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new statement' })
  @ApiResponse({ status: 201, description: 'The statement has been created' })
  create(@Body() createStatementDto: CreateStatementDto) {
    return this.statementsService.create(createStatementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all statements' })
  @ApiResponse({ status: 200, description: 'Returns all statements' })
  findAll(@Query('userId') userId?: string) {
    return this.statementsService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a statement by id' })
  @ApiResponse({ status: 200, description: 'Returns the found statement' })
  findOne(@Param('id') id: string) {
    return this.statementsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Update a statement' })
  @ApiResponse({ status: 200, description: 'The statement has been updated' })
  update(
    @Param('id') id: string,
    @Body() updateStatementDto: UpdateStatementDto,
  ) {
    return this.statementsService.update(id, updateStatementDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Delete a statement' })
  @ApiResponse({ status: 200, description: 'The statement has been deleted' })
  remove(@Param('id') id: string) {
    return this.statementsService.delete(id);
  }

  @Get('user/:userId/balance')
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({ status: 200, description: 'Returns user balance' })
  getUserBalance(@Param('userId') userId: string) {
    return this.statementsService.getUserBalance(userId);
  }
}