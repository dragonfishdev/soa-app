import { useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const UserForm = ({ user, onSuccess = () => {} }) => {
  const {loading, request, error, clearError} = useHttp();
  const message = useMessage()
  const [form, setForm] = useState({
    userName: "", email: ""
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    setForm({ userName: user?.userName || "", email: user?.email || "" })
  }, [user])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
      onSuccess();
    } catch (e) {}
  }

  const updateHandler = async () => {
    try {
      const data = await request(`/api/users/${user.id}`, 'POST', {...form})
      message(data.message)
      onSuccess();
    } catch (e) {}
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
            id="userName"
            type="text"
            name="userName"
            className="yellow-input white-text"
            value={form.userName}
            onChange={changeHandler}
          />
          <label htmlFor="userName">Имя пользователя</label>
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
        {!user ? <button 
          className="btn yellow darken-4" 
          style={{marginRight: 10}}
          onClick={registerHandler}
          disabled={loading}
        >Зарегистрировать</button>
        :
        <button 
          className="btn yellow darken-4" 
          style={{marginRight: 10}}
          onClick={updateHandler}
          disabled={loading}
          >Изменить
        </button> }
      </div>
    </div>
  </>
}