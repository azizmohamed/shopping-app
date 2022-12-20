import {
  Box,
  IconButton,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";
import { Product, selectProducts } from "./checkoutSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CountrySelector, { countries, Country } from "../shared/CountrySelect";
import {
  OrderAmount,
  usePostOrderCalculateMutation,
  usePostOrderPlaceMutation,
} from "../../Api/shoppingApi";

const Checkout = () => {
  const [calculateAmount] = usePostOrderCalculateMutation();
  const [placeOrder] = usePostOrderPlaceMutation();
  const products = useAppSelector(selectProducts);
  const [orderAmount, setOrderAmount] = useState<OrderAmount>();
  const [selectedCountry, setSelectedCountry] = useState("Australia");
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      products: products,
    },
    mode: "onBlur",
  });
  const { fields, remove } = useFieldArray(
    {
      control: methods.control,
      name: "products",
    }
  );

  const processOrder = (formData: { products: Product[] }) => {
    placeOrder({
      body: formData.products.map((p) => {
        return {
          productId: p.id,
          quantity: p.quantity,
        };
      }),
    })
      .unwrap()
      .then((order) => {
        methods.setValue('products', []);
        navigate("/order-placed");
      });
  };

  const shipping = (formData: { products: Product[] }) => {
    calculateAmount({
      body: formData.products.map((p) => {
        return {
          productId: p.id,
          quantity: p.quantity,
        };
      }),
    })
      .unwrap()
      .then((orderAmount) => {
        setOrderAmount(orderAmount);
      });
  };

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      methods.handleSubmit(shipping)();
    });
    return () => subscription.unsubscribe();
  }, [methods, methods.watch]);

  const totalField = (product: Product, quantity: number) => {
    const total = (product.price || 0) * quantity;
    return addCurrencyRate(total);
  };

  const addCurrencyRate = (amount?: number) => {
    const country = countries.find((c) => c.name === selectedCountry);
    const calculatedAmount = (amount || 0) * (country?.currencyRate || 1);
    return (country?.currencySymbol || "$") + calculatedAmount.toFixed(2);
  };

  const OrderSummary = () => {
    const country = countries.find((c) => c.name === selectedCountry);
    return (
      <Box
        role={"order-summary"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          gap: "0.5rem"
        }}
      >
        <Typography>
          <strong>Amount({country?.currencyName || "AUD"}):</strong>{" "}
          {addCurrencyRate(orderAmount?.amount)}
        </Typography>
        <Typography>
          <strong>Shipping({country?.currencyName || "AUD"}):</strong>{" "}
          {addCurrencyRate(orderAmount?.shipping)}
        </Typography>
        <Typography>
          <strong>Total({country?.currencyName || "AUD"}):</strong>{" "}
          {addCurrencyRate(orderAmount?.total)}
        </Typography>
        <Button
          variant="contained"
          sx={{ borderRadius: "1rem" }}
          onClick={methods.handleSubmit(processOrder)}>
          Place Order
        </Button>
      </Box>
    );
  };

  return (
    <FormProvider {...methods} >
      <Box role={"checkout-container"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            pt: "1rem",
          }}
        >
          <NavLink tag={Link} to="/products">
            <Typography variant="h5">Home</Typography>
          </NavLink>
          <CountrySelector
            country={selectedCountry}
            countrySelected={(country?: Country) => {
              setSelectedCountry(country?.name || "Australia");
            }}
          ></CountrySelector>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "25rem" }}>Product</TableCell>
              <TableCell sx={{ width: "3rem" }}>
                Price(
                {
                  countries.find((c) => c.name === selectedCountry)
                    ?.currencyName
                }
                )
              </TableCell>
              <TableCell sx={{ width: "6rem" }}>Quantity</TableCell>
              <TableCell sx={{ width: "6rem" }}>Total(
                {
                  countries.find((c) => c.name === selectedCountry)
                    ?.currencyName
                }
                )</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((product, index) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell> {addCurrencyRate(product.price)}</TableCell>
                  <TableCell>
                    <Controller
                      control={methods.control}
                      name={`products.${index}.quantity`}
                      render={({ field }) => (
                        <TextField
                          sx={{ width: "5rem" }}
                          inputProps={{
                            min: 1,
                          }}
                          type={"number"}
                          placeholder="Quantity"
                          {...field}
                        ></TextField>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    {totalField(
                      product,
                      methods.getValues(`products.${index}.quantity`) || 0
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <OrderSummary />

      </Box>
    </FormProvider>
  );
};

export default Checkout;
