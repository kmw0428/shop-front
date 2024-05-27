import { Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './Test'
import ProductList from './assets/Product/ProductList'
import Diagnosis from './assets/Diagnosis/Diagonsis'
import Result from './assets/Diagnosis/Result'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/diagnosis' element={<Diagnosis />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </>
  )
} 