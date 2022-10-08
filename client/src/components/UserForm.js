import { useEffect, useState } from "react"

export const UserForm = ({ user }) => {
  const [form, setForm] = useState({
    username: "", email: ""
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    setForm({ username: user?.username || "", email: user?.email || "" })
  }, [user])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return <>
    <div
      style={{ fontSize: '19pt', textAlign: "center" }}
    >{user ? "Изменить" : "Новый пользователь"}</div>
    <div className="card blue darken-1">
      <div className="card-content white-text">

        <div className="input-field">
          <input 
            placeholder="Введите имя пользователя"
            id="username"
            type="text"
            name="username"
            className="yellow-input white-text"
            value={form.username}
            onChange={changeHandler}
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
            value={form.email}
            onChange={changeHandler}
          />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="card-action">
        <button 
          className="btn yellow darken-4" 
          style={{marginRight: 10}}
          >
            {!user ? "Регистрация" : "Изменить"}
        </button>
      </div>
    </div>
  </>
}