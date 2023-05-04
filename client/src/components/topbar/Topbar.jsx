import "./topbar.css"
import { Search } from "@mui/icons-material"
import {Link} from "react-router-dom"

export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link  to="/home" style={{textDecoration:"none"}}>
          <span className="logo">SONA</span>
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
