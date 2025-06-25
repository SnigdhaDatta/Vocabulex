import { useEffect, useRef, useState } from "react";
//import { FaSpinner } from 'react-icons/fa'
//import  SearchBar  from "./SearchBar"
export default function DisplayCard(props) {
    const {word, showDisplayCard, setShowDisplayCard}=props;

    const [data,setData]=useState(null)//word data state
    const[loading,setLoading]=useState(false)//loading state

    const audioRef=useRef(null);
    //now we will destructure the properties/data that we fetched from the api

    const phonetics=data?.[0]?.phonetics ?? []; //the double question mark is for checking j if the last value is null then consider an empty array , kind of substitution for OR
    const meanings=data?.[0]?.meanings ?? [];
    const sourceUrls=data?.[0]?.sourceUrls ?? [];
    const synonymsData={}; 
    meanings.forEach(ele => {
        synonymsData[ele.partOfSpeech]=ele.synonyms || []
    });
    const filteredMeanings={}; //jehetu api er bhitor akta array er bhitor akta object ache then  r akta array er bhitor r akta object ache orom kore acces kra problem hbe so for ease will store in another object called filtered meaning
    
    //
    meanings.forEach((obj)=>{
        filteredMeanings[obj.partOfSpeech]=obj.definitions.map((def)=>{
            return{
            definition:def.definition,
            example:def.example || '',
            }
        })
    })

    const phoneticsData={
        text:'',
        audio:'',
    }

    phonetics.forEach((obj)=>{
        //trim is a function that removes whitespaces from a strring and returns it
        //to ekhane check kora hocche je api te jei phoenetic text and ausio ache ota null nki seta we r checking through question mark and jodi erom and jodi exist kore then otake trim kore dekho j or bhitorer string ta "" erm ashche kina, cuz jdi hy then bujhbo epmty string
        //last e check krche j amader object e jdi phonetic audio and text store na kre thki and amader api te exist kre thke ogulo then pgulo k amader object e store koriye dao
        if(!phoneticsData.text && obj.text?.trim()) phoneticsData.text=obj.text //if the object inside real phonetics contain text but we still don't hv the text then store it in our phentics object inside text key
        if(!phoneticsData.audio && obj.audio?.trim()) phoneticsData.audio=obj.audio //same goes for audio as we are doing in text
    })
    // const meaningsarray=Object.entries(filteredMeanings);

    useEffect(
        ()=>{
            if(!showDisplayCard || !localStorage ||!word || loading )return
            //if above condition doesnot satisfy then do the below
            let cache=JSON.parse(localStorage.getItem("dictionary")) || {}; 
            // if(localStorage.getItem("dictionary")){
            //     cache=JSON.parse(localStorage.getItem("dictionary"));
            // }
            //if the above 2 doesnot satisfy then do the next given that we have already
            if(word in cache){
                setData(cache[word]);
                console.log("Found Meaning the word in cache now will fetch the meaning from cache")
                return
            }
            //jodi uporer kichu kaj na kore means amae puro data fetch kore dictionary key banate hobe local storage e tarpor or moddhe store krate hobe
            // so lets use aync function now and play with await
            async function fetchWordMeaning() {
                setLoading(true)
                try {
                    const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}` // word in dollar here represents the word whose meaning we are looking
                    const response=await fetch(url);
                    const fetchedData=await response.json();
                    console.log("Fetched the meaning of the word form API");
                    cache[word]=fetchedData; //jeta pelam seta cache e store korlam
                    //local storage e key er under e data store kora below shown
                    localStorage.setItem("dictionary",JSON.stringify(cache));  //then setting the data that we stored in cache under the dictionary object after stringifying it
                    setData(fetchedData)
                } catch (err) {
                    // console.log(err);         // logs the entire Error object, error is actually an object jetate onek kichu thake and message boleo akta key thake or moddhe message store kore
                    // console.log(err.message); // logs just the error message string
                    console.log(err.message)
                    setData(null);
                }finally{
                    setLoading(false);
                    setShowDisplayCard(false);
                }
            }
            fetchWordMeaning()
        },[showDisplayCard,word]//dependencies
    
    )

    if(data?.title==='No Definitions Found'){
        return(
            <p className="text-2xl text-fuchsia-600 pl-8 pr-8 absolute bottom-1/2">{data?.message} because such a word doesn't exist. So Please type your word carefully</p>
        )
    }
    if(!word){
        return(
            <div className="pl-8 absolute bottom-5/12 text-6xl font-gravitas hover:text-fuchsia-600 hover:scale-90 transition duration-300">
                    <h4 >
                        <span className="bg-gradient-to-r from-gray-600 to-purple-400 bg-clip-text text-transparent">
                            Increase Your Vocab
                        </span>
                        ✨
                    </h4>
                    <h4>
                        <span className="bg-gradient-to-r from-gray-600 to-purple-400 bg-clip-text text-transparent">
                            With Just a Search
                        </span>
                        🔍
                    </h4>
            </div>
        )
    }
    if(loading===true){
        return(
             <div className=" pl-8 text-5xl bottom-full">
                 <h4 className="font-serif">Loading....</h4>
            </div>

         )
    }
    
    return(
        <div className="pl-8">  
            <br />
            <div className="flex">
                <h1 className="text-5xl font-oleo">{data?.[0]?.word?.toLowerCase()}</h1>  {/*word */}
                <button onClick={()=>{(audioRef.current)?audioRef.current.play():undefined}}>
                    <audio ref={audioRef} src={(phoneticsData.audio.trim()!=='')?phoneticsData.audio:undefined}></audio>
                    <i className="fa-solid fa-circle-play text-5xl absolute end-8 text-purple-500 hover:scale-90 transition duration-300 cursor-pointer"></i>
                </button>
            </div>
            <h3 className="text-fuchsia-800">/{phoneticsData.text}/</h3> {/*phonetic */}
            <div>
                {
                    Object.entries(filteredMeanings).map(([partOfSpeech,definitions])=>{
                        const synonym=synonymsData[partOfSpeech] || [];
                        return(
                            <div key={partOfSpeech}>
                                    <br />
                                    <div className="flex items-center gap-4 w-full">
                                        <h4 className="font-bold font-croissant text-2xl">{partOfSpeech}</h4> 
                                        <hr className="flex-grow border-t border-gray-300 pr-8" />
                                    </div>
                                    <br />
                                    <h2 className="text-gray-500 font-gravitas">Meaning</h2>
                                    <br />
                                    {
                                        definitions.map((object,index)=>{
                                            return(
                                                <div key={index}>
                                                    <ul className="list-disc marker:text-purple-400 pl-8">
                                                        <li>{object.definition}</li>
                                                    </ul>
                                                    {
                                                        object.example.length!==0?(
                                                            <div className="-space-y-3">
                                                                <p className="pl-8 text-gray-500">"{object.example}."</p>
                                                                <br />
                                                            </div>
                                                        ):null
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                    <br />
                                    {
                                        synonym.length!==0?(
                                                <div className="flex">
                                                    <h2 className="text-gray-500 font-gravitas pr-4">Synonyms</h2>
                                                    <h2 className="text-purple-600 font-extrabold font-gravitas">{synonym}</h2>
                                                    <br />
                                                </div>
                                            ):null
                                        
                                    }
                            </div>
                        )
                    })
                }
                <br />
                <hr className="border-gray-300"/>
                <br />
                <div className="flex">
                    <h4 className="text-gray-400 pr-4">Source</h4>
                    <a href={sourceUrls} className="hover:text-purple-600" target="POST">
                    Wikipedia
                    <i className="fa-solid fa-arrow-up-right-from-square pl-3 text-gray-600 hover:scale-90 transition duration-300"></i>
                    </a>
                </div>
            </div> 
        </div>        
        
    )
}