import React from "react";
import Modal from "react-modal";

const PhotoModal = ({ selectedPhoto, closeModal, darkMode }) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 999,
    },
    content: {
      position: "relative",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "80%",
      maxHeight: "80%",
      border: "none",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      padding: 0,
      
    },
    closeIcon: {
      position: "absolute",
      top: "1px",
      right:"1px",
      cursor: "pointer",
      fontSize: "20px",
      border: "1px solid",
      width:"30px",
      borderRadius :"100px",
      backgroundColor: "lightGray"
    },
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = selectedPhoto.urls.full;
    downloadLink.download = `${selectedPhoto.id}.jpg`;
    downloadLink.click();
  };
  
  return (
    <Modal
      isOpen={selectedPhoto !== null}
      onRequestClose={closeModal}
      contentLabel="Photo Details Modal"
      style={{ customStyles }}
    >
      {selectedPhoto && (
        <div className="modal-content">
          <div style={customStyles.closeIcon} onClick={closeModal}>
            <i className="bi bi-x"></i>
          </div>
          <div className="image-container">
            <img
              src={selectedPhoto.urls.regular}
              alt={selectedPhoto.alt_description}
              className="modal-image"
              
            />
          </div>
          <div className="container">
            <div className="d-flex justify-content-between">
              <div className="left-buttons">
                <button className="btn share">
                <i className="bi bi-share" style={{marginRight: "7px"}}></i>
                  Share
                </button>
                <button className="btn info">
                <i className="bi bi-info-circle" style={{marginRight: "7px"}}></i>
                Info
                </button>
              </div>
              <div className="right-buttons ">
                <button className="btn download" onClick={handleDownload}>
                  Download Image
                </button>
              </div>
            </div>

            <br />
            <div className="modal-details">
              <div className="space">
                <div className="user-info d-flex">
                  <img
                    src={selectedPhoto.user.profile_image.medium}
                    alt="User Profile"
                    className="user-profile-image"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "100px",
                    }}
                  />
                  <br />
                  <div className="conatiner mx-3">
                    <p className="user-name" style={{ marginBottom: "1" }}>
                      {selectedPhoto.user.name}
                    </p>
                    <p className="user-username" style={{ color: "gray", fontSize: "14px" }}>
                      @{selectedPhoto.user.username}
                    </p>
                  </div>
                </div>
              
              <div className="social-links" style={{ marginLeft: "30px" }}>
                {selectedPhoto.user.instagram_username && (
                  <p>
                    <i className="bi bi-instagram"></i>{" "}
                    <a
                      href={`https://www.instagram.com/${selectedPhoto.user.instagram_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      /{selectedPhoto.user.instagram_username}
                    </a>
                  </p>
                )}

                {selectedPhoto.user.twitter_username && (
                  <p>
                    <i className="bi bi-twitter-x"></i>{" "}
                    <a
                      href={`https://twitter.com/${selectedPhoto.user.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      /{selectedPhoto.user.twitter_username}
                    </a>
                  </p>
                )}
              </div>
              <div style={{ marginLeft: "70px" }}>
                <p className="downloads-likes">
                  {selectedPhoto.downloads} downloads{" "}
                  <i className="bi bi-hand-thumbs-up mx-1"></i>{" "}
                  {selectedPhoto.likes}
                </p>
              </div>
            </div>
          </div>
          </div>
          <br />
          <h5>Related Tags</h5>
          <div className="tags">
            {selectedPhoto.tags.map((tag) => (
              <span key={tag.title} className="tag">
                {tag.title}
              </span>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PhotoModal;
