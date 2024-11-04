import { z } from 'zod';

export const authSignupSchema = z.object({
  name: z.string({ message: 'name is mandatory.' }).min(2),
  email: z.string({ message: 'e-mail is mandatory.' }).email('invalid e-mail.'),
});
