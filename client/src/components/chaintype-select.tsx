import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { Dispatch, SetStateAction } from "react";

export function ChainTypeSelect({ id, setChainType }: { id: string, coin: "BTC" | "ETH" | "USDT" | "USDC" | "XRP" | "BNB" | "SOL" | '', setChainType: Dispatch<SetStateAction<string>> }) {
    return (
        <Select onValueChange={(value) => setChainType(value)}>
            <SelectTrigger className="w-full py-padding">
                <SelectValue id="select-value" placeholder='Select a network' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup id={id}>
                    <SelectLabel>Networks</SelectLabel>
                    <SelectItem value='BTC'>BTC</SelectItem>
                    <SelectItem value='Ethereum (ERC20)'>Ethereum (ERC20)</SelectItem>
                    <SelectItem value='Base Mainnet'>Base Mainnet</SelectItem>
                    <SelectItem value='Arbitrum One'>Arbitrum One</SelectItem>
                    <SelectItem value='BSC (BEP20)'>BSC (BEP20)</SelectItem>
                    <SelectItem value='OP Mainnet'>OP Mainnet</SelectItem>
                    <SelectItem value='TRON (TRC20)'>TRON (TRC20)</SelectItem>
                    <SelectItem value='XRP'>XRP</SelectItem>
                    <SelectItem value='SOL'>SOL</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
