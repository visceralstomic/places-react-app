import { screen, render, findByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axiosInstance from "../service/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {places, authUser} from "./blankData";
import { act } from "react-dom/test-utils";
import axios from "axios";
import App from "../App";





describe('render App (auth)', () => {

    let mock = new MockAdapter(axiosInstance);
    let axiosMock = new MockAdapter(axios);

    beforeAll(() => {
        mock.onGet("/places").reply(200, {places});
        mock.onGet(`/places/${places[0]._id}`).reply(200, {place: places[0]});

        axiosMock.onGet('http://localhost:5000/user/refresh').reply(200, authUser);


        localStorage.setItem('token', 'some_token_value');
    });

    beforeEach(async () => {

        await act( async () => render(<App/>));
        
    });


    afterAll(() => {
        localStorage.removeItem('token')
    })
   

    test('render page of auth user', async () => {
        
        expect(await screen.findByText(new RegExp(authUser.user.username))).toBeDefined();
        expect(await screen.findByText(new RegExp(places[0].name))).toBeDefined();
        expect(axiosMock.history.get[0].url).toEqual('http://localhost:5000/user/refresh');        
    });


    test('go to Edit Page', async () => {
        const editBtn = await screen.findAllByRole('button', {name: /Edit/i});
        await act(async () => {
            await userEvent.click(editBtn[0]); 
        })

        expect(screen.getByDisplayValue(new RegExp(places[0].name))).toBeDefined();
    })
})



/*
describe('simple render of App component', () => {
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
})

*/



