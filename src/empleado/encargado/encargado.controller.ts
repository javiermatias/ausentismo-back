import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
  Body,
  Patch,
  Post,
} from '@nestjs/common';

import { Pagination } from 'src/utils/pagination';
import { EncargadoService } from './encargado.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';
import { UserDto } from '../dto/auth.user.dto';
import { BuisnessException } from 'src/utils/buisness.exception';
import { UpdateEmpleadoDto } from '../dto/update-empleado.dto';
import { CreateEmpleadoDto } from '../dto/create-empleado.dto';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('encargado')
export class EncargadoController {
  constructor(private readonly encargadoService: EncargadoService) {}
  @Roles(ERole.Admin, ERole.RRHH)
  @Post()
  async create(
    @Body() createEmpleadoDto: CreateEmpleadoDto,
    @Req() req: Request,
  ) {
    const user: UserDto = req['user'];
    createEmpleadoDto.empresaId = user.empresaId;
    await this.encargadoService.create(createEmpleadoDto);
    return {
      message: 'User created successfully',
    };
  }

  @Roles(ERole.Admin, ERole.RRHH)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query() pagination: Pagination,
    @Req() req: Request, // Default to limit 10
  ) {
    const user: UserDto = req['user'];

    return this.encargadoService.findAll(pagination, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.encargadoService.findOne(+id);
  }

  @Patch(':dni')
  async update(
    @Param('dni') dni: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    await this.encargadoService.update(+dni, updateEmpleadoDto);
    return {
      message: 'User update successfully',
    };
  }
  @Roles(ERole.Admin, ERole.RRHH)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const dni = parseInt(id);
    if (!dni) return new BuisnessException('Error parse DNI');
    return this.encargadoService.remove(dni);
  }
}
