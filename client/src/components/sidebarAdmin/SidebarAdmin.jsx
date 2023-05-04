import "./sidebarAdmin.css"
import { Home,Forum,AccountCircle } from "@mui/icons-material"
import Share from "../share/Share"
import Logout from "../logout/Logout"
import {Link} from "react-router-dom"

export default function SidebarAdmin() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
            <li className="sidebarListItem">
                <Home className="sidebarIcon" />
                <Link  to="/homeadmin" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Inicio</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <Forum  className="sidebarIcon" />
                <Link  to="/chatadmin" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Chats</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <Forum  className="sidebarIcon" />
                <Link  to="/bobadmin" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">BOB</span>
                </Link>
            </li>
            <li className="sidebarListItem">
                <AccountCircle className="sidebarIcon" />
                <Link  to="/profileadmin/:username" style={{textDecoration:"none",color:"white"}}>
                  <span className="sidebarListItemText">Cuenta</span>
                </Link>
            </li>
        </ul>
        <Share />
        <br />
        <br />
        <Logout />
      </div>
    </div>
  )
}
