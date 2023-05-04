import { useEffect, useState } from "react"
import "./conversation.css"
import axios from "axios"

export default function Conversation(props) {
  const [user, setUser]=useState(null)
  const PF=process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=>{
    const friendId= props.conversation.members.find((m)=>m !== props.currentUser)
    const getUser = async() =>{
      try{
        const res= await axios("/users?userId=" + friendId)
        setUser(res.data)
      }catch(err){
        console.log(err);
      }     
    }
    getUser()
  }, [props])

  return (
    <div className="conversation">
      {user && <img className="conersationImg" src={PF+user.profilePicture} alt="" />}
      {user && <span className="conversationName">{user.username}</span>}
    </div>
  )
}
