import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./component/Portfolio.jsx"
import Blogs from "./pages/Blogs.jsx"
import BlogContent from './pages/BlogContent.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogContent />} />
      </Routes>
    </>
  )
}

export default App
