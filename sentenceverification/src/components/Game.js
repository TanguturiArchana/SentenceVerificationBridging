import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
import file from './questions.json';
import Header from './Header';
 import PopUpCard1 from './PopUpCard1';
import Option from './Option';
// import Congratulations from './congratulationsGif.gif'
import image from '../images/images.gif'
import Performance from './Performance';


export default function Game() {
    const sections = Object.keys(file.images); // Get section keys dynamically
    const [sectionIndex, setSectionIndex] = useState(0); // Track the current section index
    const [currentData,setCurrentData]=useState(file.images[sections[0]][0]);//to render data 
    const [index,setIndex]=useState(0);//to set cuurent index
    const [msg,setMsg]=useState("");//to set msg
    const [total,setTotal]=useState("");//to set total number of questions
    const[totalQIS,setTotalQIS]=useState(file.images[sections[0]].length);//to set total number of question in section
    const[current,setCurrent]=useState("");//to set the completed number of questions
    const [img,setImg]=useState(false);//to set audio image
    const[AudioOption,setAudioOption]=useState(null);//to handle the audio img
    const [showPopup, setShowPopup] = useState(false);//to manage displaying popup
    const [popupMessage, setPopupMessage] = useState("");//to set the popupmessage 
    const [selectedOption,setSelectedOption]=useState("");//to store the selected option
    const [color, setColor] = useState("red");//to set the msg color
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);// to store the index of the selected option
    const [BgColor,setBgColor]=useState("");
    const [showGif,setShowGif]=useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);//to control the checkboxes and next button while audio is playing
    
    const [attempts, setAttempts] = useState(
        sections.reduce((acc, section) => {
            acc[section] = Array(file.images[section].length).fill(1);
            return acc;
        }, {})
    );
    const [time, setTime] = useState(
        sections.reduce((acc, section) => {
            acc[section] = Array(file.images[section].length).fill(0);
            return acc;
        }, {})
    );
    const [startTime, setStartTime] = useState(Date.now());
    const [nextBut,setNextbut]=useState(true);




    useEffect(() => {
        setStartTime(Date.now());
    },[currentData]);
    const HandleNext = () => {
        if (!currentData) return; // If currentData is null,  to return early
        const sectionKey = sections[sectionIndex];
        if (selectedOption === currentData.correctanswer) {
            const endTime = Date.now();
            const timeTaken = Math.floor((endTime - startTime) / 1000); // Time taken in seconds
            const newTime = { ...time };
            newTime[sectionKey][index] += timeTaken;
            setTime(newTime);
            // to check if the current question is the last one in the current section
            if (index === file.images[sectionKey].length - 1) {
                //to check if it's the last section
                if (sectionIndex === sections.length - 1) {
                    setCurrent("");
                    setTotal("");
                    setNextbut(false);
                   
                    setPopupMessage(`CONGRATULATIONS! YOU HAVE COMPLETED SECTION-${sectionIndex + 1}`);
                    setShowPopup(true);
                    setColor("green");
                    setShowGif(true);
                    setMsg("CONGRATULATIONS! YOU HAVE COMPLETED ALL SECTIONS");
                    // setNextButton("FINISH");
                    setCurrentData(null);
                    
                } else {
                    // to move to the next section
                    const nextSectionIndex = sectionIndex + 1;
                    setSectionIndex(nextSectionIndex);
                    setCurrentData(file.images[sections[nextSectionIndex]][0]);
                    setIndex(0);
                    setPopupMessage(`CONGRATULATIONS! YOU HAVE COMPLETED SECTION-${sectionIndex + 1}`);
                    setShowPopup(true);
                    setTotalQIS(file.images[sections[nextSectionIndex]].length)
                   
                   
                }
            } else {
                const newIndex = index + 1;
                setIndex(newIndex);
                setCurrentData(file.images[sectionKey][newIndex]);
                
            }
        } else if (selectedOption === "") {
           
            setMsg("Please select an option to move to the next question");
        }
        else {
            
            const newAttempts = { ...attempts };
            newAttempts[sectionKey][index]++;
            setAttempts(newAttempts);
            setBgColor("red");
            setMsg("Wrong answer! Please choose the correct option that is related to the above picture");

        }
        
        setBgColor("");
        setSelectedOption(""); 
        setSelectedOptionIndex(null);
    };
    useEffect(()=>{
         setTotal(`Total number of questions: ${totalQIS}`)
        setCurrent(`Number of questions completed: ${index}`)
    },[index,totalQIS])

    
      const handleCheckboxChange=(option,key)=>{
        setMsg("");
        setSelectedOption(option);
        setSelectedOptionIndex(key);

      }
    const playAudio=(option)=>{
        const utterance = new SpeechSynthesisUtterance(option);
        utterance.onstart = () =>{ 
            setIsSpeaking(true)
            setImg(true)
            setAudioOption(option)
        };
        utterance.onend = () =>{ 
            setIsSpeaking(false)
            setImg(false);
            setAudioOption(null)
        };
        window.speechSynthesis.speak(utterance);
    }
//to play audio if user chooses wrong option or presses next button without choosing anyoption
    useEffect(() => {
        if (msg.includes('CONGRATULATIONS') || msg.includes('Wrong answer') || msg.includes('Please select')) {
            // Text-to-Speech
            const utterance = new SpeechSynthesisUtterance(msg);
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
        }
    }, [msg]);
   
    const handlePopupClose=()=>{
        setPopupMessage("");
        setShowPopup(false);
       
    }
    
    
  return (
    <div  >
    {nextBut && <Header total={total} current={current} section={sectionIndex}/>}
    {showPopup && <PopUpCard1 message={popupMessage} attempts={file.images[sections[sectionIndex]]} a={attempts[sections[sectionIndex]]} close={handlePopupClose}/>}
    <div style={{ textAlign: "center", backgroundColor: "#CBC3E3",border: '4px solid #660066', padding: "0.2%",margin:"3%", borderRadius: "2%",height:"25%",width:"94%" , backgroundImage:showGif  ?`url(${image})`:`none`}}>
    {
        currentData && (
            <div style={{ textAlign: "center" }}>
                <div style={{textAlign: "center",height: "25%", width: "50%", marginLeft: "24%",marginTop:"1%"}}>
                    <img src={currentData.url} style={{height:"30%",width:"50%",padding:"1%"}} alt={currentData.caption}/>
                    <p style={{fontWeight:"bold"}}>CHOOSE THE PASSAGE THAT MATCHES THE ABOVE PICTURE</p>
                </div>
            
        <Option  currentData={currentData} handleCheckboxChange={handleCheckboxChange} BgColor={BgColor} img={img} AudioOption={AudioOption} playAudio={playAudio} isSpeaking={isSpeaking} selectedOptionIndex={selectedOptionIndex}  />
            </div>
    
        )
        
    }
    {msg && <div >
    <p style={{color:color,fontWeight:"bold",marginTop:"1%" }}>{msg}</p>
    {/* {showGif && <img style={{height:"40vh",width:"40vw",marginBottom:"4%",marginTop:"3%"}} src={Congratulations} alt='gif'/>} */}
    {showGif && <Performance sections={sections} file={file.images} attempts={attempts} time={time}/>}
    </div>}
   {nextBut &&  <button onClick={HandleNext} style={{ margin: '0 auto',marginBottom:"1%", display: 'block' ,backgroundColor: '#660066',color: '#fff',border: 'none',padding: '10px 20px',borderRadius: 5,cursor: 'pointer',fontSize: 16,fontWeight: 'bold',marginTop: 20,}}>NEXT</button>}
    </div>
    </div>
  )
}

