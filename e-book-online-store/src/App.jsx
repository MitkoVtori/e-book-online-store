import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Navigation from './components/Navigation/Navigation';

function App() {

  return (
    <>

      <h1>e-book-online-store</h1>

      <BrowserRouter>

        <Navigation />

        <main>
          <Routes>
            <Route path="/" element={<h1>Home Page Test</h1>} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

      </BrowserRouter>

    </>
  )
}

export default App
