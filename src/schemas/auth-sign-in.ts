import { z } from 'zod';

export const authSignInSchema = z.object({
  email: z.string({ message: 'e-mail is mandatory.' }).email('Invalid e-mail.'),
});
