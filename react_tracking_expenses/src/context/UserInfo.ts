import { Dispatch, SetStateAction, createContext } from "react";


export interface IUserInfo {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
}

export const UserInfo = createContext<
    {
        userInfo: IUserInfo,
        setUserInfo: Dispatch<SetStateAction<IUserInfo>>
    } | undefined>(undefined)