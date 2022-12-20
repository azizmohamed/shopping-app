import { Box, Card, IconButton, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import {
  useGetProductQuery,
} from "../../Api/shoppingApi";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { addToCart } from "../checkout/checkoutSlice";
import { useAppDispatch } from "../../app/hooks";

const Products = () => {
  const products = useGetProductQuery({
    count: 10,
    page: 0,
  }).data;
  const dispatch = useAppDispatch();
  return (
    <Box
      role={"products-container"}
      sx={{
        width: "40rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          pt: "1rem",
        }}
      >
        <NavLink tag={Link} to="/shopping-cart" role={"shopping-cart-link"} >
          <ShoppingCartCheckoutIcon
            sx={{ width: "4rem", height: "4rem" }}
          ></ShoppingCartCheckoutIcon>
        </NavLink>
      </Box>

      {products?.map((product) => {
        return (
          <Card key={product.id} sx={{ backgroundColor: "silver" }}>
            <Box
              sx={{
                p: "1rem",
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 75,
                  width: 105,
                  borderRadius: 3,
                }}
                alt={product.name || ""}
                src={product.thumbnail || ""}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  gap: "0.5rem",
                  width: "25rem",
                }}
              >
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body1" textAlign={"left"}>
                  {product.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">
                  {"$" + product.price?.toFixed(2)}
                </Typography>
                <IconButton
                  onClick={() => {
                    dispatch(addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                    }));
                  }}
                >
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                </IconButton>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
};

export default Products;
