// settings has the join form, adjust timer, add categories, choose how many categories for the list.

import React, { useState, useContext } from 'react';

import UserContext from '../contexts/UserContext';
import socket from '../service/socketConnection';

const Settings = () => {
  const { user } = useContext(UserContext);
  const [display, setDisplay] = useState("none");
  const [categories, setCategories] = useState(12);
  const [timer, setTimer] = useState(3);
  const [disabled, setDisabled] = useState(true);

  const settingsStyle = {
    display: display
  }

  const btnStyle = {
    backgroundColor: disabled,
  }
  
  const toggleForm = () => {
    if (display === 'block') {
      setDisplay('none');
    } else {
      setDisplay("block")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplay('none');
    socket.emit('gameChoices', {timer, categories});
  }
  
  const handleChange = (e, state) => {
    state === "timer" ? setTimer(e.target.value) : setCategories(e.target.value);
    setDisabled(false);
  }

  function showSettingsForm () {
    return (
      <form className="col s12" style={settingsStyle} onSubmit={handleSubmit}>
        <div className="input-field col s12">
          <select id="timerSelect" className="browser-default" onChange={e => handleChange(e, "timer")}>
            <option value="">Set the Timer</option>
            <option value="1">1 minute</option>
            <option value="2">2 minute</option>
            <option value="3">3 minutes</option>
            <option value="4">4 minutes</option>
            <option value="5">5 minutes</option>
          </select>
        </div >
        <div className="input-field col s12">
          <select id="categorySelect" className="browser-default" onChange={e => handleChange(e, "cat")}>
            <option value="">How many Categories</option>
            <option value="12">12 categories</option>
            <option value="11">11 categories</option>
            <option value="10">10 categories</option>
            <option value="9">9 categories</option>
            <option value="8">8 categories</option>
            <option value="7">7 categories</option>
            <option value="6">6 categories</option>
          </select>
        </div >
        <button className="settingsButton" disabled={disabled} type="submit">submit</button>
      </form>
    )
  }

  if (!user.admin) return <div></div>;
  return (
    <div  >
      <a className="waves-effect waves-light btn" onClick={toggleForm} style={{float: 'right'}}>game settings</a>
      {showSettingsForm()}
      {/* <a className="waves-effect waves-light btn" onClick={addCategories} >add a category</a> */}
    </div >
  )
};

export default Settings;
