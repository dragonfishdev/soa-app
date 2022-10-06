import { Route, Routes } from "react-router-dom"

import { LoginPage } from './pages/LoginPage'

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/login" exact element={<LoginPage />} />
    </Routes>
  )
}