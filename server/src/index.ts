import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { sendBybitDepositMail, sendBinanceDepositMail } from './utils/deposit.js';
import { sendBybitWithdrawalMail, sendBinanceWithdrawalMail } from './utils/withdraw.js';
import { validateBybitDepositBody, validateBybitWithdrawalBody, validateBinanceDepositBody, validateBinanceWithdrawalBody, checkErrors } from './utils/validation.js';
import type { Request, Response } from 'express';
import type { TBybitDepositBody, TBybitWithdrawalBody, TBinanceDepositBody, TBinanceWithdrawalBody } from './utils/validation.js';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
// import { rateLimit } from 'express-rate-limit';

const [ bybitDepositHtmlContent, bybitWithdrawalHtmlContent, binanceDepositHtmlContent, binanceWithdrawalHtmlContent ] = await Promise.all([
    fs.readFile(path.join('./html_templates/bybit_deposit.html'), { encoding: 'utf-8' }),
    fs.readFile(path.join('./html_templates/bybit_withdrawal.html'), { encoding: 'utf-8' }),
    fs.readFile(path.join('./html_templates/binance_deposit.html'), { encoding: 'utf-8' }),
    fs.readFile(path.join('./html_templates/binance_withdrawal.html'), { encoding: 'utf-8' })
])

const PORT = process.env.PORT || 3000
const app = express();

app.use(cors({
    origin: (origin, callback) => {
        if(process.env.NODE_ENVIRONMENT === 'production' && origin === 'https://api.automailer.online') {
            callback(null, true)
        } else if(process.env.NODE_ENVIRONMENT === 'development' && origin === 'http://localhost:5173') {
            callback(null, true);
        } else callback(new Error('This origin is not allowed'), false)
    }
}))

// app.use(rateLimit({
//     windowMs: 60 * 1000,
//     limit: 10,
//     message: { success: false, errorMessage: `You're sending too many emails, please wait a moment` }
// }))

app.use(express.json());

app.get('/ping', (req, res) => res.status(200).json('ping'));

app.post('/bybit/deposit', validateBybitDepositBody, checkErrors, async (req: Request, res: Response) => {
    try {
        const body: TBybitDepositBody = req.body;
        await sendBybitDepositMail({
            amount: body.amount,
            address: body.address,
            coin: body.coin,
            chainType: body.chainType,
            recipientEmailAddress: body.recipientEmailAddress,
            htmlContent: bybitDepositHtmlContent
        })
        res.status(201).json({ success: true });
    } catch(error) {
        console.error(error);
        if(error instanceof Error) return res.status(500).json({ success: false, errorMessage: error.message });
        res.status(500).json({ success: false, errorMessage: 'Something went wrong. Please try again' });
    }
})

app.post('/bybit/withdrawal', validateBybitWithdrawalBody, checkErrors, async(req: Request, res: Response) => {
    try {
        const body: TBybitWithdrawalBody = req.body;
        await sendBybitWithdrawalMail({
            amount: body.amount,
            address: body.address,
            coin: body.coin,
            chainType: body.chainType,
            recipientEmailAddress: body.recipientEmailAddress,
            txid: body.txid,
            htmlContent: bybitWithdrawalHtmlContent
        })
        res.status(201).json({ success: true });
    } catch(error) {
        console.error(error);
        if(error instanceof Error) return res.status(500).json({ success: false, errorMessage: error.message });
        res.status(500).json({ success: false, errorMessage: 'Something went wrong. Please try again' });
    }
})

app.post('/binance/deposit', validateBinanceDepositBody, checkErrors, async (req: Request, res: Response) => {
    try {
        const body: TBinanceDepositBody = req.body;
        await sendBinanceDepositMail({
            amount: body.amount,
            coin: body.coin,
            recipientEmailAddress: body.recipientEmailAddress,
            htmlContent: binanceDepositHtmlContent
        })
        res.status(201).json({ success: true });
    } catch(error) {
        console.error(error);
        if(error instanceof Error) return res.status(500).json({ success: false, errorMessage: error.message });
        res.status(500).json({ success: false, errorMessage: 'Something went wrong. Please try again' });
    }
})

app.post('/binance/withdrawal', validateBinanceWithdrawalBody, checkErrors, async(req: Request, res: Response) => {
    try {
        const body: TBinanceWithdrawalBody = req.body;
        await sendBinanceWithdrawalMail({
            amount: body.amount,
            address: body.address,
            coin: body.coin,
            recipientEmailAddress: body.recipientEmailAddress,
            txid: body.txid,
            htmlContent: binanceWithdrawalHtmlContent
        })
        res.status(201).json({ success: true });
    } catch(error) {
        console.error(error);
        if(error instanceof Error) return res.status(500).json({ success: false, errorMessage: error.message });
        res.status(500).json({ success: false, errorMessage: 'Something went wrong. Please try again' });
    }
})

app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));