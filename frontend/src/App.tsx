import { Home } from "lucide-react";
import { Routes, Route } from "react-router-dom";
import RedirectPage from "./pages/RedirectPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:shorten' element={<RedirectPage/>}/>
    </Routes>
  )
}

export default App
