import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { useState } from 'react';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import Test from './pages/Test/Test';
import FlipCounter from './components/FilpLoader/FlipCounter';
import ButtonAnimated from './components/Button/ButtonAnimated';
import { div } from 'framer-motion/client';
import CustomCursor from './components/Cursor/CustomCursor/CustomCursor';
import LightCursor from './components/Cursor/LightCursor/LightCursor';

function AnimatedRoutes() {
  const location = useLocation();

  return (  
  
    <AnimatePresence mode="wait">
      
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Projects />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Contact />
            </motion.div>
          }
        />      
        <Route
          path="/test"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <Test />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div>404 Error</div>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {

  const [ loadingFinish, setLoadingFinish ] = useState(false);
  const toto = document.location

  return ( <>  
    {
     
      !loadingFinish && toto.pathname === "/" ? (
        <>
          <CustomCursor />
          <FlipCounter 
            onFinish={(() => setLoadingFinish(true))}
            speed={100}
            animationDuration={100}
            step='3'/>
        </>
      ) 
      : 
      
      (
        <BrowserRouter>      
          <CustomCursor />
          <AnimatedRoutes />
        </BrowserRouter>
      )
    }  
  </>
    
  );
}

export default App;
