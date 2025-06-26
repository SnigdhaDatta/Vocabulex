// import DisplayCard from "./DisplayCard";
export default function Header(props){
    //const {setShowDisplayCard}=props
    return(
        <div className=" flex pl-4 pr-8 pb-5 pt-10">
            <i className="fa-solid fa-2x fa-book hover:scale-90 transition duration-300 cursor-pointer" onClick={()=>window.location.reload()}></i>  
             <i className="fa-regular fa-2x fa-moon  text-3xl hover:scale-90 transition duration-300 cursor-pointer relative left-11/12 pr-10"></i>     
        </div>
    )
}