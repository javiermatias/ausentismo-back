import { IsNotEmpty } from "class-validator";

export class CounterDto {
    @IsNotEmpty()    
    readonly day: number = 0;
    @IsNotEmpty()        
    readonly week: number = 0;
    @IsNotEmpty()        
    readonly month: number = 0;
    @IsNotEmpty()    
    readonly year: number = 0;
  }
