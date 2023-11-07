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

//import { Public } from 'src/auth/decorators/public.decorator';
import { EmailService } from './email.service';
import { UserDto } from './dto/auth.user.dto';
import { Pagination } from 'src/utils/pagination';

//import { Public } from 'src/auth/decorators/public.decorator';

@Controller('empleado')
export class EmpleadoController {
  constructor(
    private readonly empleadoService: EmpleadoService,
    private readonly emailService: EmailService,
  ) {}
  @Roles(ERole.Empleado, ERole.Supervisor, ERole.Admin)
  @Post()
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadoService.create(createEmpleadoDto);
  }

  @Roles(ERole.Admin)
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(
    @Query() pagination: Pagination,
    @Req() req: Request, // Default to limit 10
  ) {
    /*return this.emailService.sendEmail(
      'javierjimenez78',
      'www.ausentismo.com',
      'hola desde send grid',
    ); */
    const user: UserDto = req['user'];

    return this.empleadoService.findAll(pagination, user);
  }
  @Roles(ERole.Admin)
  @Get('find')
  search(@Query('query') query: string) {
    // Implement your search logic here using the 'query' parameter.
    // You can access the query parameter as 'http://example.com/search?query=mysearchterm'
    // In this example, 'query' will contain 'mysearchterm'.
    // Perform your search operation and return the results.
    return `Searching for: ${query}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empleadoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmpleadoDto: UpdateEmpleadoDto,
  ) {
    return this.empleadoService.update(+id, updateEmpleadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empleadoService.remove(+id);
  }
}
