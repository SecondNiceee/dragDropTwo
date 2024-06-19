import { useRef, useState } from "react";
import "./App.css";
import Dragging from "./components/Dragging";
import checkIt from './images/checkIt.svg';
import { CSSTransition } from "react-transition-group";
function App() {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);

  function dragStartHandler(e) {
    e.preventDefault();
    setDrag(true);
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    console.log(e.dataTransfer.files[0])
    chechPdf(e.dataTransfer.files[0])
    setDrag(false);
  }

  const refOne = useRef(null)

  function chechPdf(arg){
    if (arg.type.includes('pdf') ){
      setFiles([arg]) 
      refOne.current.files = [arg]
    }
    else{
      setBlock(!block)
      setTimeout ( () => {
        setBlock(false)
      }, 1000  )  
      } 
    }

  const [block , setBlock] = useState(false)

  
  console.log(files)

  console.log(files)
  return (
    <form encType = "multipart/form-data" method="post" className="App" action="https://f.smartcardio.ru/"  >
      <CSSTransition in = {block} classNames={'fade'} timeout={500}>
        <div className="errorBlock">
            <p>Можно только пдф</p>
        </div>
      </CSSTransition>
      <input  ref = {refOne} style={{display : 'none'}} onChange={ e => { 
        if (e.target.files[0]){
          
          chechPdf(e.target.files[0])
        }
      } }
        type="file" id="myInput" name="datafile" size="40"
        />
         
      <div className="MainContainer">
        {files.length ? (
          <p className="Head">Файл загружен</p>
        ) : (
          <p className="Head">Загрузите файл</p>
        )}


        {files.length ? (
          <div className="bottom__container">
            <div className="bottom__container-images">
              <im alt = "" style={{transform : 'unset'}} className="checkImg" src={checkIt} />

            </div>
            <div className="imageContainer"> 
              <p className="imageText">{files[0].name}</p>
            </div>
          </div>
        ) : (
          <Dragging
            drag={drag}
            dragStartHandler={dragStartHandler}
            dragLeaveHandler={dragLeaveHandler}
            onDropHandler={onDropHandler}
          />
        )}

        {files.length ? 
        <input onClick={ (e) => { (console.log(refOne.files)) 
          e.preventDefault()
           }} value='SEND' type="submit" className="SendButton" />
        : ''
        }
      </div>
    </form>
  );
}

export default App;
