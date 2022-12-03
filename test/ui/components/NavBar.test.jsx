import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth"
import { Navbar } from "../../../src/ui"

const mockUseNavigate = jest.fn();

// mock de una libreria
jest.mock('react-router-dom', () => ({
    // esparce todo lo que viene el libreria y solo sobreescribimos el useNavigate
    ...jest.requireActual('react-router-dom'),
    // se ejecutara el mock cuando el componente llame el useNavigate
    useNavigate: () => mockUseNavigate 
}))

describe('Pruebas en <NavBar/>', () => {
    test('debe de mostrar el nombre del usuario', () => {
        const contextValue = {
            logged: true,
            user: { id: 'abc', name: 'Guille' }
        }
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('Guille')).toBeTruthy();

    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {
        const contextValue = {
            logged: true,
            user: { id: 'abc', name: 'Guille' },
            logout: jest.fn()
        }
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const btnLogout = screen.getByText('Logout');
        fireEvent.click(btnLogout);
        // screen.debug();
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
    })
})