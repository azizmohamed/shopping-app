import { Box, MenuItem, Select, Typography } from "@mui/material";
import { ReactElement } from "react";
import australianFlag from "../../images/australianFlag.png";
import britainFlag from "../../images/britainFlag.png";
import usaFlag from "../../images/usaFlag.png";

export interface Country {
  name: string;
  currencyRate: number;
  currencyName: string;
  currencySymbol: string;
  flag: ReactElement<any, any>;
}

const Flag: React.FC<{ image: string }> = ({ image }) => {
  return (
    <Box
      component="img"
      sx={{
        height: 30,
        width: 30,
      }}
      src={image}
    ></Box>
  );
};

export const countries: Country[] = [
  {
    name: "Australia",
    currencyName:"AUD",
    currencySymbol: "$",
    currencyRate: 1,
    flag: <Flag image={australianFlag} />,
  },
  {
    name: "USA",
    currencyName:"USD",
    currencySymbol: "$",
    currencyRate: 0.67,
    flag: <Flag image={usaFlag} />,
  },
  {
    name: "GreatBritain",
    currencyName:"GDP",
    currencySymbol: "£",
    currencyRate: 0.55,
    flag: <Flag image={britainFlag} />,
  },
];

const CountrySelector: React.FC<{
  country?: string;
  countrySelected: (country?: Country) => void;
}> = ({ country, countrySelected }) => {
  return (
    <Select
      sx={{ width: "4rem", height:"2rem" }}
      value={country}
      onChange={(e) => {
        countrySelected(countries.find(c => c.name === e.target.value));
      }}
    >
      {countries.map((country) => {
        return (
          <MenuItem
            key={country.name}
            value={country.name}
            sx={{
              width: "4rem",
            }}
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems={"center"}
              width="100%"
            >
              {country.flag}
            </Box>
          </MenuItem>
        );
      })}
    </Select>
  );
};
export default CountrySelector;
