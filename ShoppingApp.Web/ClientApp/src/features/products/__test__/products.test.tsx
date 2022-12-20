import { describe } from "@jest/globals";
import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { BrowserRouter } from 'react-router-dom';
import Products from "../Products";

describe("Products Page", () => {
  it("Should have the main container box", () => {
    const { getByRole } = render(
      <Provider store={store}>
         <BrowserRouter>
          <Products/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByRole("products-container")).toBeInTheDocument();
  });

  it("Should have a link to shopping cart", () => {
    const { getByRole } = render(
      <Provider store={store}>
         <BrowserRouter>
          <Products/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByRole("shopping-cart-link")).toBeInTheDocument();
  });
});
