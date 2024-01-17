import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BookProvider } from "./contexts/BookContext.jsx";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import Footer from "./components/Footer/Footer.jsx";
import SellBook from "./components/SellBook/SellBook.jsx";
import ADDSellBook from "./components/SellBook/ADDSellBook/ADDSellDetails.jsx";
import News from "./components/NEWS/News.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Contacts from "./components/Contacts/Contacts.jsx";
import Catalog from "./components/Catalog/Catalog.jsx";
import BookDetails from "./components/Book/BookDetails/BookDetails.jsx";
import Profile from "./components/Profile/Profile.jsx";

import NotFound from "./components/NotFound/NotFound.jsx";

import AuthGuard from "./components/GUARDS/AuthGuard.jsx";
import GuestGuard from "./components/GUARDS/GuestGuard.jsx";
import ErrorBounding from "./components/GUARDS/ErrorBounding.jsx";



import BussinesBook from "./components/Categories/CategoriesDropDown/BusinessBook/Business.jsx"

function App() {
  return (
    <>
      <ErrorBounding>
        <BrowserRouter>
          <AuthProvider>
            <BookProvider>
              <Header />

              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/catalog" element={<Catalog />} />
                <Route path="/catalog/:bookId" element={<BookDetails />} />
                
                <Route path="/news" element={<News />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contacts" element={<Contacts />} />
                
                <Route path="/selling" element={<ADDSellBook />} />
               
                <Route path="/catalog/bussines" element={<BussinesBook />} />

                <Route element={<AuthGuard />}>
                 
                <Route path="/sell" element={<SellBook />} />
                <Route path="/profile" element={<Profile />} />
                
                </Route>

                <Route element={<GuestGuard />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                </Route>

                <Route path="*" element={<NotFound />}></Route>
              </Routes>
            </BookProvider>
          </AuthProvider>
        </BrowserRouter>

        <Footer />
      </ErrorBounding>
    </>
  );
}

export default App;
