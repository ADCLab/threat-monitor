import React, { useState, useRef, useEffect } from 'react';
import { fetchMessage, recordRank } from '../utils/csv';

interface Message {
  uid: number;
  text: string;
}

function Survey() {
  const [text, setText] = useState('');
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const changeText = async () => {
    const newMessage: Message = await fetchMessage();
    setCurrentMessage(newMessage);
    setText(newMessage.text);
  };

  const submit = async () => {
    console.log("Submitted");
    const radios = document.getElementsByName("rank");
    let rank = 0;
    for (let i = 0; i < radios.length; i++) {
      if ((radios[i] as HTMLInputElement).checked) {
        rank = parseInt((radios[i] as HTMLInputElement).value);
        break;
      }
    }
    if (rank === 0) {
      alert("Please select a rating");
      return;
    }
    if (!currentMessage) {
      alert("No message available to record.");
      return;
    }
    await recordRank(currentMessage, rank);
    changeText();
    for (let i = 0; i < radios.length; i++) {
      (radios[i] as HTMLInputElement).checked = false;
    }
  };

  useEffect(() => {
    changeText();
  }, []);

  return (
    <div>
      <h1>Survey</h1>
      <div className="InfoBox">
        <h3>Here's the criteria</h3>

        <p>
          As a Message Analysis Assistant, your role is to assess whether a given message contains coded language that may incite or support military actions, armed revolt, or civil unrest targeting specific individuals or groups. Carefully review the message below and determine its level of risk.
        </p>
        <p>
          Use the following rating scale to respond with the final rating number only:
        </p>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li><strong>1:</strong> No coded language</li>
          <li><strong>2:</strong> Possible coded language</li>
          <li><strong>3:</strong> Coded language</li>
          <li><strong>4:</strong> Strong coded language</li>
          <li><strong>5:</strong> Extreme coded language</li>
        </ul>
        <h3>Please rate the following message:</h3>
        <textarea
          readOnly
          value={text}
          ref={textareaRef}
          style={{ width: '100%', resize: 'none', overflow: 'hidden' }}
        />
      </div>
      <div>
        <input type="radio" id="1" name="rank" value="1" />
        <label htmlFor="1">1</label>
        <input type="radio" id="2" name="rank" value="2" />
        <label htmlFor="2">2</label>
        <input type="radio" id="3" name="rank" value="3" />
        <label htmlFor="3">3</label>
        <input type="radio" id="4" name="rank" value="4" />
        <label htmlFor="4">4</label>
        <input type="radio" id="5" name="rank" value="5" />
        <label htmlFor="5">5</label>
      </div>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default Survey;

