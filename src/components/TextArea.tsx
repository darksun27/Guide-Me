import { Button, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send"; 
import React, { useState } from "react"
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import userLogo from 'assets/userLogo.png';
import lang from 'data/lang.json';

export const TextArea = (props):JSX.Element => {

  const [text, setText] = useState('')
    
  const handleClick = () => {
    props.addToList([...props.list, <MessageBox
      avatar={userLogo}
      position={'right'}
      text={text}
      key="text"
      />])
      props.translate(props.from, props.to, text);
      setText('');
  }

  const handleChange = (e) => {
    setText(e.target.value);
  }

    return (
        <div style={{maxHeight:"20vh", minWidth:"40vw", maxWidth:"40vw", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
            <TextField
          placeholder={"Please write your text in "+ lang.translation[props.from].nativeName}
          margin="normal"
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          value={text}
          variant="filled"
          style={{width:"70%"}}
        />
        <Button variant="contained" color="primary" size="large" style={{minWidth:"25%", marginRight:"20px"}} startIcon={<SendIcon/>} onClick={handleClick}>
            {lang.translation[props.from].send}
        </Button>
        </div>
    )
}