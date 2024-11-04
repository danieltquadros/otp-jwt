import { z } from 'zod';

export const authUseOTPSchema = z.object({
  id: z.string({ message: 'OTP ID is mandatory.' }),
  code: z
    .string({ message: 'code is mandatory.' })
    .length(6, 'code needs to have six numbers.'),
});
