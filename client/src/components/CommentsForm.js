import { useEffect, useState, useCallback } from "react"
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const CommentsForm = ({ onSuccess = () => {} }) => {
  const {loading, request, error, clearError} = useHttp();
  const message = useMessage()
  const [form, setForm] = useState({
    title: "", description: ""
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = useCallback((event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }, [form])

  const createHandler = async () => {
    try {
      const data = await request('/api/tasks', 'POST', { ...form })
      console.log(data)
      // message(data.message)
      onSuccess(data);
    } catch (e) {}
  }

  return <>
    <h4>Новая задача</h4>
    <div className="card blue darken-1">
      <div className="card-content white-text">

        <div className="input-field">
          <input 
            placeholder="Введите название"
            id="title"
            type="text"
            name="title"
            className="yellow-input white-text"
            value={form.title}
            onChange={changeHandler}
          />
          <label htmlFor="title">Название задачи</label>
        </div>

        <div className="input-field">
          <textarea 
            placeholder="Введите описание"
            id="description"
            type="text"
            name="description"
            
            className="white-text materialize-textarea"
            value={form.description}
            onChange={changeHandler}
          />
          <label htmlFor="description">Описание задачи</label>
        </div>
      </div>
      <div className="card-action">
        <button 
          className="btn yellow darken-4" 
          style={{marginRight: 10}}
          onClick={createHandler}
          disabled={loading}
        >Создать</button>
      </div>
    </div>
  </>
}