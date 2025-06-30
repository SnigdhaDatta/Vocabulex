// import DisplayCard from "./DisplayCard";
export default function Header() {
  return (
    <div className="relative flex items-center justify-start pl-2 pr-8 pt-10 pb-5">
      {/* Book icon */}
      <i
        className="fa-solid fa-2x fa-book hover:scale-90 transition duration-300 cursor-pointer"
        onClick={() => window.location.reload()}
      ></i>

      {/* Title */}
      <p className="pl-2 font-mono text-xl">Vocabulex</p>

      {/* Moon icon */}
      <i
        className="fa-regular fa-moon 
        text-3xl 
        hover:scale-90 transition duration-300 
        cursor-pointer 
        absolute right-7 
        top-6 md:top-8 lg:top-10"
      ></i>
    </div>
  );
}
