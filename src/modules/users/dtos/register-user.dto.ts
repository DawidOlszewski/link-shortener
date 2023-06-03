import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RegisterUserSchema = z.object({
  username: z.string(),
  email: z.string(),
});

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
