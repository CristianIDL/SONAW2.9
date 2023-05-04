import "./message.css"
import {format} from "timeago.js"

export default function Message({ message,own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img 
            className="messageImg"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
            alt="" 
        />
        <p className="messageText">
          {message.text}
          </p>
      </div>
      <div className="messageBottom">
      {format(message.createdAt)}
      </div>
    </div>
  )
}
