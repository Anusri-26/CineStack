import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './MyList.css';

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyList = async () => {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Please log in to view your list.");
        return;
      }
      
      try {
        const q = query(collection(db, "users", user.uid, "mylist"));
        const querySnapshot = await getDocs(q);
        const movies = querySnapshot.docs.map(doc => doc.data());
        setMyList(movies);
      } catch (error) {
        toast.error("Failed to fetch your list.");
        console.error("Error fetching list:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyList();
  }, []);

  const handleRemoveFromList = async (id) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please log in to remove from your list.");
      return;
    }

    try {
      const movieRef = doc(db, "users", user.uid, "mylist", id);
      await deleteDoc(movieRef);
      setMyList(myList.filter(movie => movie.id !== id));  // Remove from UI immediately
      toast.success("Removed from your list.");
    } catch (error) {
      toast.error("Failed to remove movie from list.");
      console.error("Error removing movie:", error);
    }
  };

  return (
    <div className="mylist">
      <h2>Your My List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : myList.length === 0 ? (
        <p>Your list is empty. Add some movies to your list!</p>
      ) : (
        <div className="mylist-grid">
          {myList.map((movie) => (
            <div key={movie.id} className="mylist-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <button onClick={() => handleRemoveFromList(movie.id)}>
                  Remove from List
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;
