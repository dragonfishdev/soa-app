import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const LoginPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage()
  const [form, setForm] = useState({
    username: '', password: ''
  })

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.accessToken, data.refreshToken)
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>MyTasks</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input 
                  placeholder="Введите имя пользователя"
                  id="username"
                  type="text"
                  name="username"
                  className="yellow-input white-text"
                  value={form.email}
                  onChange={changeHandler}
                />
                <label htmlFor="username">Имя пользователя</label>
              </div>

              <div className="input-field">
                <input 
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input white-text"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>

            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4" 
              style={{marginRight: 10}}
              onClick={loginHandler}
              disabled={loading}>
                Войти
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}