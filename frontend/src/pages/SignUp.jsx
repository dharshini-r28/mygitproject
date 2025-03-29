// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// // //axios.defaults.baseURL = 'http://localhost:8000';

// // const SignUp = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     address: ''
// //   });
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await axios.post('http://localhost:8000/api/v1/sign-up', formData);
// //       toast.success(res.data.message);
// //       navigate('/');
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || 'Something went wrong');
// //     }
// //   };

// //   return (
// //     <div className='reg'>
// //       <h2>Sign Up</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
// //         <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
// //         <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
// //         <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
// //         <button type="submit">Sign Up</button>
// //         <h4>already have an account <Link to='/login'>login</Link></h4>
// //       </form>
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default SignUp;


// const SignUp = () => {
//   const [Values, setValues] = useState({
//     username: '',
//     email: '',
//     password: '',
//     address: '',
//   });
// const navigate=useNavigate()
//   const change = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...Values, [name]: value });
//   };

//   const submit = async () => {
//     try {
//       if (Values.username === '' || Values.email === '' || Values.password === '' || Values.address === '') {
//         alert('All fields are required');
//       } else {
//         const response=await axios.post("http://localhost:8000/api/v1/sign-up",Values)
//         alert(response.data.message);
//         navigate("/Login")
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="md:h-[60vh] lg:w-full lg:h-[88vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
//       <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-2/6">
//         <p className="text-zinc-200 text-xl">Sign-Up</p>

//         <div>
//           <label htmlFor="username" className="text-zinc-400">Username</label>
//           <input
//             type="text"
//             className="w-full mt-2 bg-zinc-900 p-2 outline-none"
//             placeholder="Username"
//             name="username"
//             required
//             value={Values.username}
//             onChange={change}
//           />
//         </div>

//         <div className="mt-4">
//           <label htmlFor="email" className="text-zinc-400">Email</label>
//           <input
//             type="text"
//             className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//             placeholder="Enter email"
//             name="email"
//             required
//             value={Values.email}
//             onChange={change}
//           />
//         </div>

//         <div className="mt-4">
//           <label htmlFor="password" className="text-zinc-400">Password</label>
//           <input
//             type="password"
//             className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//             placeholder="Enter password"
//             name="password"
//             required
//             value={Values.password}
//             onChange={change}
//           />
//         </div>

//         <div className="mt-4">
//           <label htmlFor="address" className="text-zinc-400">Address</label>
//           <textarea
//             className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
//             placeholder="Enter address"
//             name="address"
//             required
//             value={Values.address}
//             onChange={change}
//           />
//         </div>

//         <div className="mt-4">
//           <button
//             className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
//             onClick={submit}
//           >
//             Sign Up
//           </button>
//         </div>

//         <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">or</p>
//         <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
//           Already have an account? &nbsp;
//           <Link to="/login" className="hover:text-blue-500">
//             <u>Login</u>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  // Handle form submission
  const submit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    try {
      // Ensure all fields are filled
      if (!Values.username || !Values.email || !Values.password || !Values.address) {
        alert("All fields are required");
        return;
      }

      console.log("Submitting:", Values); // Debugging log

      const response = await axios.post("http://localhost:8000/api/v1/sign-up", Values, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="md:h-[60vh] lg:w-full lg:h-[88vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-2/6">
        <p className="text-zinc-200 text-xl">Sign-Up</p>

        <form onSubmit={submit}>
          <div>
            <label htmlFor="username" className="text-zinc-400">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 p-2 outline-none"
              placeholder="Username"
              name="username"
              required
              value={Values.username}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="text-zinc-400">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter email"
              name="email"
              required
              value={Values.email}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter password"
              name="password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400">Address</label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter address"
              name="address"
              required
              value={Values.address}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">or</p>
        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500">
            <u>Login</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

