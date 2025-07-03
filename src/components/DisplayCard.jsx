import { useEffect, useRef, useState } from 'react'
import { BeatLoader } from 'react-spinners'
//import { FaSpinner } from 'react-icons/fa'
//import  SearchBar  from "./SearchBar"
export default function DisplayCard(props) {
  const { word, showDisplayCard, setShowDisplayCard } = props

  const [data, setData] = useState(null) //word data state
  const [loading, setLoading] = useState(false) //loading state

  const audioRef = useRef(null)
  //now we will destructure the properties/data that we fetched from the api

  const phonetics = data?.[0]?.phonetics ?? [] //the double question mark is for checking j if the last value is null then consider an empty array , kind of substitution for OR
  const meanings = data?.[0]?.meanings ?? []
  const sourceUrls = data?.[0]?.sourceUrls ?? []
  const synonymsData = {}
  meanings.forEach((ele) => {
    synonymsData[ele.partOfSpeech] = ele.synonyms || []
  })
  const filteredMeanings = {} //jehetu api er bhitor akta array er bhitor akta object ache then  r akta array er bhitor r akta object ache orom kore acces kra problem hbe so for ease will store in another object called filtered meaning

  //
  meanings.forEach((obj) => {
    filteredMeanings[obj.partOfSpeech] = obj.definitions.map((def) => {
      return {
        definition: def.definition,
        example: def.example || '',
      }
    })
  })

  const phoneticsData = {
    text: '',
    audio: '',
  }

  phonetics.forEach((obj) => {
    //trim is a function that removes whitespaces from a strring and returns it
    //to ekhane check kora hocche je api te jei phoenetic text and ausio ache ota null nki seta we r checking through question mark and jodi erom and jodi exist kore then otake trim kore dekho j or bhitorer string ta "" erm ashche kina, cuz jdi hy then bujhbo epmty string
    //last e check krche j amader object e jdi phonetic audio and text store na kre thki and amader api te exist kre thke ogulo then pgulo k amader object e store koriye dao
    if (!phoneticsData.text && obj.text?.trim()) phoneticsData.text = obj.text //if the object inside real phonetics contain text but we still don't hv the text then store it in our phentics object inside text key
    if (!phoneticsData.audio && obj.audio?.trim())
      phoneticsData.audio = obj.audio //same goes for audio as we are doing in text
  })
  // const meaningsarray=Object.entries(filteredMeanings);

  useEffect(
    () => {
      if (!showDisplayCard || !localStorage || !word || loading) return
      //if above condition doesnot satisfy then do the below
      let cache = JSON.parse(localStorage.getItem('dictionary')) || {}
      // if(localStorage.getItem("dictionary")){
      //     cache=JSON.parse(localStorage.getItem("dictionary"));
      // }
      //if the above 2 doesnot satisfy then do the next given that we have already
      if (word in cache) {
        setData(cache[word])
        console.log(
          'Found Meaning the word in cache now will fetch the meaning from cache',
        )
        return
      }
      //jodi uporer kichu kaj na kore means amae puro data fetch kore dictionary key banate hobe local storage e tarpor or moddhe store krate hobe
      // so lets use aync function now and play with await
      async function fetchWordMeaning() {
        setLoading(true)
        try {
          const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}` // word in dollar here represents the word whose meaning we are looking
          const response = await fetch(url)
          const fetchedData = await response.json()
          console.log('Fetched the meaning of the word form API')
          cache[word] = fetchedData //jeta pelam seta cache e store korlam
          //local storage e key er under e data store kora below shown
          localStorage.setItem('dictionary', JSON.stringify(cache)) //then setting the data that we stored in cache under the dictionary object after stringifying it
          setData(fetchedData)
        } catch (err) {
          // console.log(err);         // logs the entire Error object, error is actually an object jetate onek kichu thake and message boleo akta key thake or moddhe message store kore
          // console.log(err.message); // logs just the error message string
          console.log(err.message)
          setData(null)
        } finally {
          setLoading(false)
          setShowDisplayCard(false)
        }
      }
      fetchWordMeaning()
    },
    [showDisplayCard, word], //dependencies
  )

  if (data?.title === 'No Definitions Found') {
    return (
      <div className="bg-center">
        <br />
        <br />
        <p className="pr-8 pl-8 text-2xl text-fuchsia-600">
          {data?.message} because such a word doesn't exist. So Please type your
          word carefully
        </p>
      </div>
    )
  }
  if (!data) {
    return (
      <div className="font-oleo flex min-h-[70vh] flex-col items-center justify-center text-center text-6xl leading-snug transition duration-300 hover:scale-90">
        <h4>
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

  // loading spinner
  if (loading) {
    return (
      <div className="mt-16 text-center">
        <BeatLoader color="#6B46C1" size={20} />
      </div>
    )
  }

  return (
    <div className="pr-4 pl-4">
      <br />
      <br />
      <div className="flex">
        <h1 className="font-oleo text-5xl">{data?.[0]?.word?.toLowerCase()}</h1>{' '}
        {/*word */}
        <button
          onClick={() => {
            audioRef.current ? audioRef.current.play() : undefined
          }}
          className="absolute right-4 z-10"
        >
          <audio
            ref={audioRef}
            src={
              phoneticsData.audio.trim() !== ''
                ? phoneticsData.audio
                : undefined
            }
          ></audio>
          <i className="fa-solid fa-circle-play cursor-pointer text-5xl text-purple-500 transition duration-300 hover:scale-90"></i>
        </button>
      </div>
      <h3 className="text-fuchsia-800 dark:text-fuchsia-500">
        {phoneticsData.text}
      </h3>{' '}
      {/*phonetic */}
      <div>
        {Object.entries(filteredMeanings).map(([partOfSpeech, definitions]) => {
          const synonym = synonymsData[partOfSpeech] || []
          return (
            <div key={partOfSpeech}>
              <br />
              <div className="flex w-full items-center gap-4">
                <h4 className="font-croissant text-2xl font-bold">
                  {partOfSpeech}
                </h4>
                <hr className="flex-grow border-t border-gray-300 pr-8" />
              </div>
              <br />
              <h2 className="font-gravitas text-gray-500">Meaning</h2>
              <br />
              {definitions.map((object, index) => {
                return (
                  <div key={index}>
                    <ul className="list-disc pl-8 marker:text-purple-400">
                      <li>{object.definition}</li>
                    </ul>
                    {object.example.length !== 0 ? (
                      <div className="-space-y-3">
                        <p className="pl-8 text-gray-500">
                          "{object.example}."
                        </p>
                        <br />
                      </div>
                    ) : null}
                  </div>
                )
              })}
              <br />
              {synonym.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-gravitas snigdha mb-3 tracking-wide dark:text-zinc-300">
                    Synonyms
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {synonym.map((syn, idx) => (
                      <li
                        key={idx}
                        className="rounded-full bg-purple-100 px-6 py-3 text-[18px] font-medium tracking-wide text-purple-600 dark:bg-purple-300 dark:text-purple-700"
                      >
                        {syn}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
        <br />
        <hr className="border-gray-300" />
        <br />
        <div className="flex">
          <h4 className="pr-4 pl-2 text-gray-400">Source</h4>
          <a href={sourceUrls} className="hover:text-purple-600" target="POST">
            Wikipedia
            <i className="fa-solid fa-arrow-up-right-from-square pl-3 text-gray-600 transition duration-300 hover:scale-90"></i>
          </a>
        </div>
      </div>
    </div>
  )
}
