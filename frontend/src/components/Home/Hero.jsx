
import stuImage from './stu5.png';
import { Link } from 'react-router-dom';
const Hero=()=>{
    return(
        <><div className="h-[80vh] flex flex-col md:flex-row items-centr justify-center"><div className="w-full mb-12 md:mb-0 lg::w-3/6 flex flex-col items-center lg:items-start justify-center"><h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">The Journey of a Lifelong Reader</h1>
        
       <p className="mt-10 text-xl text-zinc-300 text-center lg:text-left">Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers</p>

       <div className="mt-8"><Link to='/all-books' className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full">Discover Books</Link></div>
        </div><div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center"></div> <img src={stuImage} alt="Book Lover" className="w-[40%] h-[80%] ml-[-30%] md:" />
        </div></>
    )
}
export default Hero