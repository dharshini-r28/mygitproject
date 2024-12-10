import { Link } from "react-router-dom";
import axios from "axios";
const BookCard=({data,favourite})=>{
    //console.log(data);
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
        bookid:data._id,
    }
    const handleRemove=async(e)=>{
     // e.preventDefault();
         const response=await axios.put(
            "http://localhost:8000/api/v1/remove-book-from-favourite",{},{headers}
         )
         alert(response.data.message);
    }
    return(
     <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img src={data.url} alt="books" className="h-[25vh]" />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
        <p className="mt-1 text-xl text-zinc-400 font-semibold">by {data.author}</p>
        <p className="mt-1 text-xl text-zinc-200 font-semibold">{data.price}</p>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-200 text-blue-500 px-4 py-2 rounded border border-yellow-500 mt-4"
          onClick={handleRemove}
        >
          Remove From Favourites
        </button>
      )}
    </div>)
}
export default BookCard