import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDEwYjFjZWFiNTMxNGE1NDRkMjM3MTNmMmM0N2VkZSIsIm5iZiI6MTc0NjE3MDE5NC4wMzgsInN1YiI6IjY4MTQ3MTUyMzZlMzE5ZDAwZDA4OTVmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjxZQ5dSQ6DIGfvFa17Wc1vjOBbK884Lu7eIke5gowo'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt="Go back"
        className="back-button"
        onClick={() => navigate(-1)}
      />
      {apiData.key ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='Trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
