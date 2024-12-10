import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaCheck, FaUser } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [options, setOptions] = useState(-1);
    const [values, setValues] = useState({ status: "" });
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    const change = (e) => {
        setValues({ status: e.target.value });
    };

    const submitChanges = async (i) => {
        const orderId = allOrders[i]._id;
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/update-status/${orderId}`, values, { headers });
            alert(response.data.message);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/get-all-orders", { headers });
                setAllOrders(res.data.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <>
            {allOrders.length === 0 ? (
                <div className="h-[100%] flex items-center justify-center text-zinc-500">
                    {allOrders.length === 0 && (
                        <div className="text-xl">No orders found</div>
                    )}
                </div>
            ) : (
                <div className="h-[100%] p-0 md:p-4 text-zinc-100">
                    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">All orders</h1>
                    <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
                        <div className="w-[3%]"><h1 className="text-center">Sn</h1></div>
                        <div className="w-[40%] md:w-[22%]"><h1>Books</h1></div>
                        <div className="w-0 md:w-[45%] hidden md:block"><h1>Description</h1></div>
                        <div className="w-[17%] md:w-[9%]"><h1>Price</h1></div>
                        <div className="w-[17%] md:w-[9%]"><h1>Status</h1></div>
                        <div className="w-[10%] md:w-[5%]"><h1><FaUser /></h1></div>
                    </div>
                    {allOrders.map((items, i) => (
                        <div key={i} className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 cursor-pointer">
                            <div className="w-[3%]"><h1 className="text-center">{i + 1}</h1></div>
                            <div className="w-[40%] md:w-[22%]">
                                {items.book ? (
                                    <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                                        {items.book.title}
                                    </Link>
                                ) : (
                                    <span>No Book Details</span>
                                )}
                            </div>
                            <div className="w-0 md:w-[45%] hidden md:block">
                                <h1>
                                    {items.book && items.book.desc ? items.book.desc.slice(0, 50) : 'No Description'}
                                </h1>
                            </div>
                            <div className="w-[17%] md:w-[9%]">
                                <h1>{items.book ? items.book.price : 'N/A'}</h1>
                            </div>
                            <div className="w-[30%] md:w-[16%]">
                                <h1 className="font-semibold">
                                    <button className="hover:scale-105 transition-all duration-300" onClick={() => setOptions(i)}>
                                        {items.status === "Order placed" ? (
                                            <div className="text-yellow-500">{items.status}</div>
                                        ) : items.status === "Cancelled" ? (
                                            <div className="text-red-500">{items.status}</div>
                                        ) : (
                                            <div className="text-green-500">{items.status}</div>
                                        )}
                                    </button>
                                    <div className={`${options === i ? "flex" : "hidden"}`}>
                                        <select name="status" id="" className="bg-gray-800" onChange={change} value={values.status}>
                                            {["Order placed", "Out for delivery", "Delivered", "Cancelled"].map((status, i) => (
                                                <option value={status} key={i}> {status}</option>
                                            ))}
                                        </select>
                                        <button className="text-green-500 hover:text-pink-600 mx-2" onClick={() => {
                                            setOptions(-1);
                                            submitChanges(i);
                                        }}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </h1>
                            </div>
                            <div className="w-[10%] md:w-[5%]">
                                <button className="text-xl hover:text-orange-500" onClick={() => {
                                    setuserDiv("fixed");
                                    setuserDivData(items.user);
                                }}>
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {userDivData && (
                <SeeUserData userDivData={userDivData} userDiv={userDiv} setuserDiv={setuserDiv} />
            )}
        </>
    );
};

export default AllOrders;
