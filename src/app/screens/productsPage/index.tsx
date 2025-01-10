import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Container } from "@mui/material";
import ChosenProducts from "./ChosenProduct";
import Products from "./Products";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobal";
   
export default function ProductsPage() {
   const products = useRouteMatch();
   console.log("products:", products);

  return (
  <div className={"products-page"}>
      <Switch>
         <Route path={`${products.path}/:productId`}>
            <ChosenProducts />
         </Route>
         <Route path={`${products.path}`}>
            <Products />
         </Route>
      </Switch>   
   </div>
  );
  }
  