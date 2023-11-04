import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';

function App() {

  return (
    <>
   
        <BrowserRouter>
        < AuthProvider >
          <Header />


          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          </AuthProvider>
        </BrowserRouter>
     

    </>
  )
}

export default App
