import { Dispatch, SetStateAction, createContext } from "react";


export const IsChange = createContext<{
    isChange: boolean,
    setIsChange: Dispatch<SetStateAction<boolean>>
} | undefined>(undefined)