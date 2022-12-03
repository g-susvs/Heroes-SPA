import React from 'react'
import { AuthProvider } from './auth'
import { AppRouter } from './router/AppRoutes'
export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
