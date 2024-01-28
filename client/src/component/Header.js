import React, { useState } from "react";
import "./css/header.css";
import HomeIcon from "@mui/icons-material/Home";
import FeaturedPlayListOutlinedIcon from "@mui/icons-material/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Avatar, Input } from "@mui/material";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState("");
  const [question, setQuestion] = useState("");
  const close = <ExpandMoreIcon />;
  const handelSubmit = async () => {
    if (question !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        questionName: question,
        questionUrl: inputUrl,
      };
      try {
        const res = await axios.post("/api/question", body, config);
        alert("question adding successfully...");
        window.location.href = "/";
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="qHeader">
      <div className="qHeader-content">
        <div className="qHeader__logo">
          <img
            src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
            alt="logo"
          />
        </div>
        <div className="qHeader__icons">
          <div className="qHeader__icon">
            <HomeIcon />
          </div>
          <div className="qHeader__icon">
            <FeaturedPlayListOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <AssignmentTurnedInOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <PeopleAltOutlinedIcon />
          </div>
          <div className="qHeader__icon">
            <NotificationsActiveOutlinedIcon />
          </div>
        </div>
        <div className="qHeader__input">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search questions" />
        </div>
        <div className="qHeader__Rem">
          <span>
            <Avatar />
          </span>

          <Button onClick={() => setIsModalOpen(true)}>Add Question</Button>
          <Modal
            open={isModalOpen}
            closeIcon={close}
            onClose={() => setIsModalOpen(false)}
            closeOnEsc
            center
            closeOnOverlayClick={false}
            styles={{
              overlay: {
                height: "auto",
              },
            }}
          >
            <div className="modal__title">
              <h5>Add Question</h5>
              <h5>Share Link</h5>
            </div>
            <div className="modal__info">
              <Avatar className="avatar" />
              <div className="modal__scope">
                <PeopleAltOutlinedIcon />
                <p>Public</p>
                <ExpandMoreIcon />
              </div>
            </div>
            <div className="modal__Field">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type=" text"
                placeholder="Start your question with 'What', 'How', 'Why', etc. "
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={{
                    margin: "5px 0",
                    border: "1px solid lightgray",
                    padding: "10px",
                    outline: "2px solid #000",
                  }}
                  placeholder="Optional: inclue a link that gives context"
                />
                {inputUrl !== "" && (
                  <img
                    style={{
                      height: "40vh",
                      objectFit: "contain",
                    }}
                    src={inputUrl}
                    alt="displayimage"
                  />
                )}
              </div>
            </div>
            <div className="modal__buttons">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="add" onClick={handelSubmit}>
                Add Question
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
