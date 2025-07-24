import { render, screen } from '@testing-library/react';

function Hello() {
  return <h1>Hello, Shedooby!</h1>;
}

test('renders hello text', () => {
  render(<Hello />);
  expect(screen.getByText(/shedooby/i)).toBeInTheDocument();
});
