import "./saved.css"
import SavedP from "../../components/savedp/Savedp";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Autenticado from "../../components/Autenticado/Auntenticado";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"
import { IP } from "../../IP";
import Post from "../../components/post/Post";

export default function Saved() {
  const [userId,setUserId]=useState("")
  const [saves,setSaves]=useState([])
  const [guardado, setGuardado]=useState()
  
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
    try {
            const res=await axios.get(`http://${IP}:9000/api/posts/savedpost/${userId}`)
            setSaves(res.data)
            setGuardado(true)
          } catch (error) {
            console.log("ERROR EN SavedPost");
            console.log(error);
          }
  }
  getUser()
},[userId])
console.log(saves);

return (
  <>
    <Autenticado>
    <Topbar />
      <div className="savedContainer">      
        <Sidebar />
        <div className="saved">
        <div className="savedWrapper">
        {saves.map((p,key) => (
          <Post key={key} post={p} saved={guardado} />
        ))} 
        </div>
        </div>
      </div>
    </Autenticado>
    </>
  )
}
