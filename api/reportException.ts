import { NowRequest, NowResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const mailtrapTransport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

interface RequestBody {
  where: string;
  message: string;
  exception: string;
  state?: string | null;
}

export default async (request: NowRequest, response: NowResponse) => {
  const body: RequestBody = JSON.parse(request.body);
  const error: Error = JSON.parse(body.exception);

  const html = `<div>
          <h3>Exception in ${body.where}</h3>
          <div>${body.message}</div>
          <div>Reported at: ${new Date().toISOString()}</div>
          <pre>${error.stack}</pre>
          <pre>${body.state}</pre>
        </div>`;

  if (process.env.NODE_ENV === 'development' || !process.env.MAILTRAP_USERNAME) {
    console.warn('Running in local mode or credentials missing, not sending emails');
    response.status(501).send({
      ok: false,
      message: 'Local development',
      html,
    });
    return;
  }

  try {
    console.info('Sending exception email');
    const info = await mailtrapTransport.sendMail({
      from: '"AUST Reporter" <k@rl.run>',
      to: 'k@rl.run',
      subject: `AUST Exception: ${body.message}`,
      html,
    });

    console.info('Exception email sent', info);
    response.status(200).send('Exception reported');
  } catch (e) {
    console.error(e);
    response.status(500).send('Unable to send exception email');
    return;
  }
};
