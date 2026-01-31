import z from "zod";
import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const supportedCoins = ['BTC', 'ETH', 'USDT', 'USDC', 'XRP', 'BNB', 'SOL'];

const supportedChainTypes = {
    'BTC': ['BTC'],
    'ETH': ['Ethereum (ERC20)', 'Base Mainnet', 'Arbitrum One', 'BSC (BEP20)', 'OP Mainnet'],
    'USDT': ['Ethereum (ERC20)', 'Base Mainnet', 'Arbitrum One', 'BSC (BEP20)', 'OP Mainnet', 'TRON (TRC20)'],
    'USDC': ['Ethereum (ERC20)', 'Base Mainnet', 'Arbitrum One', 'BSC (BEP20)', 'OP Mainnet', 'TRON (TRC20)'],
    'XRP': ['XRP'],
    'BNB': ['BSC (BEP20)'],
    'SOL': ['SOL']
}

const BybitDepositBodySchema = z.object({
    amount: z.string(),
    coin: z.enum(['BTC', 'ETH', 'USDT', 'USDC', 'XRP', 'BNB', 'SOL']),
    chainType: z.string(),
    address: z.string(),
    recipientEmailAddress: z.email()
})

const BinanceDepositBodySchema = z.object({
    amount: z.string(),
    coin: z.enum(['BTC', 'ETH', 'USDT', 'USDC', 'XRP', 'BNB', 'SOL']),
    recipientEmailAddress: z.email()
})

export type TBybitDepositBody = z.infer<typeof BybitDepositBodySchema>

export type TBybitWithdrawalBody = TBybitDepositBody & {
    txid: string;
}

export type TBinanceDepositBody = z.infer<typeof BinanceDepositBodySchema>;

export type TBinanceWithdrawalBody = TBinanceDepositBody & {
    txid: string,
    address: string
}

export const validateBybitDepositBody = [
    body('amount').trim().isString().notEmpty().withMessage('Please enter an amount').custom((input) => {
        if (isNaN(input)) throw new Error('Use digits only (e.g. 100)');
        return true;
    }),
    body('coin').trim().isString().notEmpty().withMessage('Please enter a coin').custom((input) => {
        if (supportedCoins.indexOf(input) === -1) throw new Error(`"${input}" is not a supported coin`);
        return true;
    }),
    body('chainType').trim().isString().notEmpty().withMessage('Please select a chain type').custom((input, { req }) => {
        const body = req.body as TBybitDepositBody
        if (!supportedChainTypes[body.coin] || supportedChainTypes[body.coin].indexOf(input) === -1) throw new Error(`"${input}" is not a supported chain type for "${body.coin}"`);
        return true;
    }),
    body('address').trim().isString().notEmpty().withMessage('Please enter an address'),
    body('recipientEmailAddress').trim().isString().notEmpty().withMessage('Please enter an email').isEmail().withMessage('Please enter a valid email')
]

export const validateBybitWithdrawalBody = [
    body('amount').trim().isString().notEmpty().withMessage('Please enter an amount').custom((input) => {
        if (isNaN(input)) throw new Error('Use digits only (e.g. 100)');
        return true;
    }),
    body('coin').trim().isString().notEmpty().withMessage('Please enter a coin').custom((input) => {
        if (supportedCoins.indexOf(input) === -1) throw new Error(`"${input}" is not a supported coin`);
        return true;
    }),
    body('chainType').trim().isString().notEmpty().withMessage('Please select a chain type').custom((input, { req }) => {
        const body = req.body as TBybitWithdrawalBody
        if (!supportedChainTypes[body.coin] || supportedChainTypes[body.coin].indexOf(input) === -1) throw new Error(`"${input}" is not a supported chain type for "${body.coin}"`);
        return true;
    }),
    body('txid').trim().isString().notEmpty().withMessage('Please enter a transaction hash (txid)'),
    body('address').trim().isString().notEmpty().withMessage('Please enter an address'),
    body('recipientEmailAddress').trim().isString().notEmpty().withMessage('Please enter an email').isEmail().withMessage('Please enter a valid email')
]

export const validateBinanceDepositBody = [
    body('amount').trim().isString().notEmpty().withMessage('Please enter an amount').custom((input) => {
        if (isNaN(input)) throw new Error('Use digits only (e.g. 100)');
        return true;
    }),
    body('coin').trim().isString().notEmpty().withMessage('Please enter a coin').custom((input) => {
        if (supportedCoins.indexOf(input) === -1) throw new Error(`"${input}" is not a supported coin`);
        return true;
    }),
    body('recipientEmailAddress').trim().isString().notEmpty().withMessage('Please enter an email').isEmail().withMessage('Please enter a valid email')
]

export const validateBinanceWithdrawalBody = [
    body('amount').trim().isString().notEmpty().withMessage('Please enter an amount').custom((input) => {
        if (isNaN(input)) throw new Error('Use digits only (e.g. 100)');
        return true;
    }),
    body('coin').trim().isString().notEmpty().withMessage('Please enter a coin').custom((input) => {
        if (supportedCoins.indexOf(input) === -1) throw new Error(`"${input}" is not a supported coin`);
        return true;
    }),
    body('txid').trim().isString().notEmpty().withMessage('Please enter a transaction hash (txid)'),
    body('address').trim().isString().notEmpty().withMessage('Please enter an address'),
    body('recipientEmailAddress').trim().isString().notEmpty().withMessage('Please enter an email').isEmail().withMessage('Please enter a valid email')
]

export function checkErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).json({ success: false, errorMessage: errors.array()[0]?.msg });
    }
}