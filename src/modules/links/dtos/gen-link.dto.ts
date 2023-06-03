import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const GenLinkSchema = z.object({
  siteUrl: z.string(),
  link: z.string(),
});

export class GenLinkDto extends createZodDto(GenLinkSchema) {}
