import { Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './Test'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Test />} />
      </Routes>
    </>
  )
} 