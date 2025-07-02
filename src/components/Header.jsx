import ChangeTheme from "./ChangeTheme";

// import DisplayCard from "./DisplayCard";
export default function Header(props) {
  //const {setShowDisplayCard}=props
  return (
    <div className="mt-7 mb-5 flex items-center justify-between px-5">
      <div className="flex items-center gap-1">
        <i
          className="fa-solid fa-2x fa-book cursor-pointer transition duration-300 hover:scale-90"
          onClick={() => window.location.reload()}
        />
        <p className="pt-1.5 pl-1.5 font-mono">Vocabulex</p>
      </div>
      <ChangeTheme />
    </div>
  )
}
