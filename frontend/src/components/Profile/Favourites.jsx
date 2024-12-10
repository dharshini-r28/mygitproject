import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";
import starImage from './star2.png'
const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/get-favourite-books`, { headers });
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch favourite books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 min-h-screen">
    {FavouriteBooks.length > 0 ? (
      FavouriteBooks.map((item, i) => (
        <div key={i}>
          <BookCard data={item} favourite={true} />
        </div>
      ))
    ) : (
      <div className="col-span-4 flex items-center justify-center">
        <img src={starImage} alt="star" className="w-[70vh] h-auto itmes-center justify-center"/>
        {/* <p className="text-5xl font-semibold text-zinc-500">No favourite books found.</p> */}
      </div>
    )}
  </div>
  );
};

export default Favourites;
