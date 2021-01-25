import Container from '@material-ui/core/Container';
import { Banner } from 'components/Banner';
import { ChatArea } from 'components/ChatArea';
import { TextArea } from 'components/TextArea';
import { EndInteraction } from 'components/EndInteraction';
import lang from 'data/lang.json';
import React, { useState } from 'react';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import translateLogo from 'assets/translate.png';

import request from 'request';
import {v4 as uuidv4} from 'uuid';

var key_var = '032acdebcaba4b299a465fa6b52c1ee5';
var region_var = 'eastus';

let feedbacks = {};


function App():JSX.Element {
  let [A, setA] = useState('en');
  let [B, setB] = useState('fr');
  let [AtoBList, setAtoBList] = useState([])
  let [BtoAList, setBtoAList] = useState([])

  let menuItem = [] as any;
    (Object.keys(lang.translation)).forEach(key => {
        menuItem.push(<option key={key} value={key}>{lang.translation[key]['nativeName']}</option>);
    });

  const clearMessages = () => {
    setBtoAList([]);
    setAtoBList([]);
  }

  const storeFeedback = (text, translation, feedback) => {
    let f = {};
    f['tr'] = translation;
    f['fd'] = feedback;
    feedbacks[text] = f;
  }

  const translate = async (from, to, text) => {

    //api code
    let translation = text;
    let options = {
        method: 'POST',
        baseUrl: 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0/',
        url: 'translate',
        qs: {
          'api-version': '3.0',
          'to': to,
          'from': from
        },
        headers: {
          'Ocp-Apim-Subscription-Key': key_var,
          'Ocp-Apim-Subscription-Region': region_var,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        body: [{
              'text': text
        }],
        json: true,
    };

    await new Promise((resolve, reject) => {
      request(options, (err, res, body) => {
        let tr = body[0].translations[0].text;
        console.log(tr);
        resolve(tr);
      })
  }).then((trn) => {
    translation = trn;
  })

  let f = {};
  f['tr'] = translation;
  f['fd'] = "none";
  feedbacks[text] = f;
  
    if(A === B) {
      alert('Both Languages are same please choose different languages');
    }
    else if(from === A) {
      setBtoAList([...BtoAList, <><MessageBox
        avatar={translateLogo}
        position={'left'}
        text={translation}
        /><div style={{paddingLeft:"20px"}}><button className="report positive" onClick={()=>storeFeedback(text, translation, "like")}><i className="fas fa-check"></i></button>
        <button className="report negative" onClick={()=>storeFeedback(text, translation, "dislike")}><i className="fas fa-times"></i></button></div></>]);
    } else {
      setAtoBList([...AtoBList, <><MessageBox
        avatar={translateLogo}
        position={'left'}
        text={translation}
        /><div style={{paddingLeft:"20px"}}><button className="report positive" onClick={()=>storeFeedback(text, translation, "like")}><i className="fas fa-check"></i></button>
        <button className="report negative" onClick={()=>storeFeedback(text, translation, "dislike")}><i className="fas fa-times"></i></button></div></>]);
    }
  }


  return (
    <div className="App">
      <Container>
        <Banner menuItems={menuItem} setCodeA={setA} setCodeB={setB} clearMessages={clearMessages}/>
      </Container>
      <div style={{display:"flex", flexDirection:"row",  justifyContent:"space-evenly", marginTop:"50px"}}>
        <ChatArea list={AtoBList} from={A} to={B}/>
        <ChatArea list={BtoAList} from={B} to={A}/>
      </div>
      <div style={{display:"flex", flexDirection:"row",  justifyContent:"space-evenly"}}>
        <TextArea addToList={setAtoBList} list={AtoBList} from={A} to={B} translate={translate}/>
        <TextArea addToList={setBtoAList} list={BtoAList} from={B} to={A} translate={translate}/>
      </div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
        <EndInteraction feedback={feedbacks}/>
      </div>
    </div>
  );
}

export default App;
