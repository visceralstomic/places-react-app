import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";


beforeEach(() => {
    render(<App />);
})


test('render App (Hello page)', () => {
    
    expect(screen.getByText(/this is hello page/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up form/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('render App. Got to login page', async () => {
    const login = screen.getByText(/Login/i);
    userEvent.click(login);
    expect(await screen.findByText(/Login form/i)).toBeInTheDocument();
    expect(await screen.findByRole('textbox', {placeholder: /enter email/i})).toBeInTheDocument();
    expect(await screen.findByRole('textbox', {placeholder: /enter password/i})).toBeInTheDocument();
});