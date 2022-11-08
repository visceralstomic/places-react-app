import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditPlaceForm from "../components/EditPlaceForm/EditPlaceForm";
import {places} from "./blankData";
import axiosInstance from "../service/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { act } from "react-dom/test-utils";


let mockAxios = new MockAdapter(axiosInstance)


beforeAll(() => {
    mockAxios.onPatch(`/places/${places[0]._id}`).reply(200, {place: places[0]})
})

test('render EditPlaceForm', () => {
    const buttonName = 'Update place';
    const formTitle = 'Edit place form'
    render(<EditPlaceForm place={places[0]} />)

    expect(screen.getAllByRole('textbox', {value: new RegExp(places[0].name)})).toBeDefined();
    expect(screen.getAllByRole('textbox', {value: places[0].descriptin})).toBeDefined();
    expect(screen.getByRole('button', {name: new RegExp(buttonName)})).toBeDefined();
    expect(screen.getByRole('heading', {name: new RegExp(formTitle)})).toBeDefined();
})


test('test edit Place Item',  async () => {

    render(<EditPlaceForm place={places[0]} />)

    const editButton = screen.getByRole('button', {name: new RegExp('Update place')});
    const nameInput = screen.getByDisplayValue(places[0].name);

    userEvent.type(nameInput, 'Some new name')
    await act( async () => {
        userEvent.click(editButton);
    })

    expect(mockAxios.history.patch[0].url).toEqual(`/places/${places[0]._id}`);
    
})