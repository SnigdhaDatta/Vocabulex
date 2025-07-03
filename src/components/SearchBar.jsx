export default function SearchBar(props) {
  const { word, setWord, setShowDisplayCard } = props
  return (
    <div className="relative pr-2 pl-4">
      <input
        type="text"
        value={word}
        onChange={(e) => {
          setWord(e.target.value)
          console.log('new word has been setted')
        }}
        name="word"
        placeholder="Type a Word"
        className="h-12 w-full rounded-md bg-zinc-200 p-4 shadow-2xl shadow-purple-500 focus:outline-none dark:bg-zinc-900"
      />
      <i
        className="fa-solid fa-magnifying-glass absolute top-1/2 right-7 -translate-y-1/2 transform cursor-pointer text-2xl text-gray-600 transition duration-300 hover:scale-90 hover:text-purple-600"
        onClick={() => setShowDisplayCard(true)}
      ></i>
    </div>
  )
}
