export const Header = () => {
    return (
      <nav>
        <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
          <span className="brand-logo">MyTasks</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/">Задачи</a></li>
            <li><a href="/">Пользователи</a></li>
            <li><a href="/">Архив</a></li>
          </ul>
        </div>
      </nav>
    )
}