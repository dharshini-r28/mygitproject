import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from 'react-router-dom';
import noOrderImage from './notfound2.png';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/get-order-history`, { headers });
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {!OrderHistory && <div className="flex items-center justify-center h-[100%]"><Loader /></div>}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
          <img src={noOrderImage} alt="No Orders" className="h-[50vh] w-[50] mb-8" />
            {/* <h1 className="text-5xl font-semibold text-zinc-500 mb-8">No Orders Placed</h1> */}
           
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Order History</h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]"><h1 className="text-center">Sn</h1></div>
            <div className="w-[22%]"><h1 className="">Books</h1></div>
            <div className="w-[45%]"><h1 className="">Description</h1></div>
            <div className="w-[9%]"><h1 className="">Price</h1></div>
            <div className="w-[16%]"><h1 className="">Status</h1></div>
            <div className="w-none md:w-[5%] hidden md:block"><h1 className="">Mode</h1></div>
          </div>

          {OrderHistory.map((items, i) => (
  <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 cursor-pointer">
    <div className="w-[3%]"><h1 className="text-center">{i + 1}</h1></div>
    <div className="w-[22%]">
      {items.book ? (
        <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
      ) : (
        <span>No Book Details</span>
      )}
    </div>
    <div className="w-[45%]"><h1 className="">{items.book ? items.book.desc.slice(0, 50) : 'No Description'}</h1></div>
    <div className="w-[9%]"><h1 className="">{items.book ? items.book.price : 'N/A'}</h1></div>
    <div className="w-[16%]">
      <h1 className={`font-semibold ${items.status === "Order Placed" ? "text-yellow-500" : items.status === "Cancelled" ? "text-red-500":items.status==="Out for delivery"?"text-blue-500" : "text-green-500"}`}>
        {items.status}
      </h1>
    </div>
    <div className="w-none md:w-[5%] hidden md:block"><h1 className="text-sm text-zinc-400">COD</h1></div>
  </div>
))}

        </div>
      )}
    </>
  );
};

export default UserOrderHistory;




// import { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "../Loader/Loader";
// import { Link } from 'react-router-dom';
// import noOrderImage from './notfound2.png';

// const UserOrderHistory = () => {
//   const [OrderHistory, setOrderHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/v1/get-order-history`, { headers });
//         setOrderHistory(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch order history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   const handleCancelOrder = async (bookId) => {
//     const userId = localStorage.getItem("id");

//     if (!window.confirm("Are you sure you want to cancel this order?")) {
//       return;
//     }

//     try {
//       const response = await axios.delete(`http://localhost:8000/api/v1/delete-order`, {
//         headers,
//         data: { userId, bookId }
//       });
//       alert(response.data.message);
//       setOrderHistory(OrderHistory.filter(order => order.book._id !== bookId));
//     } catch (error) {
//       console.error("Failed to delete order:", error);
//       alert("Failed to delete order. Please try again.");
//     }
//   };

//   return (
//     <>
//       {loading && <div className="flex items-center justify-center h-[100%]"><Loader /></div>}
//       {!loading && OrderHistory.length === 0 && (
//         <div className="h-[80vh] p-4 text-zinc-100">
//           <div className="h-[100%] flex flex-col items-center justify-center">
//             <img src={noOrderImage} alt="No Orders" className="h-[50vh] w-[50] mb-8" />
//           </div>
//         </div>
//       )}
//       {!loading && OrderHistory.length > 0 && (
//         <div className="h-[100%] p-0 md:p-4 text-zinc-100">
//           <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Your Order History</h1>
//           <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
//             <div className="w-[3%]"><h1 className="text-center">Sn</h1></div>
//             <div className="w-[22%]"><h1 className="">Books</h1></div>
//             <div className="w-[45%]"><h1 className="">Description</h1></div>
//             <div className="w-[9%]"><h1 className="">Price</h1></div>
//             <div className="w-[16%]"><h1 className="">Status</h1></div>
//             <div className="w-none md:w-[5%] hidden md:block"><h1 className="">Mode</h1></div>
//           </div>

//           {OrderHistory.map((items, i) => (
//             <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 cursor-pointer">
//               <div className="w-[3%]"><h1 className="text-center">{i + 1}</h1></div>
//               <div className="w-[22%]">
//                 {items.book ? (
//                   <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>{items.book.title}</Link>
//                 ) : (
//                   <span>No Book Details</span>
//                 )}
//               </div>
//               <div className="w-[45%]"><h1 className="">{items.book ? items.book.desc.slice(0, 50) : 'No Description'}</h1></div>
//               <div className="w-[9%]"><h1 className="">{items.book ? items.book.price : 'N/A'}</h1></div>
//               <div className="w-[16%]">
//                 <h1 className={`font-semibold ${items.status === "Order placed" ? "text-yellow-500" : items.status === "Cancelled" ? "text-red-500" : "text-green-500"}`}>
//                   {items.status}
//                 </h1>
//               </div>
//               <div className="w-none md:w-[5%] hidden md:block">
//                 <h1 className="text-sm text-zinc-400">COD</h1></div>
//               {(items.status !== "Cancelled" && items.status !== "Delivered") && (
//                 <button onClick={() => handleCancelOrder(items.book._id)} className="text-red-500">
//                   Cancel Order
//                 </button>
//               )}
//             </div>
//           ))}

//         </div>
//       )}
//     </>
//   );
// };

// export default UserOrderHistory;
