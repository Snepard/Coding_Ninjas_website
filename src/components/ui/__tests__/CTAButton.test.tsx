import { render, screen, fireEvent } from "@testing-library/react";
import { CTAButton } from "../CTAButton";

jest.mock("@/lib/analytics", () => ({
  trackEvent: jest.fn(),
}));

describe("CTAButton", () => {
  it("renders children and handles click tracking", () => {
    const handleClick = jest.fn();
    render(
      <CTAButton trackingId="test-cta" onClick={handleClick}>
        Engage
      </CTAButton>,
    );

    const button = screen.getByRole("button", { name: /engage/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as an anchor for external links", () => {
    render(
      <CTAButton href="https://example.com" variant="secondary">
        Learn more
      </CTAButton>,
    );

    const link = screen.getByRole("link", { name: /learn more/i });
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
