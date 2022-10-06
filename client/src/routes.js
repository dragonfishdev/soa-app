import { Route, Routes } from "react-router-dom"
import { LoginPage } from './pages/LoginPage'
import { TasksPage } from "./pages/TasksPage"

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/login" exact element={ <LoginPage /> } />
      <Route path="/" exact element={ <TasksPage /> } />
    </Routes>
  )
}