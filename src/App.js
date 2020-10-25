import React, { Suspense } from 'react';
import {CookiesProvider} from "react-cookie"
import UserContextProvider from './contexts/userContext';
import GamesContextProvider from './contexts/gamesContext';
import ModalContextProvider from './contexts/modalContext';
import SpinningLoader from './components/Reusable/Loaders/spinningLoader';
import Page from './components/Constants/page';

function App() {
  return (
      <Suspense fallback={<div className="suspenseLoader"><SpinningLoader animation="border" variant="primary" /></div>}>
        <div className="App">
          <CookiesProvider>
          <ModalContextProvider>
          <UserContextProvider>
          <GamesContextProvider>
            <Page/>
          </GamesContextProvider>
          </UserContextProvider>
          </ModalContextProvider>
          </CookiesProvider>
        </div>
      </Suspense>
  );
}

export default App;
