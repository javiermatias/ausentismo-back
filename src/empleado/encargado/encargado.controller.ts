import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Pagination } from 'src/utils/pagination';
import { EncargadoService } from './encargado.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';
import { UserDto } from '../dto/auth.user.dto';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('encargado')
export class EncargadoController {
  constructor(private readonly encargadoService: EncargadoService) {}
  @Roles(ERole.Admin, ERole.RRHH)
  /*   @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  } */
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

  /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.update(+id, updateEmpleadoDto);
  } */
  @Roles(ERole.Admin, ERole.RRHH)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encargadoService.remove(+id);
  }
}
