import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../lib/types/member";
import { GlobalContext } from "../hooks/useGlobal";
import useBasket from "../hooks/useBasket"; 

const ContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
   const cookies = new Cookies();
   if(!cookies.get("accessToken")) localStorage.removeItem("memberData");

   const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData") 
    ? JSON.parse(localStorage.getItem("memberData") as string) 
    : null
   ); 

   const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
   const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

   console.log("=== verify ===");

   return(
   <GlobalContext.Provider 
      value={{ 
         authMember, 
         setAuthMember, 
         orderBuilder, 
         setOrderBuilder, 
         cartItems, 
         onAdd, 
         onRemove, 
         onDelete, 
         onDeleteAll 
         }}>
      {children}
    </GlobalContext.Provider>);  
}

export default ContextProvider;