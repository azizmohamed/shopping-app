import { describe } from "@jest/globals";
import { render } from "@testing-library/react";
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import { BrowserRouter } from 'react-router-dom';
import OrderPlaced from "../OrderPlaced";

describe("Order Placed Page", () => {
  it("Should Display Congratulations message", () => {
    const { getByText } = render(
      <Provider store={store}>
         <BrowserRouter>
          <OrderPlaced/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Congratulations")).toBeInTheDocument();
  });

  it("Should have a link to home page", () => {
    const { getByText } = render(
      <Provider store={store}>
         <BrowserRouter>
          <OrderPlaced/>
        </BrowserRouter>
      </Provider>
    );
    expect(getByText("Home")).toBeInTheDocument();
  });
});
