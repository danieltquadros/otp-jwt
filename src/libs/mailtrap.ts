import { MailtrapClient } from 'mailtrap';

export const sendEmail = async (to: string, subject: string, body: string) => {
  const mailtrap = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN as string,
    testInboxId: 3251629, // OBS.: Em produção essa linha deve ser removida
  });

  try {
    await mailtrap.testing.send({
      from: { name: 'Sistema', email: 'sistema@email.com' },
      to: [{ email: to }],
      subject,
      text: body,
    }); // Em produção, remover o 'testing'

    return true;
  } catch (error) {
    return false;
  }
};
