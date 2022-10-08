import { useState, useEffect, useContext, useCallback } from "react"
import { Sidepanel } from "../components/Sidepanel"
import { UserForm } from "../components/UserForm"
import { Loader } from "../components/Loader"
import { useSidepanel } from "../hooks/sidepanel.hook"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"

export const UsersPage = () => {
  const { token } = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState()
  const {loading, request, error, clearError} = useHttp();
  const message = useMessage()

  const sidepanelProps = useSidepanel({
    onClose: () => setUser(null)
  })

  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request('/api/users', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setUsers(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  if (loading) {
    return <Loader />
  }

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
          { users.map((user) => (
            <tr>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td><i className="material-icons">{user.active ? "check_box" : "check_box_outline_blank"}</i></td>
              <td>
                <span className="new badge blue" data-badge-caption={user.role} />
              </td>
              <td>
                <button className="btn-small blue darken-1" style={buttonsStyle}>
                  <i className="material-icons">{user.active ? "pause" : "play_arrow"}</i>
                </button>
                <button className="btn-small blue darken-1" style={buttonsStyle} onClick={() => {
                  setUser(user)
                  sidepanelProps.handleOpen()
                }}>
                  <i className="material-icons">edit</i>
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
    <Sidepanel {...sidepanelProps}>
      <UserForm
        user={user}
        onSuccess={() => {
          fetchUsers();
          sidepanelProps.handleClose()
        }}/>
    </Sidepanel>
  </>
}