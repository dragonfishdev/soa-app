import { NavLink } from "react-router-dom"

export const Header = () => {
    return (
      <nav>
        <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
          <span className="brand-logo">MyTasks</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/">Задачи</NavLink></li>
            <li><NavLink to="/users">Пользователи</NavLink></li>
            <li><NavLink to="/archive">Архив</NavLink></li>
          </ul>
        </div>
      </nav>
    )
}