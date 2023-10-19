import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { Incidencia } from './entities/incidencia.entity';

@Injectable()
export class EmailService {
  constructor(private readonly sendGrid: SendGridService) {}

  async sendEmail(sender: string, incidencia: Incidencia): Promise<void> {
    try {
      const htmlContent = this.generateHtml(incidencia);
      await this.sendGrid.send({
        to: sender,
        from: 'ausentismo@smartsoftsms.online',
        subject: `Ausencia de ${incidencia.nombre}`,
        text: 'Resumen de Incidencia',
        html: htmlContent,
      });
    } catch (error) {
      console.log(error.response.body);
    }
  }

  private generateHtml(incidencia: Incidencia): string {
    const htmlContent = `
    <h1>Resumen de Incidencia</h1>
    <p>Nombre: ${incidencia.nombre}</p>
    <p>Email: ${incidencia.email}</p>
    <p>Legajo: ${incidencia?.legajo}</p>
    <p>Celular: ${incidencia.celular}</p>
    <p>Enfermedad: ${incidencia.enfermedad}</p>
    <p>Síntomas: ${incidencia.sintomas}</p>
    <p>Medicación: ${incidencia.medicacion}</p>
    <p>Asistencia: ${incidencia.asistencia ? 'Sí' : 'No'}</p>
    <p>Certificado: ${incidencia.certificado ? 'Sí' : 'No'}</p>    
    <img src="${incidencia.urlImagen}" alt="${incidencia.nombreImagen}" />
  `;

    return htmlContent;
  }
}
