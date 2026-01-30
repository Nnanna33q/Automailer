type TCoin = "BTC" | "ETH" | "USDT" | "USDC" | "XRP" | "BNB" | "SOL";

type BTCChainType = 'BTC';

type ETHChainType = 'Ethereum (ERC20) | Base Mainnet | Arbitrum One | BSC (BEP20) | OP Mainnet';

type USDTChainType = 'Ethereum (ERC20) | Base Mainnet | Arbitrum One | BSC (BEP20) | OP Mainnet | TRON (TRC20)';

type USDCChainType = 'Ethereum (ERC20) | Base Mainnet | Arbitrum One | BSC (BEP20) | OP Mainnet | TRON (TRC20)';

type XRPChainType = 'XRP';

type BNBChainType = 'BSC (BEP20)';

type SOLChainType = 'SOL'

type TWallet = "Bybit" | "Binance"

export type TBybitSendDepositMail = {
    amount: string,
    coin: TCoin,
    chainType: string,
    address: string,
    htmlContent: string,
    recipientEmailAddress: string
}

export type TBybitSendWithdrawalMail = {
    amount: string,
    coin: TCoin,
    chainType: string,
    address: string,
    txid: string,
    htmlContent: string,
    recipientEmailAddress: string
}

export type TBinanceSendDepositMail = {
    amount: string,
    coin: TCoin,
    htmlContent: string,
    recipientEmailAddress: string
}

export type TBinanceSendWithdrawalMail = {
    amount: string,
    coin: TCoin,
    address: string,
    txid: string,
    htmlContent: string,
    recipientEmailAddress: string
}