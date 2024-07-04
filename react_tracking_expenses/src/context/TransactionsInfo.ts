import { Dispatch, SetStateAction, createContext } from "react";


export interface ITransactions {
    id: string;
    title: string;
    price: number;
    date: string;
    transaction_type: string;
}

export const TransactionsInfo = createContext<
    {
        transactions: ITransactions[],
        setTransactions: Dispatch<SetStateAction<ITransactions[]>>
    } | undefined>(undefined)