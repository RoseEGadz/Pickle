import { Routes, Route } from 'react-router';
import Main from './home.jsx'
import './App.css'

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
      <Footer />
    </>
  )
}

function Header() {
  return (
    <header>
      <h2>The Pickle</h2>
      <img className="icon" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxI-Z3m9VB4BGkOHCGiEhMEC9ihIkNIhX1bw&s"/>
    </header>
  )
}

function Footer(){
  return (<p className="foot">Eliza Rose TM 2025</p>)
}

export default App
