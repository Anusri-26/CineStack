// import React, { useEffect, useRef, useState } from 'react'
// import './TitleCards.css'
// import { Link } from 'react-router-dom'

// const TitleCards = ({ title, category }) => {
//   const [apiData, setApiData] = useState([]);
//   const cardsRef = useRef();

//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2Y3ZDBmNDdlOTkxOTc0ZDBiZTkyM2Y0YWE0MTQ0NiIsIm5iZiI6MS43NDY1MzE4ODMxMjYwMDAyZSs5LCJzdWIiOiI2ODE5ZjYyYmUzNmUzYmY0YmQ3NGI1OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S30dqtHZQodYRQMygB-7AZ1R0t6vFONm_9PtjhfqAsU'
//     }
//   };

//   const handleWheel = (event) => {
//     event.preventDefault();
//     cardsRef.current.scrollLeft += event.deltaY;
//   };

//   useEffect(() => {
//     fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
//       .then(res => res.json())
//       .then(res => setApiData(res.results || []))
//       .catch(err => console.error(err));

//     const currentRef = cardsRef.current;
//     currentRef.addEventListener('wheel', handleWheel);

//     return () => {
//       currentRef.removeEventListener('wheel', handleWheel);
//     };
//   }, [category]);

//   return (
//     <div className='title-cards'>
//       <h2>{title ? title : "Popular on Cineflix"}</h2>
//       <div className="card-list" ref={cardsRef}>
//         {apiData.map((card, index) => (
//           <Link to={`/player/${card.id}`} className="card" key={index}>
//             <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
//             <p>{card.original_title}</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TitleCards;

import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { db, auth } from '../../firebase';
import { setDoc, doc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2Y3ZDBmNDdlOTkxOTc0ZDBiZTkyM2Y0YWE0MTQ0NiIsIm5iZiI6MS43NDY1MzE4ODMxMjYwMDAyZSs5LCJzdWIiOiI2ODE5ZjYyYmUzNmUzYmY0YmQ3NGI1OTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.S30dqtHZQodYRQMygB-7AZ1R0t6vFONm_9PtjhfqAsU'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const handleAddToList = async (movie) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please log in to add to your list.");
      return;
    }

    const movieId = uuidv4();
    try {
      await setDoc(doc(db, "users", user.uid, "mylist", movieId), {
        title: movie.original_title || movie.name || movie.title || "Untitled",
        backdrop_path: movie.backdrop_path || '',
        id: movie.id,
        addedAt: new Date(),
      });

      toast.success(`${movie.original_title || movie.name} added to your list!`);
    } catch (error) {
      console.error("Error adding to list:", error);
      toast.error("Failed to add movie to list.");
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Cineflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <div className="card" key={index}>
            <Link to={`/player/${card.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            </Link>
            <p>{card.original_title}</p>
            <button onClick={() => handleAddToList(card)}>+ My List</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
