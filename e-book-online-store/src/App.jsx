import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BookProvider } from './contexts/BookContext.jsx';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer.jsx';
import CategoriesPage from './components/Categories/CategoriesPage/CategoriesPage.jsx';


function App() {

  return (
    <>

      <BrowserRouter>
        < AuthProvider >
          <BookProvider>

            <Header />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/categories" element={<CategoriesPage />} />
            </Routes>
            
          </BookProvider>
        </AuthProvider>
      </BrowserRouter>

      <Footer />


    </>
  )
}

export default App
