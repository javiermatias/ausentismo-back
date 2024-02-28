import { Body, Controller, Post } from '@nestjs/common';
import { JustificaService } from './justifica.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';
import { UpdateJustificaDto } from 'src/rrhh/dto/update-justifica.dto';

@Controller('justifica')
export class JustificaController {
    constructor(private readonly justificaService: JustificaService){}

    @Roles(ERole.Admin, ERole.RRHH)
    @Post()
    update(
      @Body() updateJustificaDto: UpdateJustificaDto,
    ) {
  
      return this.justificaService.update(updateJustificaDto);
    }
}
