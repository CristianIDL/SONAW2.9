import "./feed.css"
import Post from "../post/Post"
import axios from "axios"
import { useEffect, useState } from "react";
import { IP } from "../../IP";
export default function Feed() {
  const [post, setPosts]=useState([]) 

  useEffect(()=>{
    const fetchPost = async ()=>{
      try {
        const res=await axios.get(`http://${IP}:9000/api/posts/all/posts`)
        setPosts(res.data);
      } catch (error) {
          console.log(error);
      }
    };
    fetchPost();
  }, []) 
  post.sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt))
  return (
    <div className="feed">
        <div className="feedWrapper">
          {post.map((p,key)=>(
            <Post key={key} post={p} />
          ))}
        </div>
    </div>
  )
}


