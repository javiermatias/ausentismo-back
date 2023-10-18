import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendEmail(
    sender: string,
    imageURl: string,
    subject: string,
  ): Promise<void> {
    try {
      await this.sendGrid.send({
        to: sender,
        from: 'ausentismo@smartsoftsms.online',
        subject: subject,
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      });
    } catch (error) {
      console.log(error.response.body);
    }
  }
}
