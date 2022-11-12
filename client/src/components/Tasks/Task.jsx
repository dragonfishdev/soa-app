import './style.css'

export const Task = ({ id, title, description, onDragStart, }) => {
  return (
    <div className="task-card"
      onDragStart={onDragStart}
      draggable>
      <div className="task-card__content">
        <div className="task-card__title">
          <h2>{title}</h2>
          <i className="task-card__drag-icon material-icons">drag_handle</i>
        </div>
        <div className="task-card__body">
          {description}
        </div>
      </div>
      <div className="task-card__footer">
        <span className="task-card__date-span">07.10.2022 09:16</span>
        <button
          className="task-card__comments-button"
          onClick={() => { window.M.toast({ html: 'Комментарии находятся в разработке' }) }}
          >Комментарии
        </button>
      </div>
    </div>
  );
}