import { screen, render } from "@testing-library/react";
import EditPlaceForm from "../components/EditPlaceForm/EditPlaceForm";
import EditPage from "../pages/EditPage";
import {places} from "./blankData";


test('render EditPlaceForm', () => {
    const buttonName = 'Update place';
    const formTitle = 'Edit place form'
    render(<EditPlaceForm place={places[0]} />)

    expect(screen.getAllByRole('textbox', {value: new RegExp(places[0].name)})).toBeDefined();
    expect(screen.getAllByRole('textbox', {value: places[0].descriptin})).toBeDefined();
    expect(screen.getByRole('button', {name: new RegExp(buttonName)})).toBeDefined();
    expect(screen.getByRole('heading', {name: new RegExp(formTitle)})).toBeDefined();
})