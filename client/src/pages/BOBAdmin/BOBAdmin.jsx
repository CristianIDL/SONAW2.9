import "./bobAdmin.css"
import SidebarAdmin from "../../components/sidebarAdmin/SidebarAdmin";
import TopbarAdmin from "../../components/topbarAdmin/TopbarAdmin";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";

function BOBAdmin() {

  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const changeImage = (e) => {
    console.log(e.target.files + 'Se ha seleccionado');
    //alert('Se ha subido un archivo')
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
  };
  

  return (
    <>
      <TopbarAdmin />
      <div className="bobAdminContainer">      
        <SidebarAdmin />
        <div className="bobAdmin">
        <StyleDragArea>
          <div className="image-upload-wrap">
            <div className="text-information">
            <h4>Arrastra o suelta un archivo o sube un archivo</h4>
          </div>
          <input
            className="file-upload-input"
            type="file"
            accept="pdf/*"
            onChange={(e) => {
              changeImage(e);
            }}
          />
          
        </div>

        <div className="center">
        <span id="result"></span>
          <img
            src={ImageSelectedPrevious}
            alt=""
            height="50px"
            width="150px"
            border={0}
            onChange={(e)=>{
              alert(e.target.files);
            }}
          />
          
        </div>
        <div>
          <center><button className="but">Insertar</button></center>
        </div>
        </StyleDragArea>
        </div>
      </div>
    </>
  )

}
export default BOBAdmin;

const StyleDragArea = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-upload-content {
    display: none;
    text-align: center;
  }

  .file-upload-input {
    padding: 10px 25px;
    font-size: 17px;
    border: 0;
    outline: none;
    background-color: transparent;
    height: 700px;
    width: 600px;
    color: white;
    border-radius: 10px;
    cursor:pointer;
    margin: 10px;
  }

  .image-upload-wrap {
    background-color: rgb(58, 57, 55);
    color: rgb(231, 227, 227);
    border: 2px dashed #4B0928;
    display: flex;
    height: 400px;
    width: 700px;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
  }
  .image-upload-wrap:hover {
    background-color: transparent;
    border: 4px dashed #d0d7de;
  }
  .text-information {
    margin-top: 30px;
    text-align: center;
  }
`;