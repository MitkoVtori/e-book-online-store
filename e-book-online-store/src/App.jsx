import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BookProvider } from './contexts/BookContext.jsx';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Footer from './components/Footer/Footer.jsx';
import SellBook from './components/SellBook/SellBook.jsx';
import ADDSellBook from './components/SellBook/ADDSellBook/ADDSellDetails.jsx';
import News from './components/NEWS/News.jsx';
import Cart from './components/Cart/Cart.jsx';
import Contacts from './components/Contacts/Contacts.jsx';
import Catalog from './components/Catalog/Catalog.jsx';
import BookDetails from './components/Book/BookDetails/BookDetails.jsx';
import Profile from './components/Profile/Profile.jsx';
import UpdateProfile from './components/UpdateProfile/UpdateProfile.jsx';

import NotFound from './components/NotFound/NotFound.jsx';

import AuthGuard from './components/GUARDS/AuthGuard.jsx';
import GuestGuard from './components/GUARDS/GuestGuard.jsx';
import ErrorBounding from './components/GUARDS/ErrorBounding.jsx';

import BussinesBook from './components/Categories/CategoriesDropDown/BusinessBook/Business.jsx';
import FamilyBook from './components/Categories/CategoriesDropDown/FamilyBook/Family.jsx';
import RomanBook from './components/Categories/CategoriesDropDown/RomanBook/Roman.jsx';
import ChildrenBook from './components/Categories/CategoriesDropDown/ChildrenBook/ChildrenBook.jsx'
import EnciclopediaBook from './components/Categories/CategoriesDropDown/EnciclopediaBook/EnciclopediaBook.jsx'
import FantasyBook from './components/Categories/CategoriesDropDown/FantasyBook/FantasyBook.jsx'
import PoetryBooks from './components/Categories/CategoriesDropDown/Poetry/Poetry.jsx';
import PsycologyBooks from './components/Categories/CategoriesDropDown/Psycology/Psycology.jsx';
import TeensBooks from './components/Categories/CategoriesDropDown/Teens/Teens.jsx';
import HealthAndBeautyBooks from './components/Categories/CategoriesDropDown/HealthAndBeauty/HealthAndBeauty.jsx';
import TravelBooks from './components/Categories/CategoriesDropDown/Travel/Travel.jsx';
import OtherBooks from './components/Categories/CategoriesDropDown/Other/Other.jsx';
import NewestBooks from './components/Categories/CategoriesDropDown/Newest/Newest.jsx';
import BestSellers from './components/Categories/CategoriesDropDown/BestSellers/BestSellers.jsx'

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

                <Route path="/catalog/newest" element={<NewestBooks/>} />
                <Route path="/catalog/best-sellers" element={<BestSellers/>} />
                <Route path="/catalog/bussines" element={<BussinesBook />} />
                <Route path="/catalog/children" element={<ChildrenBook/>} />
                <Route path="/catalog/family" element={<FamilyBook />} />
                <Route path="/catalog/enciclopedia" element={<EnciclopediaBook />} />
                <Route path="/catalog/fantasy" element={<FantasyBook />} />
                <Route path="/catalog/romans" element={<RomanBook />} />
                <Route path="/catalog/poetry" element={<PoetryBooks/>} />
                <Route path="/catalog/psycology" element={<PsycologyBooks/>} />
                <Route path="/catalog/teens" element={<TeensBooks/>} />
                <Route path="/catalog/health-and-beauty" element={<HealthAndBeautyBooks/>} />
                <Route path="/catalog/travel" element={<TravelBooks/>} />
                <Route path="/catalog/other" element= {<OtherBooks/>} />

                <Route element={<AuthGuard />}>
                  <Route path="/sell" element={<SellBook />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/update" element={<UpdateProfile />} />
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
