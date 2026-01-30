import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
import type { TCoin } from "@/lib/types";

export function CoinSelect({ id, setCoin }: { id: string, setCoin: Dispatch<SetStateAction<TCoin | ''>> }) {
    return (
        <Select onValueChange={(newValue: TCoin) => setCoin(newValue)}>
            <SelectTrigger className="w-full py-padding">
                <SelectValue placeholder="Select a coin" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup id={id}>
                    <SelectLabel>Coins</SelectLabel>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="XRP">XRP</SelectItem>
                    <SelectItem value="BNB">BNB</SelectItem>
                    <SelectItem value="SOL">SOL</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
