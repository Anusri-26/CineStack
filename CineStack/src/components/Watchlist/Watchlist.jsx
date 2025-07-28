// src/components/Watchlist/Watchlist.jsx
import React, { useState, useEffect } from 'react';
import './Watchlist.css';
import { db } from '../../firebase';
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../../AuthContext'; // or wherever you manage auth

const Watchlist = () => {
  const [movieName, setMovieName] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const { currentUser } = useAuth(); // assumes you're using auth context

  const userRef = doc(db, 'users', currentUser.uid);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setWatchlist(docSnap.data().watchlist || []);
      }
    };
    fetchWatchlist();
  }, []);

  const addToWatchlist = async () => {
    if (!movieName.trim()) return;
    const newMovie = { id: uuidv4(), name: movieName.trim() };

    try {
      await updateDoc(userRef, {
        watchlist: arrayUnion(newMovie),
      });
      setWatchlist((prev) => [...prev, newMovie]);
      setMovieName('');
    } catch (err) {
      console.error('Error adding movie:', err);
    }
  };

  const removeFromWatchlist = async (movie) => {
    try {
      await updateDoc(userRef, {
        watchlist: arrayRemove(movie),
      });
      setWatchlist((prev) => prev.filter((item) => item.id !== movie.id));
    } catch (err) {
      console.error('Error removing movie:', err);
    }
  };

  return (
    <div className="watchlist-container">
      <h2>🎬 My List</h2>
      <div className="watchlist-input">
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie/show name"
        />
        <button onClick={addToWatchlist}>Add</button>
      </div>
      <ul>
        {watchlist.map((movie) => (
          <li key={movie.id}>
            {movie.name}
            <button onClick={() => removeFromWatchlist(movie)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
