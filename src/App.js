import Home from './pages/home';
import Dashboard from './pages/dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error404 from './pages/Error404';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exactly path="/" element={<Dashboard/>} />
        <Route path="/home" element={<Home/>} />
        <Route  path="/*" element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  )
  
}