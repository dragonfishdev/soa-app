import { Route, Routes, Navigate } from "react-router-dom"
import { LoginPage } from './pages/LoginPage'
import { TasksPage } from "./pages/TasksPage"
import { UsersPage } from "./pages/UsersPage"

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/login" exact element={ <LoginPage /> } />
      <Route path="/" exact element={ <Navigate to="/login" /> } />
      <Route path="/users" exact element={ <UsersPage /> } />
    </Routes>
  )
}