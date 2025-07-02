export default function SearchBar(props) {
  const { word, setWord, setShowDisplayCard } = props;
  return (
    <div className="relative pl-4 pr-2">
      <input
        type="text"
        value={word}
        onChange={(e) => {
          setWord(e.target.value);
          console.log("new word has been setted");
        }}
        name="word"
        placeholder="Type a Word"
        className="bg-gray-200 w-full h-12 rounded-md p-4 shadow-2xl shadow-purple-500 dark:bg-zinc-900 focus:outline-none"
      />
      <i
        className="fa-solid fa-magnifying-glass 
               text-2xl 
               absolute right-7 top-1/2 
               transform -translate-y-1/2 
               text-gray-600 hover:text-purple-600 
               hover:scale-90 transition duration-300 
               cursor-pointer dark:bg-zinc-900"
        onClick={() => setShowDisplayCard(true)}
      ></i>
    </div>
  );
}
