import { useState, useEffect } from 'react'

export default function ChangeTheme() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const currentTheme = savedTheme || 'light'
    setTheme(currentTheme)

    if (currentTheme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [])

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer transition duration-200"
    >
      {/* replaced icons from remix icons */}
      {theme === 'dark' ? (
        <i className="fas fa-sun text-[18px] hover:text-purple-500"></i>
      ) : (
        <i className="fas fa-moon text-[18px] hover:text-purple-500"></i>
      )}
    </button>
  )
}
