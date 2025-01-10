import { Member } from "../lib/types/member";
import { useContext, createContext } from "react";
import { CartItem } from "../lib/types/search";


interface GlobalInterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void;
    orderBuilder: Date;
    setOrderBuilder: (input: Date) => void;

     // Basket funksiyalari
     cartItems: CartItem[];
     onAdd: (item: CartItem) => void;
     onRemove: (item: CartItem) => void;
     onDelete: (item: CartItem) => void;
     onDeleteAll: () => void;
};

export const GlobalContext = createContext<GlobalInterface | undefined>(
    undefined
);

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) throw new Error("useGlobals withit Provider");
    return context;
};