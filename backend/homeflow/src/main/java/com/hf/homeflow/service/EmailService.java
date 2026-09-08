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

    public void enviarCorreo(String destinatario, String token, String tipoCorreo) throws MessagingException {
    	
    	String enlace = "";
    	String subject = "";
    	
    	if("activar".equals(tipoCorreo)) {
    		enlace = "http://localhost:5173/activar-cuenta?token=" + token;
    		subject = "Verifica tu cuenta en Home Flow One";
    	}
    	
    	if("restablecer".equals(tipoCorreo)) {
    		enlace = "http://localhost:5173/reset-password?token=" + token;
    		subject = "Recuperar contraseña de Home Flow One";
    	}

        MimeMessage mensaje = mailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

        helper.setTo(destinatario);
        helper.setSubject(subject);
        helper.setText(crearPlantilla(enlace, tipoCorreo), true);

        mailSender.send(mensaje);
    }

    private String crearPlantilla(String enlace, String tipoCorreo) {

        boolean esRestablecer = "restablecer".equalsIgnoreCase(tipoCorreo);

        String titulo = esRestablecer
                ? "Restablecer contraseña"
                : "¡Bienvenido!";

        String mensaje = esRestablecer
                ? "Para recuperar tu contraseña presiona el siguiente botón:"
                : "Para activar tu cuenta presiona el siguiente botón:";

        String textoBoton = esRestablecer
                ? "Recuperar contraseña"
                : "Verificar cuenta";

        String mensajeRegistro = esRestablecer
                ? "Hemos recibido una solicitud para restablecer tu contraseña en"
                : "Gracias por registrarte en";

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
                                            %s
                                        </h2>

                                        <p style="font-size:16px;color:#555;line-height:1.6;">
                                            %s
                                            <strong>Home Flow One</strong>.
                                        </p>

                                        <p style="font-size:16px;color:#555;">
                                            %s
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
                                                %s
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
                .formatted(
                        titulo,
                        mensajeRegistro,
                        mensaje,
                        enlace,
                        textoBoton,
                        enlace
                );
    }


}