export const Task = () => {
  return (
    <div className="row">
      <div className="col s12 m3">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">*Название задачи</span>
            <p>Описание задачи</p>
          </div>
          <div className="card-action">
            <i className="btn-flat white-text">
              <div className="row valign-wrapper">
                Комментарии
                <i class="material-icons small right">comment</i>
              </div>
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}