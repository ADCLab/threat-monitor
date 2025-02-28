import React, { useState } from 'react';
import { fetchMessage } from '../utils/ fetchMessage';

function Survey() {
  const [text, setText] = useState('');

  const changeText = async () => {
    const newMessage = await fetchMessage();
    setText("hello");
  };

  const submit = () => {
    console.log("Submitted");
    const radios = document.getElementsByName("rank");
    let rank = 0;
    // Check which radio button is checked
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
    console.log("Rank: ", rank);

    changeText();

    // Clear the radio buttons
    for (let i = 0; i < radios.length; i++) {
      (radios[i] as HTMLInputElement).checked = false;
    }
  };

  return (
    <div>
      <h1>Survey</h1>
      <div className="InfoBox">
        <h3>Here's the criteria</h3>
        <p>
          You are a message analysis assistant. Your task is to evaluate whether a given message contains coded language that targets, incites, or supports military action, armed revolt, or civil war against specific people, persons, or organizations. Use the following rating scale for your evaluation:
          <br />
          When you receive a message, analyze its content and reply ONLY with the final rating number.
        </p>

        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>1: No coded language</li>
          <li>2: Possible coded language</li>
          <li>3: Coded language</li>
          <li>4: Strong coded language</li>
          <li>5: Extreme coded language</li>
        </ul>
        <h3>Please rate the following message:</h3>
        <textarea readOnly={true} value={text} />
      </div>
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
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default Survey;

