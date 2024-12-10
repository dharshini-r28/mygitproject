
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import { authActions } from './store/auth';
import { useDispatch, useSelector } from 'react-redux';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  const dispatch = useDispatch()
  const role=useSelector((state)=>state.auth.role)
  useEffect(()=>{
    if(localStorage.getItem("id")&& localStorage.getItem("token") && localStorage.getItem("role")){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  },[])
  return (
    <div>
       <Navbar/>
       <Routes><Route exact path='/' element={<Home/>}/>
     <Route path='/all-books' element={<AllBooks/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/updateBook/:id' element={<UpdateBook/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/profile' element={<Profile/>}>
      
      {/* <Route index element={<Favourites/>}/> */}
      {role==='user'?<Route index element={<Favourites/>}/>:<Route index element={<AllOrders/>}/>}
      {role==='admin' && <Route path='/profile/add-book' element={<AddBook/>}/>}
      <Route path='/profile/orderHistory' element={<UserOrderHistory/>}/>
      <Route path='/profile/settings' element={<Settings/>}/>
      </Route>
      <Route path='/SignUp' element={<SignUp/>}/>
      <Route path='/view-book-details/:id' element={<ViewBookDetails/>}/>
      </Routes>
     
        <Footer/>
      
  
   
   
    {/* <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h2>this is home</h2>} />
        <Route path="/books" element={<h2>this is book</h2>} />
        <Route path="/add-book" element={<h2>this is add book</h2>} />
        <Route path="/my-book" element={<h2>this is my book</h2>} />
        <Route path="/my-purchase" element={<h2>this is purchase</h2>} />
        <Route path="/login" element={<h2>this is login</h2>} />
      </Routes>
    </Router> */}
     
    </div>
  );
};

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
// import Home from './pages/Home';
// import Footer from './components/Footer/Footer';
// import AllBooks from './pages/AllBooks';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
// import './App.css'; // Import the CSS file

// const App = () => {
//   return (
//     <div className="app-container flex flex-col min-h-screen">
//       <Router>
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route exact path='/' element={<Home />} />
//             <Route path='/all-books' element={<AllBooks />} />
//             <Route path='/login' element={<Login />} />
//             <Route path='/cart' element={<Cart />} />
//             <Route path='/profile' element={<Profile />} />
//             <Route path='/signup' element={<SignUp />} />
//           </Routes>
//         </main>
//         <Footer />
//       </Router>
//     </div>
//   );
// };

// export default App;
