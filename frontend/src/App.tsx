import { Routes, Route } from "react-router-dom";
import RedirectPage from "./pages/RedirectPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StatsPage from "./pages/StatsPage";
import HealthPage from "./pages/HealthPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/:shorten' element={<RedirectPage/>}/>
      <Route path='/code/:shorten' element={<StatsPage/>}/>
      <Route path='/healthz' element={<HealthPage/>}/>
    </Routes>
  )
}

export default App
