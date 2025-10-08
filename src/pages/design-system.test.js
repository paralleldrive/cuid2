import React from "react";
import { test } from "riteway";
import { render, fireEvent } from "@testing-library/react";
import { Button, Typography, Card, Header } from "./design-system";

test("Button component", async ({ assert }) => {
  const { getByText } = render(
    <Button onClick={() => {}} variant="primary">
      Test Button
    </Button>
  );

  const button = getByText("Test Button");
  assert(button !== null, "Button should render");
  assert(button.tagName === "BUTTON", "Should render as button element");
});

test("Button CTA functionality", async ({ assert }) => {
  let clicked = false;
  const handleClick = () => {
    clicked = true;
  };

  const { getByText } = render(
    <Button onClick={handleClick} variant="primary">
      CTA Button
    </Button>
  );

  const button = getByText("CTA Button");
  fireEvent.click(button);

  assert(clicked === true, "Button should call onClick handler when clicked");
});

test("Button variants", async ({ assert }) => {
  const variants = ["primary", "secondary", "outline", "accent"];

  variants.forEach((variant) => {
    const { getByText } = render(
      <Button onClick={() => {}} variant={variant}>
        {variant} Button
      </Button>
    );

    const button = getByText(`${variant} Button`);
    assert(button !== null, `Should render ${variant} variant`);
  });
});

test("Button sizes", async ({ assert }) => {
  const sizes = ["small", "medium", "large"];

  sizes.forEach((size) => {
    const { getByText } = render(
      <Button onClick={() => {}} size={size}>
        {size} Button
      </Button>
    );

    const button = getByText(`${size} Button`);
    assert(button !== null, `Should render ${size} size`);
  });
});

test("Button disabled state", async ({ assert }) => {
  let clicked = false;
  const handleClick = () => {
    clicked = true;
  };

  const { getByText } = render(
    <Button onClick={handleClick} disabled>
      Disabled Button
    </Button>
  );

  const button = getByText("Disabled Button");
  fireEvent.click(button);

  assert(clicked === false, "Disabled button should not call onClick handler");
  assert(button.disabled === true, "Button should be disabled");
});

test("Typography component", async ({ assert }) => {
  const variants = [
    "h1",
    "h2",
    "h3",
    "h4",
    "body",
    "lead",
    "small",
    "code",
    "pre",
  ];

  variants.forEach((variant) => {
    const { getByText } = render(
      <Typography variant={variant}>{variant} text</Typography>
    );

    const element = getByText(`${variant} text`);
    assert(element !== null, `Should render ${variant} variant`);
  });
});

test("Card component", async ({ assert }) => {
  const variants = ["default", "elevated", "outlined", "flat", "accent"];

  variants.forEach((variant) => {
    const { getByText } = render(
      <Card variant={variant}>{variant} card content</Card>
    );

    const element = getByText(`${variant} card content`);
    assert(element !== null, `Should render ${variant} card variant`);
  });
});

test("Header component", async ({ assert }) => {
  const { getByText } = render(
    <Header>
      <Typography variant="h1">Test Header</Typography>
    </Header>
  );

  const header = getByText("Test Header");
  assert(header !== null, "Header should render");
  assert(header.tagName === "H1", "Should render header content");
});
