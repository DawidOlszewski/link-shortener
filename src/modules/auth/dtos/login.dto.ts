import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginSchema = z.object({
  destination: z.string().email().min(5).max(40),
});

export class LogicDto extends createZodDto(LoginSchema) {}
