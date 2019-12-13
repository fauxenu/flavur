import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { css } from 'linaria';

import calendarService from './services/calendarService';
import favoritesService from './services/favoritesService';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

const appCss = css`
  padding-top: calc(var(--header-height) + 30px);
`;

function App() {
  const [calendar, setCalendar] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFavorites(favoritesService.getFavorites()), [];
    calendarService.getCalendar()
      .then(data => setCalendar(data))
      .finally(() => setLoading(false));
  }, []);

  function updateFavorites(newFavorites) {
    favoritesService.setFavorites(newFavorites);
    setFavorites(newFavorites);
  }

  return (
      <BrowserRouter>
        { loading &&
          <Spinner />
        }
        { !loading &&
          <main className={appCss}>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/calendar" exact>
                  <CalendarPage calendar={calendar} favorites={favorites} />
                </Route>
                <Route path="/favorites" exact>
                  <FavoritesPage
                    calendar={calendar}
                    favorites={favorites}
                    updateFavorites={updateFavorites}
                  />
                </Route>
                <Route path="/" exact>
                  <HomePage calendar={calendar} favorites={favorites}  />
                </Route>
              </Switch>
            </div>
          </main>
        }
      </BrowserRouter>
  );
}

export default App;
