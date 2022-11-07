import { screen, render } from "@testing-library/react";
import PlacesList from "../components/PlacesList/PlacesList";
import {MemoryRouter} from "react-router-dom";
import {places} from "./blankData";


const mockDelete = jest.fn();

test('render PlaceList', () => {
    

    const regPlaceName = new RegExp(places[0].name);
    const regPlaceLocation = new RegExp(places[1].location);

    render(<MemoryRouter><PlacesList places={places} deleteItem={mockDelete} /></MemoryRouter>);

    expect(screen.getByText(regPlaceName)).toBeDefined();
    expect(screen.getByText(regPlaceLocation)).toBeDefined();
});


test('render PlaceList. Empty list', () => {
    render(<MemoryRouter><PlacesList places={[]} deleteItem={mockDelete} /></MemoryRouter>);
    expect(screen.getByText(/List is empty/i)).toBeDefined();
})