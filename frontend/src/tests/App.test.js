import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "../App";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mock;
mock = new MockAdapter(axios);

test('render App', () => {
    render(<App />);
    expect(screen.getByText(/this is hello page/i)).toBeInTheDocument();
})