import dotenv from 'dotenv';
dotenv.config();
import type { TBybitSendDepositMail, TBinanceSendDepositMail, TOkxSendDepositMail } from "../types.js";
import nodemailer from 'nodemailer';
import formatDate from './format_date.js';
import { formatDay, formatTime } from './format_date.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 465,
    auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY
    }
})

export async function sendBybitDepositMail({ amount, address, coin, chainType, htmlContent, recipientEmailAddress }: TBybitSendDepositMail) {
    const { data, error } = await resend.emails.send({
        from: `Bybit <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `[Bybit]Deposit Confirmation`,
        html: htmlContent.replace('{{amount}}', amount)
            .replace('{{coin}}', coin)
            .replace('{{chainType}}', chainType)
            .replace('{{address}}', address)
            .replace('{{timeStamp}}', formatDate(new Date()))
    })

    if(error) throw error
}

export async function sendBinanceDepositMail({ amount, coin, htmlContent, recipientEmailAddress }: TBinanceSendDepositMail) {
    const { data, error } = await resend.emails.send({
        from: `Binance <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `[Binance] ${coin} Deposit Confirmed - ${formatDate(new Date())}(UTC)`,
        html: htmlContent.replace('{{amount}}', amount)
            .replaceAll('{{coin}}', coin)
    })

    if(error) throw error
}

export async function sendOkxDepositMail({ amount, coin, htmlContent, recipientEmailAddress }: TOkxSendDepositMail) {
    const { data, error } = await resend.emails.send({
        from: `OKX <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `You've received ${coin}`,
        html: htmlContent.replace('{{amount}}', amount)
            .replaceAll('{{coin}}', coin)
            .replace('{{timeStampDate}}', formatDay(new Date()))
            .replace('{{timeStampTime}}', formatTime(new Date()))
    })

    if(error) throw error
}