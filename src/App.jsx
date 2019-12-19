import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { css } from 'linaria';

import calendarService from './services/calendarService';
import favoritesService from './services/favoritesService';
import suggestionsService from './services/suggestionsService';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import PageTransition from './pages/PageTransition';

const appCss = css`
  padding-top: calc(var(--header-height) + 30px);

  .container {
    position: relative;
  }
`;

function App() {
  const [calendar, setCalendar] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const pages = [
    { Component: HomePage, path: '/', props: { calendar, favorites } },
    { Component: CalendarPage, path: '/calendar', props: { calendar, favorites } },
    { Component: FavoritesPage, path: '/favorites', props: { calendar, favorites, updateFavorites }},
  ]

  useEffect(() => {
    setFavorites(favoritesService.getFavorites()), [];
    calendarService.getCalendar()
      .then(data => {
        setCalendar(data);
        suggestionsService.importSuggestions(data);
      })
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
              {
                pages.map(({ path, Component, props }) => (
                  <Route key={path} path={path} exact>
                    {
                      ({ match }) => (
                        <PageTransition isVisible={match !== null}>
                          <Component {...props} />
                        </PageTransition>
                      )
                    }
                  </Route>
                ))
              }
            </div>
          </main>
        }
      </BrowserRouter>
  );
}

export default App;
