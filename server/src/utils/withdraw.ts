import dotenv from 'dotenv';
dotenv.config();
import type { TBybitSendWithdrawalMail, TBinanceSendWithdrawalMail, TOkxSendWithdrawalMail } from "../types.js";
import formatDate from './format_date.js';
import { formatDay, formatTime } from './format_date.js';
import { Resend } from 'resend';
import generateMockOkxWithdrawalId from './withdrawal_id.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBybitWithdrawalMail({ amount, address, coin, chainType, txid, htmlContent, recipientEmailAddress }: TBybitSendWithdrawalMail) {
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

export async function sendOkxWithdrawalMail({ amount, address, coin, txid, htmlContent, recipientEmailAddress }: TOkxSendWithdrawalMail) {
    const { data, error } = await resend.emails.send({
        from: `OKX <${process.env.SENDER_EMAIL}>`,
        to: recipientEmailAddress,
        subject: `${coin} successfully withdrawn and sent`,
        html: htmlContent.replace('{{amount}}', amount)
            .replaceAll('{{coin}}', coin)
            .replace('{{address}}', address)
            .replace('{{txid}}', txid)
            .replace('{{withdrawalId}}', generateMockOkxWithdrawalId())
            .replace('{{timeStampDate}}', formatDay(new Date()))
            .replace('{{timeStampTime}}', formatTime(new Date()))
    })

    if(error) throw error
}