// import React , {useState} from 'react'
import React, { useState, useRef } from 'react';

export default function TextBox(props) {
    // add arrow functions
    const handleOnChange =(event)=>{
        let newText = event.target.value ;
        setText(newText);
        // setWordCount(countWords(newText));
        setTimeCount(countTime(newText))
    }
    const handleUpperCaseFun =()=>{
        let newText = text.toUpperCase() ;
        setText(newText) ;
        props.alert("Converted to Uppercase","success") ;
    }
    const handleLowerCaseFun =()=>{
        let newText = text.toLowerCase();
        setText(newText) ;
        props.alert("Converted to Lowercase","success") ;
    }
    
    const handleClearText=()=>{
        setText("")
        props.alert("Text Cleared","success") ;
    }
    const handleCopyText=()=>{
        var newText = document.getElementById("textBox")
        newText.select()
        document.getSelection().removeAllRanges()  ;
        navigator.clipboard.writeText(newText.value)
        props.alert("Copied!!","success") ;
    }
    const handleRemoveExtraSpace=()=>{
        let newText = text.split(/[ ]+/)
        setText(newText.join(" "))
        props.alert("All extra space removed","success") ;
    }
    // count Word
    // const countWords =(text)=> {
    //     if (text === null || text.trim() === "") {
    //         return 0 ;
    //     }
    //     return text.split(/\s+/).length ;
    // } 
    //estimate time
    const countTime =(text) =>{
        const timeInMinutes =(text.split(/\s+/).filter((element)=>{return element.length !== 0}).length)* 0.008;
        // Format the time to a human-readable string
        const minutes = Math.floor(timeInMinutes);
        const seconds = Math.floor((timeInMinutes - minutes) * 60);

        let result = "";
        if (minutes > 0) {
            result += `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
        if (seconds > 0) {
            if (result.length > 0) {
                result += " and ";
            }
            result += `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
        return result ;
    }  
    //speak
    const handleSpeak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text; // Assuming 'text' is defined elsewhere
        if (isSpeaking ) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
        } else {          
          window.speechSynthesis.speak(msg);
          setIsSpeaking(true);
        }
    
        utteranceRef.current = msg;
        msg.onend = () => {
          setIsSpeaking(false);
        };
    };
    //find and replace
    const handleFindChange = (event) => {
        setFind(event.target.value);
    };
    
    const handleReplaceChange = (event) => {
        setReplaceWith(event.target.value);
    };
    
    const handleReplaceAll = () => {
        const replacedText = text.replaceAll(find, replaceWith);
        setText(replacedText);
        props.alert("Replaced !!","success") ;
    };

    // Declare a new state variable, which we'll call "text"
    const [text, setText] = useState('');
    //const [wordCount, setWordCount] = useState(0);
    const [timeCount, setTimeCount] = useState(0+" second");
    const [isSpeaking, setIsSpeaking] = useState(false);
    const utteranceRef = useRef(null);
    const [find, setFind] = useState('');
    const [replaceWith, setReplaceWith] = useState('');

    return (
        <>
            <div style={ 
                {backgroundColor:props.mode==="light"?"white":"#143548",
                color:props.mode==="light"?"#143548":"white" } }>
                <h1>{props.heading}</h1>
                <div className="mb-3">             
                    <textarea className="form-control" 
                            id="textBox" 
                            rows="7"
                            placeholder="Enter your text here..."
                            value={text} 
                            style={ 
                                {backgroundColor:props.mode==="light"?"white":"rgb(92 195 254)",
                                    color : props.mode==="light"?"black":"white" } }
                            onChange={handleOnChange} >
                    </textarea>                        
                </div>
                <button disabled={text.length === 0 } type="button" onClick={handleUpperCaseFun} 
                    className="btn btn-primary mx-2 my-2">to Uppercase</button>            
                <button disabled={text.length === 0 } type="button" onClick={handleLowerCaseFun} 
                    className="btn btn-primary mx-2 my-2">to Lowercase</button>
                {/* speak Toggle button */}
                <button disabled={text.length === 0 } type="button" className="btn btn-primary mx-2 my-2"
                onClick={handleSpeak}>{isSpeaking ? 'Stop':'Speak'}</button>
                {/* clear text */}
                <button disabled={text.length === 0 } type="button" onClick={handleClearText} 
                    className="btn btn-primary mx-2 my-2">Clear</button> 
                {/* Copy Text */}
                <button disabled={text.length === 0 } type="button" onClick={handleCopyText} 
                    className="btn btn-primary mx-2 my-2">Copy</button>
                {/* Remove Extra Space */}
                <button disabled={text.length === 0 } type="button" onClick={handleRemoveExtraSpace} 
                    className="btn btn-primary mx-2 my-2">Rmv Extra Space</button>
            </div>
            <div className="container my-3" style={ 
                {backgroundColor:props.mode==="light"?"white":"#143548",
                    color : props.mode==="light"?"#143548":"white" } }>

                <h6>Text Contains : {text.split(/\s+/).filter((element)=>{return element.length !== 0}).length } words 
                    and {text.length} characters </h6>
                <h6>Estimate time to read : {timeCount}</h6>
            </div> 
            <div className="input-group mb-3" >
                <input type="text" className ="form-control" placeholder="Find" value={find} 
                    style={{backgroundColor:props.mode==="light"?"white":"rgb(92 195 254)",
                            color : props.mode==="light"?"#143548":"white" } }
                    onChange={handleFindChange} />
                <input type="text" className ="form-control mx-3" placeholder="Replace with" 
                    value={replaceWith} 
                    style={{backgroundColor:props.mode==="light"?"white":"rgb(92 195 254)",
                            color : props.mode==="light"?"#143548":"white" } }
                    onChange={handleReplaceChange} />
                <button disabled={text.length === 0} type= "button" onClick={handleReplaceAll} 
                    className="btn btn-primary mx-3">Replace All</button>
                            
            </div> 
            <div className="container my-3" style={ 
                {backgroundColor:props.mode==="light"?"white":"#143548",
                    color : props.mode==="light"?"#143548":"white" } } >
                <h3>Preview</h3>   
                <p>{text.length===0?"Enter text to view":text} </p>
            </div>               
        </>        
    )
}
