import React, { useState, useEffect } from "react";
import { useParams } from 'react-router';


function ShowDetail() {
  const [show, setShow] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data));
  }, [id]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{show.name}</h1>
      <img src={show.image.medium} alt={show.name} />
      <p>{show.summary}</p>
      <button>Book Ticket</button>
    </div>
  );
}

export default ShowDetail;










