import "./home.css"
import Feed from "../../components/feed/Feed";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Autenticado from "../../components/Autenticado/Auntenticado";

export default function Home() {
  const[userToken,setUsertoken]=useState("")
  const navigate = useNavigate ();

  useEffect(()=>{
    const loggedUser=window.localStorage.getItem("token")
    if(loggedUser){
      const tokenUser=loggedUser
      setUsertoken(tokenUser)
    }else{
      
      navigate("/");
    }
  },[])
  
  return (
    <>
    <Autenticado>
    <Topbar />
      <div className="homeContainer">      
        <Sidebar />
        <div className="homefeed">
          <Feed />
        </div>
      </div>
    </Autenticado>

    </>
  )
}
