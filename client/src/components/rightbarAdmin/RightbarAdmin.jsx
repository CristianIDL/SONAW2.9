import "./rightbarAdmin.css";
import EditAdmin from "../editAdmin/EditAdmin"
import jwt_decode from "jwt-decode"
import axios from "axios";
import { IP } from "../../IP";
import { useState, useEffect } from "react";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
            uwu
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {

    const [userId,setUserId]=useState("")
  const [user,setUser]=useState("")
  console.log(user);
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

    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    
    return (
      <>
        <h4 className="rightbarTitle">Información de Usuario <EditAdmin /></h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Encargado:</span>
            <span className="rightbarInfoValue">{user.encargado}</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}