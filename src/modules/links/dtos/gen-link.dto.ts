import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GenLinkSchema = z.object({
  siteUrl: z.string().url(),
  link: z.string().min(4).max(10).optional(),
});

export class GenLinkDto extends createZodDto(GenLinkSchema) {}
