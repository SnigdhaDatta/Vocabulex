export default function SearchBar(props) {
    const {word , setWord , setShowDisplayCard}=props
    return(
        <div className="pl-8">
            <input
            type="text" 
            value={word}
            onChange={(e)=>{setWord(e.target.value)
                console.log("new word has been setted")
                }
            }
            name="word"
            placeholder="Type a Word" 
            className="bg-gray-200 md:w-1/2 w-3/4 h-12 rounded-md p-4 shadow-2xl shadow-purple-400 hover:scale-90 transition duration-300"
            />
            <i className="fa-solid fa-magnifying-glass text-2xl hover:text-fuchsia-600 hover:scale-90 transition duration-300 cursor-pointer pl-2.5" onClick={()=>setShowDisplayCard(true)}></i>
        </div>
        
    )
    
}