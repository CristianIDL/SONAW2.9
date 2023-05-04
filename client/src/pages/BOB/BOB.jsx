import "./bob.css"
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Send } from "@mui/icons-material";
import jwt_decode from "jwt-decode";
import MessageBob from "../../components/message/MessageBob";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IP } from "../../IP";



const { Configuration, OpenAIApi }=require("openai");

const config=new Configuration({
    apiKey: "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"
});
const openai=new OpenAIApi(config);
export default function Saved() {
  
  const messagesListRef = React.createRef();
  const [messages, setMessages] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [selectedFile, setSelectedFile]=useState([])
  const [infoPDF,setInfoPDF]=useState("")
  console.log(messages);
  // useEffect(() => {
  //   axios.get(baseURL).then(res => {
  //     setMessages([
  //       res.data,
  //     ])
  //   })
  // }, []);

  const sendMessage = (content) => {
    // add the message to the state
    setMessages([
      ...messages,
      {
        content: content,
        isCustomer: true,
      }
    ]);

    // post the request and add the bot response to the state
    // axios.post(baseURL + "ask", {
    //   content: content
    // }).then(res => {
    //   console.log(res);
    //   setMessages(prevState => [
    //     ...prevState,
    //     res.data,
    //   ]);
    // });
  }

  const extraerInfo=()=>{
    const formData=new FormData();
    for(let i=0; i<selectedFile.length;i++){
      formData.append(`pdfFile`, selectedFile[i])
    }
    console.log(formData);
    if(selectedFile){
        axios.post("http://localhost:9000/extract-text", formData, {
            headers: { 
                "Content-Type": "multipart/form-data"
             }
        }).then(response=>response.data)
    .then(data=>{console.log("Data" +data)
    setInfoPDF(data);
    }).catch((error) => {    
    console.error(error);    
    });  
    }else{
        console.log("input is falsy");
    }
    }
  function selectPdfFiles(userInput) {
    console.log(userInput);
    const keywordsToPdf = [
      { keywords: ['baja'], file: 'http://localhost:9000/pdf/bajas.pdf'},
      { keywords: ['becas'], file: 'http://localhost:9000/pdf/becas.pdf'},
      { keywords: ['boletas'], file: 'http://localhost:9000/pdf/boletas.pdf'},
      { keywords: ['constancias'], file: 'http://localhost:9000/pdf/constancias.pdf'},
      { keywords: ['inscripciones'], file: 'http://localhost:9000/pdf/Inscripciones_y_Reinscripciones.pdf'},
      { keywords: ['reinscripciones'], file: 'http://localhost:9000/pdf/Inscripciones_y_Reinscripciones.pdf'},
      { keywords: ['justificantes'], file: 'http://localhost:9000/pdf/Justificantes.pdf'},
      { keywords: ['credencial'], file: 'http://localhost:9000/pdf/Reposicion_de_Credencial.pdf'},
      { keywords: ['servicio social'], file: 'http://localhost:9000/pdf/Servicio_Social'},
      { keywords: ['cambio de plantel'], file: 'http://localhost:9000/pdf/Solicitud_de_Cambio_de_Plantel.pdf'},
      { keywords: ['dictamen'], file: 'http://localhost:9000/pdf/Solicitud_de_Dictamen.pdf'},
      { keywords: ['titulacion'], file: 'http://localhost:9000/pdf/Titulacion.pdf'},

    ];
  
    const userInputLowerCase = userInput.toLowerCase();
    const selectedFiles = [];
  
    for (const entry of keywordsToPdf) {
      if (entry.keywords.some((keyword) => userInputLowerCase.includes(keyword))) {
        selectedFiles.push(entry.file);
      }
    }
    setSelectedFile(selectedFiles);
    return selectedFiles;
  }
  const handleKeyDown = (event) => {
    console.log(event.key);
    console.log(event.target.value);
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(selectedFile);
      handleSubmit(event);
      extraerInfo()
      sendMessage(mensaje)
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //IA
const runPrompt=async(r)=>{
  const promptI='Soy BOB, un ChatBot creado por los estudiantes de programación. B.O.B significa "Bot Operativo de Batiz" y estoy aqui sólo para informar a las personas en los trámites escolares.'
  const promptPDF= '\nInformación extraída de los archivos PDF: ' + infoPDF
  const prompt= promptI + promptPDF + "\n Por favor, responde de manera apropiada y coherente con la pregunta del usuario: " + " \nUsuario pregunta: "+ mensaje + " IA: "
  const response=await openai.createCompletion({

      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.30,
      max_tokens: 400,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
  });
  console.log(response.data);
  console.log(response.data.choices[0].text);
  var respuesta=response.data.choices[0].text;

  setMessages(prevState => [
    ...prevState,
    {
      content: respuesta
    }
  ]);
  return r;

};

runPrompt().then(r=>{
    console.log("Respuesta es : " + r);
})

    setMensaje("");
  }

  useEffect(() => {
    messagesListRef.current.scrollTop = messagesListRef.current.scrollHeight;
  }, [messagesListRef, messages]);


  async function fetchPdfAsFile(path) {
    const response = await fetch(path);
    const data = await response.blob();
    const filename = path.split('/').pop();
    return new File([data], filename, { type: 'application/pdf' });
  }


  return (
    <>
      <Topbar />
      <div className="bobContainer">      
        <Sidebar />
        
        <div className="bob">
        <div className="chatBox" sx={{maxWidth: 420}}>
          <div className="chatBoxWrapper">

                <div className="chatBoxTop"
                 ref={messagesListRef}
                 >
                  {messages.map((m) => (
                    <MessageBob key={m._id} 
                    content={m.content}
                    image={m.image}
                    isCustomer={m.isCustomer}
                    choices={m.choices}
                    handleChoice={sendMessage} />
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea 
                    className="chatMessageInput" 
                    placeholder="Escribe tu mensaje"
                    variant="outlined"
                    size="small"
                    onKeyDown={handleKeyDown}
                    onChange={async (e)=>{
                      setMensaje(e.target.value)
                      const filesP=selectPdfFiles(e.target.value);
                      console.log(filesP);
                      const files=await Promise.all(filesP.map(fetchPdfAsFile))
                      setSelectedFile(files)
                    }}
                    value={mensaje}
                  >
                  </textarea>
                  <button className="chatSubmit" onClick={handleSubmit}>
                    <Send sx={{ color: "white" }}/>
                  </button>
                </div>
            
            
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
