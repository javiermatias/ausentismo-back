import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUser(username);
    try {
      const passAreEqual = await bcrypt.compare(pass, user?.password);

      if (!passAreEqual) {
        throw new UnauthorizedException();
      }
    } catch (Error) {
      //log error
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      id: user.id,
      username: user.username,
      role: user.role.roleName,
      roleId: user.role.id,
      empresa: user.empresa.nombre,
      empresaId: user.empresa.id,
    };
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      dni: user.dni,
      email: user.email,
      role: user.role.roleName,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
