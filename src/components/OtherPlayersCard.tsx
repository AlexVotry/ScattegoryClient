// shows the scategory list (PlayerList component), letter, timer, and control buttons for each team. 

import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import OthersGameSheet from './OthersGameSheet';
import Timer from './Timer';
import Letter from './Letter/Letter';
import ControlButtons from './ControlButtons';
import UserContext from '../contexts/UserContext';
import TeamsContext from '../contexts/TeamsContext';
import { styles, colors } from '../cssObjects';
import { findOthers } from '../service/parseTeams';
import socket from '../service/socketConnection';

const OtherPlayersCard = ({messages}) => {
  console.log('otherplayingcard')
  // const [teammates, setTeammates] = useState([]);
  // const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);
  const [teams, setTeams] = TeamsContext.useTeams();
  const team = teams[user.team];
  const others = findOthers(team, user);
  const scrollWidth = !others.length ? '90%' : '40%';
  
  const otherCard = {
    ...styles.flexRow,
    width: '65vw'
  }
  
  const cardStyle = {
    ...styles.flexRow,
    backgroundColor: colors[user.team],
    color: colors.White,
    padding: '5px',
    height: '70vh',
    width: '60%'
  }
  const listStyle = {
    alignItems: 'flex-start',
    padding: '0 20px',
    width: '100%',
    border: '4px ridge white'
  }
  
  const userStyle = {
    ...styles.speechBox,
    borderColor: '#39CCCC',
    color: '#39CCCC',
  }
  
  const otherStyle = {
    ...styles.speechBox,
    borderColor: '#85144b',
    color: '#85144b',
    alignSelf: 'flex-end'
  }
  
  const scrollBarStyle = {
    width: scrollWidth,
    height: '70vh'
  }
  
  const renderOtherGameCard = () => {
    console.log('other length:', others.length)
    if (!others.length) return <div></div>;
    return (
      <div id="otherPlayers" className="otherPlayers" style={cardStyle} >
      {renderOthers()}
      </div>
    );
  }
  const renderOthers = () => {
    return others.map(({name}) => {
      return (
        <div className="eachlistOther" key={name} style={listStyle}>
          <div className="ListName" style={{textAlign: 'center', marginBottom: '10px'}}>{name}</div>
          <OthersGameSheet name={name}/>
        </div>
      )
    })
  }


  const showMessages = () => {
    if (!messages.length) return;
    return messages.map(({message, name}, index) => {
      const teamStyle = name === user.name ? userStyle : otherStyle;
      const eachMessage = name === user.name ? 'userMessage' : 'otherMessage';
      return (
        <div className={eachMessage} key={`${name}_${index}`} style={teamStyle}>
          <div className="messageFrom" style={styles.italicsBold}>{name}</div>
          <div className="messageText">{message}</div>
        </div>
      );
    });
  }

  
  
  return useMemo(() => {
    return (
      <div className="otherCard" style={otherCard}>
        <Scrollbars style={scrollBarStyle} >
          <div className="messages" style={styles.messages}>
            {showMessages()}
          </div>
        </Scrollbars>
        {renderOtherGameCard()}
      </div>
    )
  }, [messages])

}

export default OtherPlayersCard;