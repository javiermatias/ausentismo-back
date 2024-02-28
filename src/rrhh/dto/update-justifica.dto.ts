import { Transform } from "class-transformer";
import { IsIn, IsInt, IsNotEmpty } from "class-validator";

export class UpdateJustificaDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    @IsIn(["SI", "NO"])
    readonly nombre: string;
    @IsInt()
    nroReferencia: number;
}