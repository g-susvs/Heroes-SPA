import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/heroes/routes/PrivateRoute"

describe('Pruebas en <PrivateRoute/>', () => {
    test('debe de mostrar el children si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: { id: 'abc', name: 'Jesus' }
        }
        // Establecer la función que sera llamado al crear el componente
        Storage.prototype.setItem = jest.fn();

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');

    })
})