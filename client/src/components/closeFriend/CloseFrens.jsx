import "./closeFriend.css";
import {useEffect, useState} from "react"
import { IP } from "../../IP";
import axios from "axios";
export default function CloseFrens({userid}) {
const [user,setUser]=useState([])

  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  useEffect(()=>{
    const getUser=async ()=>{
    
    try {
            const res=await axios.get(`http://${IP}:9000/api/users?userId=${userid}`)
            setUser(res.data);
          } catch (error) {
            console.log("ERROR EN PERFIL ADMIN");
            console.log(error);
          }
  }
  getUser()
},[userid])
  
  return (
    <div className="closeFriendContainer">
      <div className="closeFriendsLeft">
        <li className="closeFriend">
          <img className="closeFriendImg" src={PF+user.profilePicture} alt="" />
          <span className="closeFriendName">{user.username} </span>
          
        </li>
      </div>
      <div className="closeFriendsRight">
        <button className="followButton">Seguido</button>
      </div>
    </div>
  );
}