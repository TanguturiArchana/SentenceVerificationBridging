
// import React from 'react';

// const Option = ({ optionData, selectedOption, handleCheckboxChange, speak }) => {
//   return (
//     <div style={{ padding: "1%" }}>
//       <button disabled={optionData.audioPlaying} onClick={() => speak(optionData.option)}>
//         <img src={optionData.audioIcon} alt="Play Audio" style={{ width: "20px", height: "20px" }} />
//       </button>
//       <input
//         type="checkbox"
//         id={optionData.id}
//         name={optionData.id}
//         checked={selectedOption === optionData.option}
//         onChange={() => handleCheckboxChange(optionData.option)}
//         style={{ transform: "scale(1.5)" }}
//       />
//       <label htmlFor={optionData.id}>{optionData.option}</label>
//     </div>
//   );
// }

// export default Option;
import React from 'react'
import playIcon from './playIcon.png';
import playIconClicked from './playIconClicked.jpg';

export default function Option(props) {
  return (
    <div style={{ textAlign: "left", margin: "2%"}}>
    {
        props.currentData.options.map((option,key)=> (
            <div style={{
                padding: "1%",
                // backgroundColor: getOptionBgColor(key),
                backgroundColor: props.BgColor,
                border: '4px solid #660066',
                borderRadius:"2%",
                margin: "2%",
          }} key={key}>
                <img src={props.AudioOption===option && props.img?playIcon:playIconClicked} onClick={()=>props.playAudio(option)} style={{ cursor: "pointer", marginRight: "10px", height: "3%", width: "3%" }} disabled={props.isSpeaking} alt='audio'/>
                <input type='checkbox' id={`option${props.index + 1}`} name={`option${props.index + 1}`} style={{ transform: "scale(1.5)" }}  disabled={props.isSpeaking} checked={props.selectedOptionIndex === key} onChange={() => props.handleCheckboxChange(option,key)} />
                <label htmlFor={`option${props.index + 1}`} style={{ marginLeft: "5px",color:"black", }}  disabled={props.isSpeaking}>{option}</label>
            </div>
        ))
    }
</div> 
  )
}
// {/* <div style={{ textAlign: "left", margin: "2%"}}>
//             {
//                 currentData.options.map((option,key)=> (
//                     <div style={{
//                         padding: "1%",
//                         // backgroundColor: getOptionBgColor(key),
//                         backgroundColor: BgColor,
//                         border: '4px solid #660066',
//                         borderRadius:"2%",
//                         margin: "2%",
//                   }} key={key}>
//                         <img src={AudioOption===option && img?playIcon:playIconClicked} onClick={()=>playAudio(option)} style={{ cursor: "pointer", marginRight: "10px", height: "3%", width: "3%" }} disabled={isSpeaking} alt='audio'/>
//                         <input type='checkbox' id={`option${index + 1}`} name={`option${index + 1}`} style={{ transform: "scale(1.5)" }}  disabled={isSpeaking} checked={selectedOptionIndex === key} onChange={() => handleCheckboxChange(option,key)} />
//                         <label htmlFor={`option${index + 1}`} style={{ marginLeft: "5px",color:"black", }}  disabled={isSpeaking}>{option}</label>
//                     </div>
//                 ))
//             }
//     </div>  */}


// const getOptionBgColor = (key) => {
//   if (key === selectedOptionIndex && msg === "Wrong answer! please choose correct answer that is related to the above picture") {
//       return "red";
//   }
//   return "white";
// };

