import './editAdmin.css'
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Create } from "@mui/icons-material"
import { IP } from '../../IP';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AttachFileOutlined } from '@mui/icons-material';
import { red } from '@mui/material/colors';



export default function ModalImg() {
  const [userId,setUserId]=useState("")
  const [user,setUser]=useState("")
  const [profile,setProfile]=useState()
  const [p2,setP2]=useState()
    console.log(user);
    
  useEffect(()=>{
    const getUser=async ()=>{
      const token= window.localStorage.getItem("token")
      const decodedToken=jwt_decode(token)
      setUserId(decodedToken.id)
      try {
        const res=await axios.get(`http://${IP}:9000/api/users?userId=${userId}`)
        setUser(res.data);
        setProfile(res.data.profilePicture);
        setP2(res.data.coverPicture);
      } catch (error) {
        console.log("ERROR EN Profile USER");
        console.log(error);
      }
    }
    getUser()
  },[userId])

  const [show, setShow] = useState(false);
  console.log("PROFILE:   ");
  console.log(profile);
  console.log("PORTADA:   ");
  console.log(p2);
    
  const handleImageChange = (e) => {
    const inputId = e.target.getAttribute("data-input-id");
    const file = e.target.files[0];
    console.log(inputId)
    if (inputId === "profilePicture") {
      setProfile(file);
    } else if (inputId === "coverPicture") {
      setP2(file);
    }
  };
  const handleClose = async() => {
    if(profile){
      console.log("ESTOY RECIBIENDO PROFILE");
      var name=Date.now() + profile.name
      var data = new FormData();
      data.set('name', name )
      data.set('file', profile)
      console.log(profile);
      console.log(data)
      try {
      axios.post(`http://${IP}:9000/upload`,data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        console.log("EL ARCHIVO SE SUBIO A LA CARPETA SIUUU ");
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios.put(`http://${IP}:9000/api/users/${userId}`, {
        userId:userId,
        profilePicture:name
      });
      console.log(response);
     
    } catch (err) {
      console.log(err);
    }
    }
    if(p2){
      
      console.log("ESTOY RECIBIENDO PORTADA");
      console.log(p2);
      var name2=Date.now() + p2.name
      var data2 = new FormData();
      data2.set('name', name2 )
      data2.set('file', p2)
      console.log(name2)
      try {
      axios.post(`http://${IP}:9000/upload`,data2, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        console.log("EL ARCHIVO SE SUBIO A LA CARPETA SIUUU ");
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.put(`http://${IP}:9000/api/users/${userId}`, {
        userId:userId,
        coverPicture:name2
      });
      console.log(response);
     
    } catch (err) {
      console.log(err);
    }
    }
     setShow(false)
};


    const handleShow = () => setShow(true);

    const handleCok = async() => {
        setShow(false)
      };
  return (
    <>
        <Create onClick={handleShow}/>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header className='modalheader'>
            <Modal.Title className='modaltitle'>Edita tu perfil</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalbody'>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                <AttachFileOutlined sx={{ color: red[500] }} />
                <Form.Label>Imagen de perfil</Form.Label>
                <Form.Control
                data-input-id="profilePicture"
                type="file"
                className='forminputfile'
                onChange={handleImageChange}
                />
                </Form.Group>
            </Form>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputText">
                  <AttachFileOutlined sx={{ color: red[500] }} />
                  <Form.Label>Portada de perfil</Form.Label>
                  <Form.Control
                  data-input-id="coverPicture"
                  type="file"
                  className='forminputfile'
                  onChange={handleImageChange}
                  /></Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer className='modalfooter'>
            <button className='modalbuttonGrey' onClick={handleCok}>
                Cancelar
            </button>
            <button className='modalbuttonRedSmall' onClick={handleClose}>
                Guardar
            </button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

