import { Body, Controller, Post, Req } from '@nestjs/common';
import { ControlService } from './control.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ERole } from 'src/auth/role.enum';
import { UpdateControlDto } from 'src/rrhh/dto/update-control.dto';

@Controller('control')
export class ControlController {
    constructor(private readonly controlService: ControlService){}

    @Roles(ERole.Admin, ERole.RRHH)
    @Post()
    update(
      @Body() updateControlDto: UpdateControlDto,
    ) {
  
      return this.controlService.update(updateControlDto);
    }


}
