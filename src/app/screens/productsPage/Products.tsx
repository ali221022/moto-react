import React, { ChangeEvent, useEffect, useState } from "react";
import { Container, Button, Box, Stack, colors, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./slice";
import { Product, ProductInquiry } from "../../lib/types/product";
import { retrieveProducts } from "./selector";
import "../../../css/products.css";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../lib/enums/product.enum";
import { serverApi } from "../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobal";

/** REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.SportBikes,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();
  const { onAdd } = useGlobals();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** Handlers */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const choosenDishHandler = (id: string) => {
    history.push(`products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Box className={"product-text"}>Turbo Moto</Box>
            <Stack className={"single-search-big-box"}>
              <input
                type={"search"}
                className={"single-search-input"}
                name={"singleResearch"}
                placeholder={"Type here"}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                className={"single-button-search"}
                variant="contained"
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className={"dishes-filter-section"}>
            <Stack className={"dishes-filter-box"}>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.Scooters
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.Scooters)
                  }
                >
                  SCOOTERS
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.CafeRacerBikes
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.CafeRacerBikes)
                  }
                >
                  CAFERACER
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.ElectricMotorcycles
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(
                      ProductCollection.ElectricMotorcycles
                    )
                  }
                >
                  ELECTRIC
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.TouringBikes
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.TouringBikes)
                  }
                >
                  TOURING
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.SportBikes
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SportBikes)
                  }
                >
                  SPORT
                </Button>
              </div>
            </Stack>

            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => choosenDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Motocycles are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container className={"family-brands"}>
          <Box className={"brand-text"}>Our Best Brands</Box>
          <Stack className={"logo-list"}>
            <Stack className={"logo"}>
              <img src="/img/ourBrand1.jpg" alt="" />
            </Stack>
            <Stack className={"logo"}>
              <img src="/img/ourBrand2.jpg" alt="" />
            </Stack>
            <Stack className={"logo"}>
              <img src="/img/ourBrand3.png" alt="" />
            </Stack>
            <Stack className={"logo"}>
              <img src="/img/ourBrand4.png" alt="" />
            </Stack>
          </Stack>
        </Container>
      </div>

      <div className={"our-address"}>
        <Container className={"address-blog"}>
          <Box className={"address-text"}>Our address</Box>
          <iframe
            style={{ marginTop: "60px" }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d40483.87517336351!2d71.64412963365315!3d40.40686745184124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb9f24d45c9ec7%3A0xdcccc38c577329c5!2sOQ%20MOZOR%20OTA%20JOME%20MASJIDI!5e0!3m2!1sru!2skr!4v1736602483293!5m2!1sru!2skr" 
            width={"1300px"}
            height={"500px"}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Container>
      </div>
    </div>
  );
}
