import Footer from "./Components/Footer";
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./Pages/Landing";
import Profile from "./Pages/profile";
import Edit from "./Pages/edit";
import About from "./Pages/about";
import FAQ from "./Pages/faq";
import ContactUs from "./Pages/contact";
import ChatApp from "./Pages/chat";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/chat" element={<ChatApp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
