import React from "react";
import "./App.css";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customer from './pages/Customer';
import Order from './pages/Order';
import Resourcehub from "./pages/Resourcehub";
import Salestraining from "./pages/Salestraining";
import Competitor from "./pages/Competitor";
import Messages from "./pages/Messages";
import Sharedfiles from "./pages/Sharedfiles";
import Salesscript from "./pages/Salesscript";
import Mailwizz from "./pages/Mailwizz";

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/Customer' element={<Customer />}/>
        <Route path='/Order' element={<Order />}/>
        <Route path='/Resourcehub' element={<Resourcehub />}/>
        <Route path='/Salestraining' element={<Salestraining />}/>
        <Route path='/Competitor' element={<Competitor />}/>
        <Route path='/Messages' element={<Messages />}/>
        <Route path='/Sharedfiles' element={<Sharedfiles />}/>
        <Route path='/Salesscript' element={<Salesscript />}/>
        <Route path='/Mailwizz' element={<Mailwizz />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
