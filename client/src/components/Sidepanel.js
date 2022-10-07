export const Sidepanel = ({ handleOpen, handleClose, isOpen, children }) => {
  return <>
    <div className={`sidepanel ${isOpen && 'open'}`}>
      <button className="close-btn" onClick={handleClose}><i class="material-icons">close</i></button>
      <div className="wrapper">
        { children }
      </div>
    </div>
    <div className={`overlay ${isOpen && 'active'}`} onClick={handleClose}></div>
  </>
}