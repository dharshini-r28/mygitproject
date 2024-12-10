import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const Settings = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: ''
    });

    const userId = localStorage.getItem('id');
    const headers = {
        id: userId,
        authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    useEffect(() => {
       
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/get-use-information`, { headers });
                setUserData({
                    name: response.data.username,
                    email: response.data.email,
                    address: response.data.address,
                   
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Failed to fetch user data.');
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
           const response=await axios.put(
                'http://localhost:8000/api/v1/update-address',
                { address: userData.address },
                { headers }
            );
           // toast.success('Address updated successfully!');
            alert(response.data.message)
        } catch (error) {
            console.error('Error updating address:', error);
            toast.error('Failed to update address.');
           alert(error)
        }
    };

    return (
        <div className="p-4 bg-zinc-900 rounded-md text-zinc-100 w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
            <div className="mb-4">
                <label className="block text-zinc-400 mb-2">Name</label>
                <p className="text-xl text-zinc-200">{userData.name || 'Loading...'}</p>
            </div>
            <div className="mb-4">
                <label className="block text-zinc-400 mb-2">Email</label>
                <p className="text-xl text-zinc-200">{userData.email || 'Loading...'}</p>
            </div>
            <div className="mb-4">
                <label className="block text-zinc-400 mb-2">Address</label>
                <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    className="w-full p-2 bg-zinc-800 text-zinc-200 rounded outline-none"
                />
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
                onClick={handleUpdate}
            >
                Update
            </button>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default Settings;
