import dotenv from 'dotenv';
dotenv.config();
import type { TBybitSendWithdrawalMail, TBinanceSendWithdrawalMail } from "../types.js";
import nodemailer from 'nodemailer';
import formatDate from './format_date.js';
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

export async function sendBybitWithdrawalMail({ amount, address, coin, chainType, txid, htmlContent, recipientEmailAddress }: TBybitSendWithdrawalMail) {
    // return await transporter.sendMail({
    //     from: `Bybit <${process.env.SENDER_EMAIL}>`,
    //     to: recipientEmailAddress,
    //     subject: `[Bybit]Withdrawal Success`,
    //     html: htmlContent.replace('{{amount}}', amount)
    //         .replace('{{coin}}', coin)
    //         .replace('{{chainType}}', chainType)
    //         .replace('{{address}}', address)
    //         .replace('{{txid}}', txid)
    // })
    const { data, error } = await resend.emails.send({
        from: `Bybit <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `[Bybit]Withdrawal Success`,
        html: htmlContent.replace('{{amount}}', amount)
            .replace('{{coin}}', coin)
            .replace('{{chainType}}', chainType)
            .replace('{{address}}', address)
            .replace('{{txid}}', txid)
    })

    if(error) throw error;
}

export async function sendBinanceWithdrawalMail({ amount, address, coin, txid, htmlContent, recipientEmailAddress }: TBinanceSendWithdrawalMail) {
    // return await transporter.sendMail({
    //     from: `Binance <${process.env.SENDER_EMAIL}>`,
    //     to: recipientEmailAddress,
    //     subject: `[Binance] Withdrawal Successful - ${formatDate(new Date())}(UTC)`,
    //     html: htmlContent.replace('{{amount}}', amount)
    //         .replace('{{coin}}', coin)
    //         .replace('{{address}}', address)
    //         .replace('{{txid}}', txid)
    // })

    const { data, error } = await resend.emails.send({
        from: `Binance <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `[Binance] Withdrawal Successful - ${formatDate(new Date())}(UTC)`,
        html: htmlContent.replace('{{amount}}', amount)
            .replace('{{coin}}', coin)
            .replace('{{address}}', address)
            .replace('{{txid}}', txid)
    })

    if(error) throw error
}