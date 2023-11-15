import { Controller, Get, Param } from '@nestjs/common';
import { SucursalService } from './sucursal.service';

@Controller('localidad')
export class LocalidadController {
  constructor(private readonly sucursalService: SucursalService) {}

  /*     @Post()
      create(@Body() createSucursalDto: CreateSucursalDto) {
        return this.sucursalService.create(createSucursalDto);
      }
     */

  @Get(':id')
  findAll(@Param('id') provinciaId: number) {
    return this.sucursalService.findAllLocalidad(provinciaId);
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
