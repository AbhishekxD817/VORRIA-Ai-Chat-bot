import React from 'react'
import { Button } from "./components/ui/button"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      {/* <Header></Header> */}
      <main>
        <Outlet></Outlet>
      </main>
      {/* <Footer></Footer> */}
      <ToastContainer />

    </>
  )
}

export default App