import React, { useState, useEffect } from "react";

function ShowList() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, []);

  return (
    <div>
      <h1>Show List</h1>
      {shows.map((show) => (
        <div key={show.show.id}>
          <h2>{show.show.name}</h2>
          <p>{show.show.summary}</p>
          <button>View Details</button>
        </div>
      ))}
    </div>
  );
}

export default ShowList;
