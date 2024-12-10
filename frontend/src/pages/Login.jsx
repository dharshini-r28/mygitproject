// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';
// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('Form Data:', formData);
//       const res = await axios.post('http://localhost:8000/api/v1/sign-in', formData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('Response:', res); 
//       toast.success("Login successful");
//       localStorage.setItem('token', res.data.token);
//       navigate('/');
//     } catch (error) {
//       console.error('Error:', error.response?.data);
//       toast.error(error.response?.data?.message || 'Something went wrong');
//     }
//   };

//   return (
//     <div className='reg'>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Username:</label>
//         <input
//           type="text"
//           name="username"
//           value={formData.username}
//           onChange={handleChange}
//           placeholder="Username"
//           required
//         />
//         <label>password</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Password"
//           required
//         />
//         <br/>
//         <button type="submit">Login</button>
//         <h4>Don't have an account <Link to="/signup">signup</Link></h4>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Login;
import { Link } from 'react-router-dom';
import axios from 'axios';
 import { useNavigate } from 'react-router-dom';
 import { useState } from 'react';
 import { authActions } from '../store/auth';
 import { useDispatch } from'react-redux';
const Login = () => {
  const [Values, setValues] = useState({
    
    email: '',
    password: '',
   
  });
const navigate=useNavigate()

  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.email === '' || Values.password === '' ) {
        alert('All fields are required');
      } else {
        const response=await axios.post("http://localhost:8000/api/v1/sign-in",Values)
        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
       // console.log(response.data);
       localStorage.setItem("id",response.data.id);
       localStorage.setItem("token",response.data.token)
       localStorage.setItem("role",response.data.role)
        navigate("/")
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="md:h-[60vh] lg:w-full lg:h-[88vh] bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>

        <div className="mt-4">
          <label htmlFor="email" className="text-zinc-400">Email</label>
          <input
            type="text"
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
          <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300" onClick={submit}>
            Login
          </button>
        </div>

        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
          or</p>
          <p className='flex mt-4 items-center justify-center text-zinc-500 font-semibold'>
          Don't have an account? &nbsp; 
          <Link to="/signup" className="hover:text-blue-500">
            <u>Sign-Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
