import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RegisterUserSchema = z.object({
  username: z.string().min(5),
  email: z.string().email().min(5),
});

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
