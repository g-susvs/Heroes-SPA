import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/heroes/routes/PublicRoute"

describe('Pruebas <PublicRoute />', () => {

    test('debe de mostrar el children si no está autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText("Ruta publica")).toBeTruthy();
    })

    test('de de navegar si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: { id: 'ABC', name: 'Jesús Valencia' }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>   {/*  indicar ruta en la que se encuentra */}
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>
                        } />
                        <Route path="marvel" element={
                            <h1>Autenticado</h1>
                        } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();
        expect(screen.getByText('Autenticado')).toBeTruthy();
    })

})