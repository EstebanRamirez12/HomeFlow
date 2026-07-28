package com.hf.homeflow.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void enviarCorreoVerificacion(String destinatario, String token) throws MessagingException {

        String enlace = "http://localhost:5173/activar-cuenta?token=" + token;

        MimeMessage mensaje = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

        helper.setTo(destinatario);
        helper.setSubject("Verifica tu cuenta en Home Flow One");
        helper.setText(crearPlantilla(enlace), true);

        mailSender.send(mensaje);
    }

    private String crearPlantilla(String enlace) {

        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                </head>
                <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">

                <table width="100%%" cellspacing="0" cellpadding="0" style="background:#f5f5f5;padding:40px 0;">
                    <tr>
                        <td align="center">

                            <table width="600" cellspacing="0" cellpadding="0"
                                   style="background:white;border-radius:10px;overflow:hidden;box-shadow:0 3px 10px rgba(0,0,0,.1);">

                                <tr>
                                    <td style="background:#2563EB;padding:30px;text-align:center;color:white;">
                                        <h1 style="margin:0;">
                                            Home Flow One
                                        </h1>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding:40px;">

                                        <h2 style="color:#333;">
                                            ¡Bienvenido!
                                        </h2>

                                        <p style="font-size:16px;color:#555;line-height:1.6;">
                                            Gracias por registrarte en
                                            <strong>Home Flow One</strong>.
                                        </p>

                                        <p style="font-size:16px;color:#555;">
                                            Para activar tu cuenta presiona el siguiente botón:
                                        </p>

                                        <div style="text-align:center;margin:40px 0;">

                                            <a href="%s"
                                               style="
                                                background:#2563EB;
                                                color:white;
                                                text-decoration:none;
                                                padding:15px 35px;
                                                border-radius:8px;
                                                display:inline-block;
                                                font-size:18px;
                                                font-weight:bold;">
                                                Verificar cuenta
                                            </a>

                                        </div>

                                        <p style="font-size:14px;color:#777;">
                                            Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:
                                        </p>

                                        <p style="font-size:14px;word-break:break-all;">
                                            %s
                                        </p>

                                    </td>
                                </tr>

                                <tr>
                                    <td style="background:#f0f0f0;padding:20px;text-align:center;font-size:13px;color:#777;">
                                        © 2026 Home Flow One<br>
                                        Este correo fue enviado automáticamente.
                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>
                </table>

                </body>
                </html>
                """
                .formatted(enlace, enlace);
    }

}