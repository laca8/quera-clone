import React, { useState } from "react";
import "./css/post.css";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import RepeatOneOnOutlinedIcon from "@mui/icons-material/RepeatOneOnOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import ReactHtmlParser from "html-react-parser";
import { Button, Avatar, Input } from "@mui/material";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo date={date} locale="en-US" timeStyle="round" />
    </div>
  );
}
const Post = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const close = <ShareOutlinedIcon />;
  const handleQuill = (value) => {
    setAnswer(value);
  };
  const handleSubmit = async () => {
    if (post?._id) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        answer,
        questionId: post?._id,
      };
      try {
        const res = await axios.post("/api/answer", body, config);
        alert("answer adding successfully...");
        window.location.href = "/";
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="post">
      <div className="post__info">
        <Avatar />
        <h4>username</h4>

        <small>
          <LastSeen date={post?.createAt} />
        </small>
      </div>
      <div className="post__body">
        <div className="post__question">
          <p>{post?.questionName}</p>
          <button
            className="post__btnAnswer"
            onClick={() => setIsModalOpen(true)}
          >
            Answer
          </button>
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
            <div className="modal__question">
              <h1>{post?.questionName}</h1>
              <p>
                asked by <span className="name">username</span> on{" "}
                <span className="name">
                  {new Date(post?.createAt).toLocaleString()}
                </span>
              </p>
            </div>
            <div className="modal__answer">
              <ReactQuill
                value={answer}
                onChange={handleQuill}
                placeholder="Enter your answer"
              />
            </div>
            <div className="modal__button">
              <button className="cancle" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="add" onClick={handleSubmit}>
                Add Answer
              </button>
            </div>
          </Modal>
        </div>
        {post.questionUrl && <img src={post.questionUrl} alt="" />}
      </div>
      <div className="post__footer">
        <div className="post__footerAction">
          <ArrowUpwardOutlinedIcon />
          <ArrowDownwardOutlinedIcon />
        </div>
        <RepeatOneOnOutlinedIcon />
        <ChatBubbleOutlineOutlinedIcon />
        <div className="post__footerLeft">
          <ShareOutlinedIcon />
          <MoreHorizOutlinedIcon />
        </div>
      </div>
      <p
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "12px",
          fontWeight: "bold",
          margin: "10px 0",
        }}
      >
        {post?.allAnswers.length} Answer(s)
      </p>

      <div
        style={{
          margin: "5px 0px 0px 0px ",
          padding: "5px 0px 0px 20px",
          borderTop: "1px solid lightgray",
        }}
        className="post__answer"
      >
        <>
          {post?.allAnswers.map((ans) => (
            <div
              key={ans?._id}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: "10px 5px",
                borderTop: "1px solid lightgray",
              }}
              className="post-answer-container"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#888",
                }}
                className="post-answered"
              >
                <Avatar />
                <div
                  style={{
                    margin: "0px 10px",
                  }}
                  className="post-info"
                >
                  <p>username</p>
                  <span></span>
                </div>
              </div>
              <div className="post-answer">{ReactHtmlParser(ans.answer)}</div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default Post;
