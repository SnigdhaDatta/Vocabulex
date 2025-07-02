import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import DisplayCard from './components/DisplayCard'
import Footer from './components/Footer'
function App() {
  const [word, setWord] = useState('')
  const [showDisplayCard, setShowDisplayCard] = useState(false)

  return (
    <>
      <div className="relative h-screen w-full overflow-x-hidden px-4 text-zinc-900 md:mx-auto md:max-w-2xl lg:max-w-3xl dark:text-zinc-100">
        <Header />
        <main className="flex-grow">
          <SearchBar
            word={word}
            setWord={setWord}
            setShowDisplayCard={setShowDisplayCard}
          />
          <DisplayCard
            word={word}
            showDisplayCard={showDisplayCard}
            setShowDisplayCard={setShowDisplayCard}
          />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
