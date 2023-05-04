import "./forgotPassword.css";
import {Link} from "react-router-dom"
import { IP } from "../../IP";
import axios from "axios";
import { useState } from "react";
import emailjs from "@emailjs/browser"
import template from "../../templates/template";

export default function ForgotPassword() {
const [statusM, setStatusM]=useState("En el caso de haber olvidado tu contraseña ingresa tu usuario y te enivaremos un correo de recuperación");
const [user,setUser]=useState("")

const enviarEmail=(templateParams)=>{
  emailjs.send('service_qh9tq7f', 'template_owq4rfq', templateParams,"qm2j3dUCQPz5iPYT4")
    .then((response) => {
      console.log('Email enviado con exito!', response.status, response.text);
    },(error) => {
      console.log('Email no enviado...', error);
    });
}
const findUser=()=>{
  axios.get(`http://${IP}:9000/api/users?username=${user}`)
  .then((response)=>{
    const { email } = response.data;
    const emailTemplate = template(email);
    enviarEmail(emailTemplate);
    setStatusM("Email enviado al correo registrado");
    setUser("")
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
    setStatusM("No se encontro el usuario");
    console.log(user);
  });
}


  return (
    <div className="fpass">
      <div className="fpassWrapper">
        <div className="fpassLeft">
           
        <img src = {`http://${IP}:9000/assets/login.png`} className="loginImg" alt="" />
        </div>
        <div className="fpassRight">
          <div className="fpassBox">
            <p className="fpassBienvenida">Recuperar contraseña</p>
            <p className="fpassTexto">{statusM} </p>
            <p className="fpassTexto">Ingresa tu nombre usuario</p>   
            <input placeholder="Usuario" className="fpassInput" 
              onChange={(e) => setUser(e.target.value)} />
            <p className="fpassForgot"> </p>
            <button className="fpassButton" onClick={findUser}>Recuperar</button>
            <Link to="/" className="fpassLogin" style={{textDecoration:"none",color:"white"}}>
              Inicia sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

