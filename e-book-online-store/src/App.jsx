import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BookProvider } from './contexts/BookContext.jsx';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer.jsx';
import SellBook from './components/SellBook/SellBook.jsx';
import News from './components/NEWS/News.jsx';
import Cart from './components/Cart/Cart.jsx'
import Contacts from './components/Contacts/Contacts.jsx';
import Catalog from './components/Catalog/Catalog.jsx';
import BookDetails from './components/Book/BookDetails/BookDetails.jsx';
import Profile from './components/Profile/Profile.jsx';

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
              <Route path="/profile" element={<Profile />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:bookId" element={<BookDetails />} />
              <Route path="/sell" element={<SellBook />} />
              <Route path="/news" element={<News />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contacts" element={<Contacts />} />
              
            </Routes>
            
          </BookProvider>
        </AuthProvider>
      </BrowserRouter>

      <Footer />


    </>
  )
}

export default App
