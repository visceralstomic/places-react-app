import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axiosInstance from "../service/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {newUser} from "./blankData"
import HelloForm from "../components/HelloForm/HelloForm";



describe('render HelloForm with api', () => {
    const mock = new MockAdapter(axiosInstance);

    beforeAll(() => {
        mock.onPost("/user/register").reply(201, newUser)
    })

    test("test registration (success)", async () => {
        render(<HelloForm />);
        const usernameInput = screen.getByPlaceholderText( /Enter username/i);
        const passwordInput = screen.getByPlaceholderText( /Enter password/i);
        const emailInput = screen.getByPlaceholderText(/Enter email/i);
        const submitButton = screen.getByRole('button', {name: /Submit/i});

        userEvent.type(usernameInput, newUser.username);
        userEvent.type(passwordInput, newUser.password);
        userEvent.type(emailInput, newUser.email);

        userEvent.click(submitButton);
        

        expect(await screen.findByText(/You are successfully registered. Now you can login/i)).toBeDefined();   
        expect(mock.history.post[0].url).toEqual("/user/register");


    });
})

