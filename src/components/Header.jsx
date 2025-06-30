// import DisplayCard from "./DisplayCard";
export default function Header(props){
    //const {setShowDisplayCard}=props
    return(
        <div className="flex pl-2 pr-8 pb-5 pt-10">
            <i className="fa-solid fa-2x fa-book hover:scale-90 transition duration-300 cursor-pointer" onClick={()=>window.location.reload()}></i>  
             <p className="pl-1.5 pt-1.5 font-mono">Vocabulex</p>
             <i className="fa-regular fa-1.5x fa-moon  text-3xl hover:scale-90 transition duration-300 cursor-pointer relative md:left-10/12 left-8/12 mr-10"></i>   
               
        </div>
    )
}