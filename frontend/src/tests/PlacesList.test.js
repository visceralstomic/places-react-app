import { screen, render } from "@testing-library/react";
import PlacesList from "../components/PlacesList/PlacesList";
import {BrowserRouter} from "react-router-dom";
import {places} from "./blankData";


test('render PlaceList', () => {
    const mockDelete = jest.fn();

    const regPlaceName = new RegExp(places[0].name);
    const regPlaceLocation = new RegExp(places[1].location);

    render(<BrowserRouter><PlacesList places={places} deleteItem={mockDelete} /></BrowserRouter>);

    expect(screen.getByText(regPlaceName)).toBeDefined();
    expect(screen.getByText(regPlaceLocation)).toBeDefined();
});


test('render PlaceList. Empty list', () => {
    const mockDelete = jest.fn();
    render(<BrowserRouter><PlacesList places={[]} deleteItem={mockDelete} /></BrowserRouter>);
    expect(screen.getByText(/List is empty/i)).toBeDefined();
})