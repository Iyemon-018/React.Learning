import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ApiTokenRegister } from './pages/apiTokenRegister/ApiTokenRegister';

// ルーティングはすべてここに記載する。
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='' element={<ApiTokenRegister />} />
      <Route path='main' element={<App />} />
    </>
  )
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <div className="App" >
    <RouterProvider router={router} />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
