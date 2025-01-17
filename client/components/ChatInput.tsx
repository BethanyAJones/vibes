import React, { useState, useContext } from 'react';
import Picker from 'emoji-picker-react';
import { BsEmojiSmileFill } from 'react-icons/bs';
import {TextField, Grid, ArrowCircleUpIcon} from '../styles/material';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

const ChatInput: React.FC<{}> = ({ handleSendMsg }) => {

  const userContext = useContext(UserContext);
  const { currentUserInfo } = userContext;
  const currentUser = currentUserInfo;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiClick = (e, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const handleEmojiMenuToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const enterClick = (e) => {
    if (e.keyCode === 13) {
      sendChat(e);
    }
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  //   return (
  //     <Grid container>
  //       <Grid item xs={1} sx={{mt: 1.5}}>
  //         <BsEmojiSmileFill onClick={handleEmojiMenuToggle} />
  //         {
  //         showEmojiPicker &&
  //         <Picker pickerStyle={{ position: 'relative', top: '-350px'}} onEmojiClick={handleEmojiClick} />
  //         }
  //       </Grid>
  //       <Grid item xs={10}>
  //       <TextField
  //         hiddenLabel
  //         id="filled-hidden-label-small"
  //         placeholder="message"
  //         variant="filled"
  //         size="small"
  //         value={msg}
  //         onChange={(e)=>setMsg(e.target.value)}
  //         onKeyDown={(e)=>enterClick(e)}
  //         />
  //       </Grid>
  //       <Grid item xs={1} sx={{mt: 1.2}}>
  //         <ArrowCircleUpIcon />
  //       </Grid>
  //     </Grid>
  //   )
  // }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiMenuToggle} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          onKeyDown={(e)=>enterClick(e)}
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <ArrowCircleUpIcon />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
display: grid;
align-items: center;
grid-template-columns: 5% 95%;
background-color: #080420;
padding: 0 2rem;
@media screen and (min-width: 720px) and (max-width: 1080px) {
  padding: 0 1rem;
  gap: 1rem;
}
.button-container {
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;
  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    .emoji-picker-react {
      position: absolute;
      top: -350px;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: #9a86f3;
      }
      .emoji-group:before {
        background-color: #080420;
      }
    }
  }
}
.input-container {
  width: 100%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  input {
    width: 90%;
    height: 60%;
    background-color: transparent;
    color: white;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;
    &::selection {
      background-color: #9a86f3;
    }
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
    border: none;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      padding: 0.3rem 1rem;
      svg {
        font-size: 1rem;
      }
    }
    svg {
      font-size: 2rem;
      color: white;
    }
  }
}
`;

export default ChatInput;
