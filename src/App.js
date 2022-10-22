import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import SalesRecap from './pages/SalesRecap/SalesRecap';
import HomeAdmin from './pages/HomeAdmin/HomeAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './features/ProductSlice';

function App() {
  const isLoginAdmin = useSelector((state) => state.login.isLoginAdmin)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, []);
  
  return (
    <div className='font-mono'>
      <Navbar/>
      <div className="flex justify-center">
        <Routes>
          <Route path='/' element={isLoginAdmin ? <HomeAdmin/> : <Home/>} />
          <Route path='/sales' element={<ProtectedRoute><SalesRecap/></ProtectedRoute>} />
          <Route path='/product/:id' element={<ProductDetail/>} />
          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
