import { Controller, Get, Req } from '@nestjs/common';
import { SucursalService } from './sucursal.service';
import { UserDto } from 'src/empleado/dto/auth.user.dto';

@Controller('provincia')
export class ProvinciaController {
  constructor(private readonly sucursalService: SucursalService) {}

  /*     @Post()
      create(@Body() createSucursalDto: CreateSucursalDto) {
        return this.sucursalService.create(createSucursalDto);
      }
     */
  @Get()
  findAll(@Req() req: Request) {
    const user: UserDto = req['user'];
    return this.sucursalService.findAllProvincia(user.empresaId);
  }

  /*     @Get(':id')
      findOne(@Param('id') id: string) {
        return this.sucursalService.findOne(+id);
      }
    
      @Patch(':id')
      update(
        @Param('id') id: string,
        @Body() updateSucursalDto: UpdateSucursalDto,
      ) {
        return this.sucursalService.update(+id, updateSucursalDto);
      }
    
      @Delete(':id')
      remove(@Param('id') id: string) {
        return this.sucursalService.remove(+id);
      } */
}
