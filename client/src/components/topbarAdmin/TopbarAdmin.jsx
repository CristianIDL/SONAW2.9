import "./topbarAdmin.css"
import { Search } from "@mui/icons-material"
import {Link} from "react-router-dom"

export default function TopbarAdmin() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <Link to="/homeAdmin" style={{textDecoration:"none"}}>
        <span className="logo">SONA</span><span className="logoAdmin">Admin</span>
      </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon"/>
          <input placeholder="Buscar" className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
      </div>
    </div>
  )
}
