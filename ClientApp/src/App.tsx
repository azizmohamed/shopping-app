import "./App.css";
import Products from "./features/products/Products";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Checkout from "./features/checkout/Checkout";
import OrderPlaced from "./features/order/OrderPlaced";

function App() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<Products></Products>} />
          <Route path="/products" element={<Products></Products>} />
          <Route path="/shopping-cart" element={<Checkout></Checkout>} />
          <Route path="/order-placed" element={<OrderPlaced></OrderPlaced>} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
