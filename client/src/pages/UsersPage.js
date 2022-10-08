import { useState } from "react"
import { Sidepanel } from "../components/Sidepanel"
import { UserForm } from "../components/UserForm"
import { useSidepanel } from "../hooks/sidepanel.hook"

export const UsersPage = () => {
  const [user, setUser] = useState()
  const sidepanelProps = useSidepanel({
    onClose: () => setUser(null)
  })

  const buttonsStyle = { margin: "2px", padding: "0 8px" }

  return <>
    <div style={{display: 'flex', alignItems: "normal", margin: "24px 0"}}>
      <button className="btn-floating blue darken-1" onClick={sidepanelProps.handleOpen}>
        <i className="material-icons">add</i>
      </button>
      <h3 style={{ padding: 0, margin: "0 0 0 16px" }}>Пользователи системы</h3>
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>Имя пользователя</th>
            <th>Email</th>
            <th>Активная</th>
            <th>Роли</th>
            <th>Действие</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Карим Сабитов</td>
            <td>sabitovka@shkd.bizml.ru</td>
            <td><i className="material-icons">check_box</i></td>
            <td>
              <span className="new badge blue" data-badge-caption="Admin" />
              <span className="new badge blue" data-badge-caption="User" />
            </td>
            <td>
              <button className="btn-small blue darken-1" style={buttonsStyle}>
                <i className="material-icons">pause {/*play_arrow*/}</i>
              </button>
              <button className="btn-small blue darken-1" style={buttonsStyle} onClick={() => {
                setUser({ userName: "karim", email: "karim@foo.bar" })
                sidepanelProps.handleOpen()
              }}>
                <i className="material-icons">edit</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Sidepanel {...sidepanelProps}>
      <UserForm user={user} onSuccess={sidepanelProps.handleClose}/>
    </Sidepanel>
  </>
}