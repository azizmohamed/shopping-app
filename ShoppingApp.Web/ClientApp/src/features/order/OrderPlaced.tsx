import { Box, Typography } from "@mui/material";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const OrderPlaced = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <Typography variant="h2">Congratulation</Typography>
      <Typography variant="h5">
        Your order has been placed and we will process it soon.
      </Typography>
      <NavLink tag={Link} to="/products">
        <Typography variant="h5">Home</Typography>
      </NavLink>
    </Box>
  );
};

export default OrderPlaced;
