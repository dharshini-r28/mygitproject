import { FaGripLines } from "react-icons/fa6";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bookImage from './book.jpg';
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", links: "/" },
    { title: "All Books", links: "/all-books" },
    { title: "Cart", links: "/cart" },
    { title: "Profile", links: "/profile" },
    { title: "Admin Profile", links: "/profile" },
  ];
   const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
   const role=useSelector((state)=>state.auth.role);
  // console.log(isLoggedIn)
  if(isLoggedIn===false){
    links.splice(2,3)
  }
  if(isLoggedIn==true && role=='user'){
    links.splice(4,1)
  }
  if(isLoggedIn==true && role=='admin'){
    links.splice(2,2)
  }
  const [MobileNav, setMobileNav] = useState(false);

  const toggleMobileNav = () => {
    setMobileNav(!MobileNav);
  };

  return (
    <>
      <nav className='z-50 relative flex bg-zinc-800 text-white px-4 py-2 items-center justify-between'>
        <Link to='/' className='flex items-center'>
          <img src={bookImage} alt="Book" className='h-8 w-8 mr-2' />
          <h1 className='text-2xl font-semibold'>Bookstore</h1>
        </Link>
        {/* <div className='nav-links-bookstore block md:flex items-center gap-4'> */}
        <div className='block md:flex items-center gap-4'>
          <div className='hidden md:flex gap-4'>
            {links.map((item, i) => (
             <div className="flex items.center">{item.title==='Profile'|| item.title==='Admin Profile'?<Link
              to={item.links}
              className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              key={i}
            >
              {item.title}
            </Link>: <Link
                to={item.links}
                className="hover:text-blue-500 transition-all duration-300"
                key={i}
              >
                {item.title}{" "}
              </Link>}</div>
            ))}
          </div>
         {isLoggedIn===false &&( <div className='hidden md:flex gap-4'>
            <Link
              to='/Login'
              className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              LogIn
            </Link>
            <Link
              to='/SignUp'
              className='px-4 py-1 bg-blue-500 rounded mx-3 hover:bg-white hover:text-zinc-800 transition-all duration-300'
            >
              SignUp
            </Link>
          </div>)}
          <button
            className='text-white text-2xl hover:text-zinc-400 md:hidden'
            onClick={toggleMobileNav}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>
      <div
        className={`${
          MobileNav ? 'block' : 'hidden'
        } bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center md:hidden`}
      >
        {links.map((item, i) => (
          <Link
            to={item.links}
            className='text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300'
            key={i}
            onClick={toggleMobileNav}
          >
            {item.title}
          </Link>
        ))}
        {isLoggedIn===false &&(<><Link
          to='/Login'
          className='px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
          onClick={toggleMobileNav}
        >
          LogIn
        </Link>
        <Link
          to='/SignUp'
          className='px-8 py-1 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded mx-3 hover:bg-white hover:text-zinc-800 transition-all duration-300'
          onClick={toggleMobileNav}
        >
          SignUp
        </Link></>)}
      </div>
    </>
  );
};

export default Navbar;
