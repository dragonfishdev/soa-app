import { useEffect } from "react"

export const UserForm = ({ user }) => {

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return <>
    <div
      style={{ fontSize: '19pt', textAlign: "center" }}
    >{ user ? `Изменить: ${user.username}` : "Новый пользователь" }</div>
    <div className="card blue darken-1">
      <div className="card-content white-text">

        <div className="input-field">
          <input 
            placeholder="Введите имя пользователя"
            id="username"
            type="text"
            name="username"
            className="yellow-input white-text"
          />
          <label htmlFor="username">Имя пользователя</label>
        </div>

        <div className="input-field">
          <input 
            placeholder="Введите Email"
            id="email"
            type="email"
            name="email"
            className="yellow-input white-text"
          />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="card-action">
        <button 
          className="btn yellow darken-4" 
          style={{marginRight: 10}}
          >
            Регистрация
        </button>
      </div>
    </div>
  </>
}