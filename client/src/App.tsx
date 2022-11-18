import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {_Menu as Menu} from './components'
import {ClientPage, RoomPage, RentPage} from './pages';
import './App.css';

function App() {
  return (
      <Routes>
          <Route path={'/'} element={<Menu />}>
              <Route index element={<RentPage />} />
              <Route path={'/clients'} element={<ClientPage />} />
              <Route path={'/rooms'} element={<RoomPage />} />
              <Route path={'*'} element={<Navigate to="/" replace />} />
          </Route>
      </Routes>
  );
}

export default App;
