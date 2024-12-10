import { AiOutlineClose } from "react-icons/ai";

const SeeUserData=({userDivData,userDiv,setuserDiv})=>{
    return (<>
    <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80` }></div><div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center` }>

        <div className="bg-white rounded p-4 w[80%] md:w-[50%] lg:w-[40%] text-zinc-800"><div className="flex items-center justify-center justify-between"><h1 className="tetx-2xl font-semibold">
            
            User Information</h1><button onClick={()=>setuserDiv("hidden")}><AiOutlineClose/></button></div><div className="mt-2"><label>Username:<span className="font-semibold">{userDivData.username}</span></label></div>
            
            <div className="mt-4"><label>Email:<span className="font-semibold">{userDivData.email}</span></label></div><div className="mt-4"><label>Address:<span className="font-semibold">{userDivData.address}</span></label></div>

            </div>
    </div>
    </>)
}
export default SeeUserData
// const SeeUserData =()=>{
//     return(<></>)
// }
// export default SeeUserData