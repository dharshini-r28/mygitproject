import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useState,useEffect } from "react"
import Loader from "../Loader/Loader"
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
const ViewBookDetails=()=>{
        const {id}=useParams()
        //console.log(id)
        const navigate=useNavigate()
        const [Data,setData]=useState([])
        const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
        const role=useSelector((state)=>state.auth.role)
        const headers={
            id:localStorage.getItem("id"),
            authorization:`Bearer ${localStorage.getItem("token")}`,
            bookid:id,
        }
         const handelfavourite=async()=>{
            const response=await axios.put(`http://localhost:8000/api/v1/add-book-to-favourite`,{},{headers}) 
            alert(response.data.message)
         }
         const handlecart=async()=>{
            const response=await axios.put(`http://localhost:8000/api/v1/add-to-cart`,{},{headers})
            alert(response.data.message)
         }
        useEffect(()=>{
           const fetch=async()=>{
            const res=await axios.get(`http://localhost:8000/api/v1/get-book-by-id/${id}`);
           // console.log(res)
              setData(res.data.data)
           }
           fetch()
        },[])
        //const handleEdit=async()=>{
         //const res=await axios.put(`http://localhost:8000/api/v1/update-book`,{},{headers})
        // console.log(res)
       // }
       const deleteBook=async()=>{
       const res=await axios.delete(`http://localhost:8000/api/v1/delete-book`,{headers})
       alert(res.data.message)
       navigate('/all-books')
       }
       
    return(
        <>
        {Data && (<div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
        
        <div className="bg-zinc-800  px-4 py-12 h-[60vh] lg:h-[88vh] w-1/2 lg:w-3/6  "><div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded"><img src={Data.url} alt="image of book" className="h-[30vh] lg:h-[70vh] rounded"/>
        {isLoggedIn===true && role=='user' && <div className="flex flex-col md:flex-row lg:flex-col items-center justify-start mt-4 lg:mt-0">
 
 <button className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify center" onClick={handelfavourite}><FaHeart /></button><button className="text-white rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center" onClick={handlecart}><FaShoppingCart />
</button>
</div>}

{isLoggedIn===true && role=='admin' && <div className="flex flex-col md:flex-row lg:flex-col items-center justify-start mt-4 lg:mt-0">
 
 <Link to={`/updateBook/${id}`} className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify center" ><FaEdit /></Link>
 <button className="bg-white rounded lg:rounded-full mt-8 text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify center" onClick={deleteBook} ><MdDeleteOutline /></button>
</div>}
</div>
        </div>
        <div className="p-4 w-full lg:w-3/6">
        
        <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
        <p className="text-zinc-400 mt-1">by {Data.author}</p><p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
        <p className="flex mt-4 items-center justify-start text-zinc-400"><GrLanguage className="me-3"/>{Data.language}</p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price:{Data.price}</p>
        </div>
        </div>)}
        {!Data && <div className="h-screen bg-zinc-900 flex items-center justify-center"><Loader/></div>}
        </>
    )
}
export default ViewBookDetails