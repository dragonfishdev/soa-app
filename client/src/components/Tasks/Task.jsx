import './style.css'

export const Task = ({ id, title, description }) => {
  return (
    <div className="task-card">
      <div className="task-card__content">
        <div className="task-card__title">
          <h2>{title}</h2>
          <div className="task-card__drag-icon"></div>
        </div>
        <div className="task-card__body">
          {description}
        </div>
      </div>
      <div className="task-card__footer">
        <span className="task-card__date-span">07.10.2022 09:16</span>
        <button className="task-card__comments-button">Комментарии</button>
      </div>
    </div>
  );
}