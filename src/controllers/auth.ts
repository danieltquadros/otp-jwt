import { RequestHandler } from 'express';
import { authSignInSchema } from '../schemas/auth-sign-in';
import { createUserService, getUserByEmailService } from '../services/user';
import { generateOTP, validateOTP } from '../services/otp';
import { sendEmail } from '../libs/mailtrap';
import { authSignupSchema } from '../schemas/auth-signup';
import { authUseOTPSchema } from '../schemas/auth-use-otp';
import { createJWT } from '../libs/jwt';

export const signIn: RequestHandler = async (req, res) => {
  // Validar os dados recebidos
  const data = authSignInSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  // Verificar se o usuário existe (email)
  const user = await getUserByEmailService(data.data.email);

  if (!user) {
    res.json({ error: 'user not found.' });
    return;
  }

  // Gerar um código OTP para o usuário
  const otp = await generateOTP(user.id);

  // Enviar um e-mail para o usuário
  await sendEmail(
    user.email,
    `Seu código de acesso é: ${otp.code}`,
    `Digite seu código: ${otp.code}`,
  );

  // Devolve o ID do código OTP
  res.json({ id: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
  // Validar os dados recebidos
  const data = authSignupSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  // Verificar se o e-mail já existe
  const user = await getUserByEmailService(data.data.email);

  if (user) {
    res.json({ error: 'e-mail already registered.' });
    return;
  }

  // Criar o usuário
  const newUser = await createUserService(data.data.name, data.data.email);

  if (!newUser) {
    res.json({ error: 'user not created.' });
    return;
  }

  // retornar os dados do usuário recém criado.

  res.status(201).json({ newUser });
};

export const useOTP: RequestHandler = async (req, res) => {
  // Validar os dados recebidos
  const data = authUseOTPSchema.safeParse(req.body);
  if (!data.success) {
    res.json({ error: data.error.flatten().fieldErrors });
    return;
  }

  // Validar o OTP
  const user = await validateOTP(data.data.id, data.data.code);
  if (!user) {
    res.json({ error: 'invalid or expired OTP' });
    return;
  }

  // Cria o JWT
  const token = createJWT(user.id);

  // retorna o JWT
  res.json({ token, user });
};
