import { Transform } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty } from "class-validator";

export class UpdateControlDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(["CONSULTORIO", "DOMICILIO", "NOCONTROL"])
    readonly nombre: string;
    @IsInt()
    nroReferencia: number;
}