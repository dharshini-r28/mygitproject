import Hero from "../components/Home/Hero"
import RecentlyAdded from "../components/Home/RecentlyAdded"
const Home=()=>{
    return(<div className="bg-zinc-900 text-white px-10 py-12"><Hero/>
    <RecentlyAdded/>
    </div>)
}
export default Home