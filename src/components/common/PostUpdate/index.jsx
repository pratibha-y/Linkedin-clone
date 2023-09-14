import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal";
import { uploadPostImage } from "../../../api/ImageUpload";
import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import {AiOutlineUserSwitch} from "react-icons/ai";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import ConnectionsComponent from "../../../components/ConnectionsComponent";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
    };
    await postStatus(object);
    await setModalOpen(false);
    setIsEdit(false);
    await setStatus("");
  };

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  useMemo(() => {
    getStatus(setAllStatus);
  }, []);

  return (
    <div className="home-page">
      <div className="left-side">
        
        <div className="user-details">
            <img src={currentUser?.imageLink} alt="imageLink" />
            <p className="name">{currentUser?.name}</p>
            <p className="headline">{currentUser?.headline}</p>
          </div>
          
          <div className="connections">
            <div className="inner-connections">
            <p className="ic-1">Connections</p>
            <p className="ic-2">Grow Your Network</p>
            </div>
            <div className="connections-link">
              <Link to="/connections"><AiOutlineUserSwitch></AiOutlineUserSwitch></Link>
            </div>
          </div>
          <div className="left-inner">
          <div className="group">
            <div className="inner-connections">
            <p className="ic-1">Groups</p>
            <p className="ic-1">Events</p>
            <p className="ic-1">Follow Hashtags</p>
            </div>
            <div className="connections-link">
              <a href="#">+</a>
            </div>
          </div>
          </div>
      </div>


      <div className="center-side">
        <div className="post-status-main">
          
          <div className="post-status">
            <img
              className="post-image"
              src={currentUser?.imageLink}
              alt="imageLink"
            />
            <button
              className="open-post-modal"
              onClick={() => {
                setModalOpen(true);
                setIsEdit(false);
              }}
            >
              Start a Post
            </button>
          </div>

          <ModalComponent
            setStatus={setStatus}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            status={status}
            sendStatus={sendStatus}
            isEdit={isEdit}
            updateStatus={updateStatus}
            uploadPostImage={uploadPostImage}
            postImage={postImage}
            setPostImage={setPostImage}
            setCurrentPost={setCurrentPost}
            currentPost={currentPost}
          />

          <div className="all-posts">
            {allStatuses.map((posts) => {
              return (
                <div key={posts.id}>
                  <PostsCard posts={posts} getEditData={getEditData} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="right-side">
      <ConnectionsComponent currentUser={currentUser} />
      </div>
    </div>
  );
}
