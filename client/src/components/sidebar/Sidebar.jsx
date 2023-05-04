import "./sidebar.css"
import { Home,Forum,Person,NotificationsActive,BookmarkBorderOutlined,AccountCircle } from "@mui/icons-material"
import {Link} from "react-router-dom"
import Logout from "../logout/Logout"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
            <li className="sidebarListItem">
                <Home className="sidebarIcon" />
                <Link  to="/home" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Inicio</span>
                </Link>  
            </li>
            <li className="sidebarListItem">
                <Forum  className="sidebarIcon" />
                <Link  to="/chat" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Chats</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <Forum  className="sidebarIcon" />
                <Link to="/bob" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">BOB</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                <Link to="/followed" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Seguidos</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <NotificationsActive className="sidebarIcon" />
                <Link to="/notifications" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Notificaciones</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <BookmarkBorderOutlined className="sidebarIcon" />
                <Link to="/saved" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Guardados</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <AccountCircle className="sidebarIcon" />
                <Link to="/profile/:user" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Cuenta</span>
                </Link>
            </li>
        </ul>
        <Logout />
      </div>
    </div>
  )
}
