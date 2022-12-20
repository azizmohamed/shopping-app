import { describe } from "@jest/globals";
import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { BrowserRouter } from 'react-router-dom';
import Checkout from "../Checkout";

describe("Checkout Page", () => {
  it("Should have the main container box", () => {
    const { getByRole } = render(
      <Provider store={store}>
         <BrowserRouter>
          <Checkout/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByRole("checkout-container")).toBeInTheDocument();
  });

  it("Should have the order summary container", () => {
    const { getByRole } = render(
      <Provider store={store}>
         <BrowserRouter>
          <Checkout/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByRole("order-summary")).toBeInTheDocument();
  });

  it("Should have a link to home page", () => {
    const { getByText } = render(
      <Provider store={store}>
         <BrowserRouter>
          <Checkout/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Home")).toBeInTheDocument();
  });
});
