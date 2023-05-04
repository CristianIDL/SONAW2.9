import { useNavigate } from "react-router-dom";

export default function Autenticado({children}){
    
  const navigate = useNavigate ();
    const token = window.localStorage.getItem("token");

  if (!token) {
    navigate("/");
    console.log("NO TOKEN")
  }

  return children;

}