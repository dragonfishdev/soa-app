import { Route, Routes, Navigate } from "react-router-dom"
import { LoginPage } from './pages/LoginPage'
import { TasksPage } from "./pages/TasksPage"
import { UsersPage } from "./pages/UsersPage"

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" exact element={ "WIP: tasks" }/>
        <Route path="/users" exact element={ <UsersPage /> } />
        <Route path="/archive" exact element={ "WIP: archive" } />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/login" exact element={ <LoginPage /> } />
      <Route path="*" element={ <Navigate to="/login" /> } />
    </Routes>
  )
}