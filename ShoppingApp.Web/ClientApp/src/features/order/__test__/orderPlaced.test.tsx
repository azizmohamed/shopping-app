import { describe } from "@jest/globals";
import { render , screen} from "@testing-library/react";
import OrderPlaced from "../OrderPlaced";

describe("Order Placed Page", () => {
  it("Should Display Congratulations message", () => {
    render(<OrderPlaced/>);
    expect(screen.getByText("Congratulations")).toBeInTheDocument();
  });
});
