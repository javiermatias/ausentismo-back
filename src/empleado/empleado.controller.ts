import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ERole } from '../auth/role.enum';
import { UserDto } from './dto/auth.user.dto';
import { Pagination } from 'src/utils/pagination';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('empleado')
export class EmpleadoController {
  constructor(private readonly empleadoService: EmpleadoService) {}
  @Roles(ERole.Admin, ERole.RRHH)
  @Post()
  async create(
    @Body() createEmpleadoDto: CreateEmpleadoDto,
    @Req() req: Request,
  ) {
    const user: UserDto = req['user'];
    createEmpleadoDto.empresaId = user.empresaId;
    await this.empleadoService.create(createEmpleadoDto);
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

    return this.empleadoService.findAll(pagination, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(+id);
  }

  @Patch(':dni')
  update(
    @Param('dni') dni: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.update(+dni, updateEmpleadoDto);
  }
  @Roles(ERole.Admin, ERole.RRHH)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(+id);
  }
}
