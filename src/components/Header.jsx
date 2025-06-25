// import DisplayCard from "./DisplayCard";
export default function Header(props){
    //const {setShowDisplayCard}=props
    return(
        <div className=" flex pl-8 pb-5 pt-10">
            <i className="fa-solid fa-2x fa-book hover:scale-90 transition duration-300 cursor-pointer" onClick={()=>window.location.reload()}></i>  
             <i className="res fa-regular fa-moon  text-2xl hover:scale-90 transition duration-300 cursor-pointer"></i>     
        </div>
    )
}