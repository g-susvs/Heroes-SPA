import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth"
import { AppRouter } from "../../src/router/AppRoutes"

describe('Pruebas en <AppRoute/>', () => {

    test('debe de mostrar el componente de login', () => {

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        expect(screen.getByText('Login')).toBeTruthy();
    })

    test('debe de mostrar el componente de Marvel si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: { id: 'abc', name: 'Jesus' }
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        )

        // screen.debug();
        expect(screen.getAllByText('Marvel Comics')).toBeTruthy();
        expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText('Jesus')).toBeTruthy();
        // expect(screen.getAllByText('Marvel Comics')).toHaveLength(10);

    })

})