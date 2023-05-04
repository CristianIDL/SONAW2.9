import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Autenticado from "../../components/Autenticado/Auntenticado";
import {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { IP } from "../../IP";
import ModalImg from "../../components/modalImg/ModalImg";


export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [userId,setUserId]=useState("")
  const [user,setUser]=useState("")
  
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
    try {
            const res=await axios.get(`http://${IP}:9000/api/users?userId=${userId}`)
            setUser(res.data);
          } catch (error) {
            console.log("ERROR EN Profile USER");
            console.log(error);
          }
  }
  getUser()
},[userId])
 
  return (
    <>
    <Autenticado>
    <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={PF+user.coverPicture}
                alt=""
              />
              <span >
              <button >
              <img
                className="profileUserImg"
                src={PF+user.profilePicture}
                alt=""
                />
                <ModalImg className="profileAdmUserImgModal" />
                </button>
              </span>
              
              <ModalImg className="profileAdmUserImgModal" />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
                <span className="profileInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
    </Autenticado>
    </>
  );
}
