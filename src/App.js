import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import DarkMode from "./DarkMode";
import "./App.css";
import PhotoModal from "./PhotoModal";

Modal.setAppElement("#root");

function App() {
  const [photos, setPhotos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`https://api.unsplash.com/search/photos?query=${searchQuery}`, {
          headers: {
            Authorization:
              "Client-ID r_OrvfXgAvnH9quPFWhmvhMXArGFegI58qQa95YwIKM",
          },
        })
        .then((response) => {
          setPhotos(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching photos:", error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg mx-auto">
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{fontFamily : "Agbalumo", fontSize: "25px", margin: "10px 50px 10px 60px"}}>
            Image Gallery
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div
              className="header_search1"
            >
              <i className="bi bi-search"></i>
              <input
                className="form-control"
                type="search"
                placeholder="Search images here"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Explore
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Collection
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Community
                </a>
              </li>
            </ul>
            <DarkMode/>
          </div>
          
        </div>
      </nav>

      <div
        className="card text-bg-dark"
        style={{ border: "none", outline: "none" }}
      >
        <img
          src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&w=1000&q=80"
          className="card-img"
          alt="Mountains"
          style={{ height: "70vh", objectFit: "cover" }}
        />
        <div className="card-img-overlay">
          <div className="mtv">
            <h5
              className="card-title"
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                paddingBottom: "6px",
              }}
            >
              Download High Quality Images by Creators
            </h5>
            <p className="card-text" style={{ color: "#D3D3D3" }}>
              <small>
                Over 2.4 million+ stock images by our talented community
              </small>
            </p>
            <div className="header_search mx-auto">
              <i className="bi bi-search"></i>
              <input
                className="form-control"
                type="search"
                placeholder="Search high resolution images, categories, wallpapers"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className="container">
        <div className="row">
          {photos.map((photo) => (
            <div key={photo.id} className="col-md-4 mb-4">
              <div
                className="card"
                style={{ width: "18rem", margin : "auto" }}
                onClick={() => openModal(photo)}
              >
                <img
                  src={photo.urls.thumb}
                  className="card-img-top"
                  alt={photo.alt_description}
                />
                <div className="card-body d-flex justify-content-between">
                  <div
                    className="user-profile d-flex"
                    style={{ fontSize: "12px" }}
                  >
                    <img
                      src={photo.user.profile_image.small}
                      alt="image"
                      className="user-profile-image"
                      style={{ borderRadius: "50px", width:"50px", fontSize: "12px" }}
                    />
                    <div>
                      <p className="card-title">
                        <b>{photo.user.name}</b>
                      </p>
                      <p className="card-text">@{photo.user.username}</p>
                    </div>
                  </div>
                  <p className="card-text" style={{ fontSize: "15px" }}>
                    <i className="bi bi-hand-thumbs-up mx-1"></i>
                    {photo.likes}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PhotoModal selectedPhoto={selectedPhoto} closeModal={closeModal}/>


    </div>
  );
}

export default App;
