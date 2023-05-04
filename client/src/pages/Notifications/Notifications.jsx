import "./notifications.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Autenticado from "../../components/Autenticado/Auntenticado"

export default function Notifications() {
  return (
    <>
    <Autenticado>
      <Topbar />
      <div className="notificationsContainer">      
        <Sidebar />
        <div className="notifications">
            Notificaciones
        </div>
      </div>
    </Autenticado>
    </>
  )
}
