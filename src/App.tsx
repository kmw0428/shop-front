import { Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './Test'
import ProductList from './assets/Product/ProductList'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Test />} />
        <Route path='/products' element={<ProductList />} />
      </Routes>
    </>
  )
} 