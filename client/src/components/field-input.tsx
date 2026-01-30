import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { CoinSelect } from "./coin-select"
import { ChainTypeSelect } from "./chaintype-select"
import { useState } from "react"
import type { TCoin } from "@/lib/types"
import { Button } from "./ui/button"
import type { FormEvent } from "react"
import { ToastContainer, toast } from 'react-toastify';


class AppError extends Error {};

const url = window.location.origin === 'http://localhost:5173' ? 'http://localhost:3000' : 'https://api.automailer.online';

export function BybitDepositFieldInput({ urlEndpoint }: { urlEndpoint: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [coin, setCoin] = useState<TCoin | ''>('')
    const [chainType, setChainType] = useState('');
    const [email, setEmail] = useState('');

    async function sendMail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true);
        try {
            if(amount && address && coin && chainType && email) {
                const response = await fetch(`${url}/${urlEndpoint}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount,
                        address,
                        coin,
                        chainType,
                        recipientEmailAddress: email
                    })
                })
                const data = await response.json();
    
                if(!data.success) throw new Error(data.errorMessage);
                toast.success('Email sent');
            } else throw new AppError('Please fill all fields');
        } catch(error) {
            console.error(error);
            if(error instanceof AppError || error instanceof Error) {
                toast.error(error.message)
            } else toast.error('An unexpected error occurred');
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={sendMail}>
            <FieldSet className="w-full">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="amount">Amount</FieldLabel>
                        <Input onChange={(e) => setAmount(e.target.value)} className="py-padding" id="amount" type="text" placeholder="E.g 100" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input onChange={(e) => setAddress(e.target.value)} className="py-padding" id="address" type="text" placeholder="E.g 0x..." />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="coin-select">Coin</FieldLabel>
                        <CoinSelect id="coin-select" setCoin={setCoin} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="coin-select">Network</FieldLabel>
                        <ChainTypeSelect id="chain-type-select" setChainType={setChainType} coin={coin} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email-deposit">Email</FieldLabel>
                        <Input onChange={(e) => setEmail(e.target.value)} className="py-padding" id="email-deposit" type="email" placeholder="E.g Johndoe@gmail.com" />
                    </Field>
                </FieldGroup>
                <Button disabled={isLoading} className="py-padding text-lg">Send</Button>
            </FieldSet>
            <ToastContainer closeButton={true} draggable={true} theme="dark" />
        </form>
    )
}

export function BybitWithdrawalFieldInput({ urlEndpoint }: { urlEndpoint: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [txid, setTxid] = useState('');
    const [coin, setCoin] = useState<TCoin | ''>('')
    const [chainType, setChainType] = useState('');
    const [email, setEmail] = useState('');

    async function sendMail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true);
        try {
            if(amount && address && coin && chainType && email) {
                const response = await fetch(`${url}/${urlEndpoint}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount,
                        address,
                        txid,
                        coin,
                        chainType,
                        recipientEmailAddress: email
                    })
                })
                const data = await response.json();
    
                if(!data.success) throw new Error(data.errorMessage)
                toast.success('Email sent');
            } else throw new AppError('Please fill all fields');
        } catch(error) {
            console.error(error);
            if(error instanceof AppError || error instanceof Error) {
                toast.error(error.message)
            } else toast.error('An unexpected error occurred');
        }
        setIsLoading(false);
    }
    return (
        <form onSubmit={sendMail}>
            <FieldSet className="w-full">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="amount">Amount</FieldLabel>
                        <Input onChange={(e) => setAmount(e.target.value)} className="py-padding" id="amount" type="number" placeholder="E.g 100" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input onChange={(e) => setAddress(e.target.value)} className="py-padding" id="address" type="text" placeholder="E.g 0x..." />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="hash">Transaction Hash</FieldLabel>
                        <Input onChange={(e) => setTxid(e.target.value)} className="py-padding" id="hash" type="text" placeholder="E.g 0x..." />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="coin-select">Coin</FieldLabel>
                        <CoinSelect id="coin-select" setCoin={setCoin} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="chain-type-select">Network</FieldLabel>
                        <ChainTypeSelect id="chain-type-select" coin={coin} setChainType={setChainType} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email-withdrawal">Email</FieldLabel>
                        <Input onChange={(e) => setEmail(e.target.value)} className="py-padding" id="email-withdrawal" type="email" placeholder="E.g Johndoe@gmail.com" />
                    </Field>
                </FieldGroup>
                <Button disabled={isLoading} className="py-padding text-lg">Send</Button>
            </FieldSet>
            <ToastContainer closeButton={true} draggable={true} theme="dark" />
        </form>
    )
}

export function BinanceDepositFieldInput({ urlEndpoint }: { urlEndpoint: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [coin, setCoin] = useState<TCoin | ''>('')
    const [email, setEmail] = useState('');

    async function sendMail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true);
        try {
            if(amount && coin && email) {
                const response = await fetch(`${url}/${urlEndpoint}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount,
                        coin,
                        recipientEmailAddress: email
                    })
                })
                const data = await response.json();
    
                if(!data.success) throw new Error(data.errorMessage);
                toast.success('Email sent');
            } else throw new AppError('Please fill all fields');
        } catch(error) {
            console.error(error);
            if(error instanceof AppError || error instanceof Error) {
                toast.error(error.message)
            } else toast.error('An unexpected error occurred');
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={sendMail}>
            <FieldSet className="w-full">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="amount">Amount</FieldLabel>
                        <Input onChange={(e) => setAmount(e.target.value)} className="py-padding" id="amount" type="text" placeholder="E.g 100" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="coin-select">Coin</FieldLabel>
                        <CoinSelect id="coin-select" setCoin={setCoin} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email-deposit">Email</FieldLabel>
                        <Input onChange={(e) => setEmail(e.target.value)} className="py-padding" id="email-deposit" type="email" placeholder="E.g Johndoe@gmail.com" />
                    </Field>
                </FieldGroup>
                <Button disabled={isLoading} className="py-padding text-lg">Send</Button>
            </FieldSet>
            <ToastContainer closeButton={true} draggable={true} theme="dark" />
        </form>
    )
}

export function BinanceWithdrawalFieldInput({ urlEndpoint }: { urlEndpoint: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [amount, setAmount] = useState('');
    const [address, setAddress] = useState('');
    const [txid, setTxid] = useState('');
    const [coin, setCoin] = useState<TCoin | ''>('')
    const [email, setEmail] = useState('');

    async function sendMail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        setIsLoading(true);
        try {
            if(amount && address && coin && email) {
                const response = await fetch(`${url}/${urlEndpoint}`, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount,
                        address,
                        txid,
                        coin,
                        recipientEmailAddress: email
                    })
                })
                const data = await response.json();
    
                if(!data.success) throw new Error(data.errorMessage)
                toast.success('Email sent');
            } else throw new AppError('Please fill all fields');
        } catch(error) {
            console.error(error);
            if(error instanceof AppError || error instanceof Error) {
                toast.error(error.message)
            } else toast.error('An unexpected error occurred');
        }
        setIsLoading(false);
    }
    return (
        <form onSubmit={sendMail}>
            <FieldSet className="w-full">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="amount">Amount</FieldLabel>
                        <Input onChange={(e) => setAmount(e.target.value)} className="py-padding" id="amount" type="number" placeholder="E.g 100" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input onChange={(e) => setAddress(e.target.value)} className="py-padding" id="address" type="text" placeholder="E.g 0x..." />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="hash">Transaction Hash</FieldLabel>
                        <Input onChange={(e) => setTxid(e.target.value)} className="py-padding" id="hash" type="text" placeholder="E.g 0x..." />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="coin-select">Coin</FieldLabel>
                        <CoinSelect id="coin-select" setCoin={setCoin} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="email-withdrawal">Email</FieldLabel>
                        <Input onChange={(e) => setEmail(e.target.value)} className="py-padding" id="email-withdrawal" type="email" placeholder="E.g Johndoe@gmail.com" />
                    </Field>
                </FieldGroup>
                <Button disabled={isLoading} className="py-padding text-lg">Send</Button>
            </FieldSet>
            <ToastContainer closeButton={true} draggable={true} theme="dark" />
        </form>
    )
}