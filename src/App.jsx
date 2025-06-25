import { useState } from "react";
import  Header  from "./components/Header";
import  SearchBar  from "./components/SearchBar";
import  DisplayCard  from "./components/DisplayCard";
import  Footer  from "./components/Footer";
import Theme from "./components/Theme";
function App() {

  const[word,setWord]=useState('')
  const[showDisplayCard,setShowDisplayCard]=useState(false)
  const[theme,setTheme]=useState(false);

  return (
    <>
      <div className="w-full
        md:max-w-2xl
        lg:max-w-3xl
        md:mx-auto           
        lg:mx-auto          
        ">
        <Header></Header>
        <Theme theme={theme} setTheme={setTheme}></Theme>
        <SearchBar word={word} setWord={setWord} setShowDisplayCard={setShowDisplayCard}></SearchBar>
        <DisplayCard word={word} showDisplayCard={showDisplayCard} setShowDisplayCard={setShowDisplayCard}></DisplayCard>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
