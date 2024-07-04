import { Dispatch, SetStateAction, createContext } from "react";


export const IsUser = createContext<{
    isUser: boolean
    setIsUser: Dispatch<SetStateAction<boolean>>
} | undefined>(undefined)