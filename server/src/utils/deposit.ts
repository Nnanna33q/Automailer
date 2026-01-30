import dotenv from 'dotenv';
dotenv.config();
import type { TBybitSendDepositMail, TBinanceSendDepositMail } from "../types.js";
import nodemailer from 'nodemailer';
import formatDate from './format_date.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY
    }
})

export async function sendBybitDepositMail({ amount, address, coin, chainType, htmlContent, recipientEmailAddress }: TBybitSendDepositMail) {
    return await transporter.sendMail({
        from: `Bybit <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `[Bybit]Deposit Confirmation`,
        html: htmlContent.replace('{{amount}}', amount)
            .replace('{{coin}}', coin)
            .replace('{{chainType}}', chainType)
            .replace('{{address}}', address)
            .replace('{{timeStamp}}', formatDate(new Date()))
    })
}

export async function sendBinanceDepositMail({ amount, coin, htmlContent, recipientEmailAddress }: TBinanceSendDepositMail) {
    return await transporter.sendMail({
        from: `Binance <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `[Binance] ${coin} Deposit Confirmed - ${formatDate(new Date())}(UTC)`,
        html: htmlContent.replace('{{amount}}', amount)
            .replaceAll('{{coin}}', coin)
    })
}