import "./chat.css";
import axios from "axios";
import { IP } from "../../IP";
import jwt_decode from "jwt-decode";
import { Send } from "@mui/icons-material";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userId]);

  useEffect(() => {
    const getConversations = async () => {
      const token = window.localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      setUserId(decodedToken.id);
      try {
        const res = await axios.get(`http://${IP}:9000/api/conversations/${decodedToken.id}`);
        setConversations(res.data);
      } catch (error) {
        console.log("ERROR: " + error);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    if (currentChat !== null) {
      const getMessages = async () => {
        try {
          const res = await axios.get(`http://${IP}:9000/api/messages/${currentChat._id}`);
          setMessages(res.data);
        } catch (err) {
          console.log("ERROR: " + err);
        }
      };
      getMessages();
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post(`http://${IP}:9000/api/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log("ERROR: " + err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="chat">
        <div className="chatSidebar">
          <div className="chatSidebarWrapper">
            <Sidebar />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <Message key={m._id} message={m} own={m.sender === userId} />
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                    className="chatMessageInput" 
                    placeholder="Escribe tu mensaje"
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value={newMessage}
                  >
                  </textarea>
                  <button className="chatSubmit" onClick={handleSubmit}>
                    <Send sx={{ color: "white" }}/>
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Abre una conversación para empezar <br /> a chatear
              </span>
            )}
          </div>
        </div>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Buscar un chat con..." className="chatMenuInput" />
            {conversations.map(c=>(
              <div key={c._id} onClick={()=>setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userId} />
              </div>
            ))}         
          </div>
        </div>
      </div>
    </>
  )
}
