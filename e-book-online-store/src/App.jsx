import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header';

function App() {

  return (
    <>
      <BrowserRouter>

        <Header />


        <Routes>
          <Route path="/" element={<h1>Home Page Test</h1>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
