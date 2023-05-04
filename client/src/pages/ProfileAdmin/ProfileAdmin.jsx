import "./profileAdmin.css";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import Feed from "../../components/feed/Feed";
import RightbarAdmin from "../../components/rightbarAdmin/RightbarAdmin";
import Autenticado from "../../components/Autenticado/Auntenticado";
import {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import ModalImg from "../../components/modalImg/ModalImg";
import { IP } from "../../IP";
import { useNavigate } from "react-router-dom";


export default function ProfileAdmin() {
  

  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const [userId,setUserId]=useState("")
  const [user,setUser]=useState("")
  console.log(user);
  useEffect(()=>{
    const getUser=async ()=>{
      try {
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
            const res=await axios.get(`http://${IP}:9000/api/users?userId=${userId}`)
            setUser(res.data);
          } catch (error) {
            console.log("ERROR EN PERFIL ADMIN");
            console.log(error);
          }
  }
  getUser()
},[userId])

  
  return (
    <>
    <Autenticado>
    <TopbarAdmin />
      <div className="profileAdm">
        <SidebarAdmin />
        <div className="profileAdmRight">
          <div className="profileAdmRightTop">
            <div className="profileAdmCover">
              <img
                className="profileAdmCoverImg"
                src={PF+user.coverPicture}
                alt=""
              />
              <span >
              <button >
              <img
                className="profileAdmUserImg"
                src={PF+user.profilePicture}
                alt=""
                />
                <ModalImg className="profileAdmUserImgModal" />
                </button>
              </span>
            </div>
            <div className="profileAdmInfo">
                <h4 className="profileAdmInfoName">{user.username}</h4>
                <span className="profileAdmInfoDesc">{user.desc}</span>
                <span className="profileAdmInfoDesc">{user.email}</span>
            </div>
          </div>
          <div className="profileAdmRightBottom">
            <Feed />
            <RightbarAdmin profile/>
          </div>
        </div>
      </div>
    </Autenticado>
    </>
  );
}
