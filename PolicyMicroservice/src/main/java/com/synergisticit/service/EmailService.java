package com.synergisticit.service;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.io.source.ByteArrayOutputStream;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.synergisticit.domain.Policy;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Async
    public void sendEmail(Policy policy) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        Context context = new Context();
        String greeting = "Thanks " + policy.getUserId() + "!" ;
        context.setVariable("greeting", greeting);
        context.setVariable("policyId", policy.getPolicyId());
        context.setVariable("username", policy.getUserId());
        context.setVariable("startDate", policy.getStartDate().toString());
        context.setVariable("endDate", policy.getEndDate().toString());
        context.setVariable("endDate", policy.getEndDate().toString());
        context.setVariable("maximumCoverage", policy.getMaximumCoverage() +"");
        context.setVariable("totalPremium",  "$ " + policy.getMinimumPremium());
        context.setVariable("vehicle", policy.getVehicle());
        context.setVariable("drivers", policy.getDrivers());

        String htmlContent = templateEngine.process("email-template", context);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(outputStream);
        PdfDocument pdfDoc = new PdfDocument(writer);
        ConverterProperties props = new ConverterProperties();
        HtmlConverter.convertToPdf(htmlContent, pdfDoc, props);
        pdfDoc.close();
        // Attach the PDF
        InputStreamSource attachment = new ByteArrayResource(outputStream.toByteArray());
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(policy.getUserEmail());
            helper.setSubject("Policy is confirmed");
            helper.setText(htmlContent, true);
            helper.addAttachment("invoice.pdf", attachment);
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
