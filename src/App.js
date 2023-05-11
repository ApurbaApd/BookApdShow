import React, { useState, useEffect } from "react";
import TicketBooking from "./components/TicketBooking";
import "./App.css";

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.log(error));
  }, []);


  const handleShowClick = (show) => {
    console.log("handleShowClick called with show:", show);
    setSelectedShow(show);
  };


  const handleBookingClick = () => {
    setBookingFormOpen(true);
  };

  const handleBookingClose = () => {
    setBookingFormOpen(false);
    setSelectedShow(null);
  };

  const renderShows = () => {
    return (
      <div className="shows-container">
        <h2>Shows</h2>
        <div className="shows">
          {shows.map((show, index) => (
            <div key={index} className="show">
              <h3>{show.show.name}</h3>
              {show.show.image ? (
                <img src={show.show.image.medium} alt={show.show.name} />
              ) : (
                <img
                  src="https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
                  alt="not available"
                />
              )}
              <h3>{show.show.rating.average}</h3>
              <h3>{show.show.language}</h3>
              <button onClick={() => handleShowClick(show)}>
                View Summary
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  const renderSelectedShow = () => {
    if (!selectedShow) {
      return null;
    }
  
    const imageUrl = selectedShow.show?.image?.medium;
    const savedImageUrl = "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
  
    return (
      <div className="shows-container">
        <h2>{selectedShow.show.name}</h2>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={selectedShow.show.name}
            style={{ width: "300px", height: "auto", borderRadius: "5px" }}
          />
        ) : (
          <img
            src={savedImageUrl}
            alt={selectedShow.show.name}
            style={{ width: "300px", height: "auto", borderRadius: "5px" }}
          />
        )}
        <h3>{selectedShow.show.rating.average}</h3>
        <h3>{selectedShow.show.language}</h3>
        <div
          className="summary"
          dangerouslySetInnerHTML={{
            __html: selectedShow.show.summary
              .replace(/<p>/g, "")
              .replace(/<\/p>/g, ""),
          }}
        ></div>
        <div className="button-container">
          <a href="/" className="cancel-link round-button">
            Back
          </a>
          <button onClick={handleBookingClick}>Book Ticket</button>
        </div>
      </div>
    );
  };
  

  return (
    <div>
      {selectedShow ? renderSelectedShow() : renderShows()}
      {bookingFormOpen && (
        <TicketBooking
          showName={selectedShow.show.name}
          onClose={handleBookingClose}
        />
      )}
    </div>
  );
}

export default App;
