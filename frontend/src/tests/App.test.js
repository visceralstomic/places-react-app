import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axiosInstance from "../service/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import {places, authUser} from "./blankData";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import axios from "axios";
import App from "../App";




describe('simple render of App component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={["/"]}>
             <App />
            </MemoryRouter>
         )
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





describe('render App (auth)', () => {

    let mock = new MockAdapter(axiosInstance);
    let axiosMock = new MockAdapter(axios);

    beforeAll(() => {
        mock.onGet("/places").reply(200, {places});
        mock.onGet(`/places/${places[0]._id}`).reply(200, {place: places[0]});
        mock.onDelete(`/places/${places[0]._id}`).reply(204);

        axiosMock.onGet('http://localhost:5000/user/refresh').reply(200, authUser);


        localStorage.setItem('token', 'some_token_value');
    });

    beforeEach(async () => {

        await act( async () => {
            render(
                <MemoryRouter initialEntries={["/"]}>
                    <App />
               </MemoryRouter>
            )
        });
        
    });


    afterAll(() => {
        localStorage.removeItem('token')
    })
   

    test('render page of auth user', async () => {
        
        expect(await screen.findByText(new RegExp(authUser.user.username))).toBeDefined();
        expect(await screen.findByText(new RegExp(places[0].name))).toBeDefined();
        expect(axiosMock.history.get[0].url).toEqual('http://localhost:5000/user/refresh');        
    });

    test('test sorting', async () => {
        const order = await screen.findByText(/Order/i);
        const sort = await screen.findByText(/Sort/i);
        
        await act(async () => {
            userEvent.selectOptions(order.closest('select'), ['desc']);
            userEvent.selectOptions(sort.closest('select'), ['By rating']);
        })


        const placesItems = await screen.findAllByTestId('place-id')
        expect(
            placesItems[0].querySelector(".place-info > div:first-child").textContent
            ).toBe("Name: Name 2")
    });


    test("delete place item", async () => {
        const deleteBtn = await screen.findAllByRole("button", {name: /delete/i});
        const confirmMock = jest.spyOn(window, "confirm").mockImplementation(() => true);
        await act(async () => {
            await userEvent.click(deleteBtn[0]);
        })
        
        expect(confirmMock).toBeCalled();
        expect(screen.queryByText(new RegExp(places[0].name))).toBeNull();
    })


    test('go to Edit Page', async () => {
        const editBtn = await screen.findAllByRole('button', {name: /Edit/i});
        await act(async () => {
            await userEvent.click(editBtn[0]); 
        })

        expect(screen.getByDisplayValue(new RegExp(places[0].name))).toBeDefined();
    })
})






