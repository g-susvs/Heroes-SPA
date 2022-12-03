import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { Hero, MarvelPage } from "../../src/heroes/pages/index";


const id = 'dc-batman';
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}))

describe('Prueba en <HeroPage/>', () => {

    test('debe mostrar lo información de un hero', () => {

        render(
            <MemoryRouter initialEntries={[`/hero/${id}`]}>
                <Routes>
                    <Route path='hero/:id' element={<Hero />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Batman')).toBeTruthy();
    });

    test('debe de navegar a la página de marvel tras detectar el id de un héroe no existente', () => {
        render(
            <MemoryRouter initialEntries={[`/hero/batman123`]}>
                <Routes>
                    <Route path='hero/:id' element={<Hero />} />
                    <Route path="/marvel" element={
                        <MarvelPage />
                    } />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getAllByText('Marvel Comics').length).toBeGreaterThanOrEqual(1);
    });

    test('debe de navegar tras pulsar el botón regresar', () => {

        render(
            <MemoryRouter initialEntries={['/hero/dc-batman']}>
                <Routes>
                    <Route path='hero/:id' element={<Hero />} />
                </Routes>
            </MemoryRouter>
        );

        const returnButton = screen.getByRole('button');
        fireEvent.click(returnButton);

        expect(mockUseNavigate).toHaveBeenCalledWith(-1);
    });

})