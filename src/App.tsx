import {Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Teachers from './pages/Teachers/Teachers';
import Favorites from './pages/Favorites/Favorites';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <>
      <Header />      
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </>
  )
}

export default App;