import { useRef } from "react";
import HomeSection from "../../components/HomeSection/HomeSection";
import About from "../../components/About/About";

/**
 * Page d'accueil contenant la section principale et la section "À propos".
 *
 * @returns {JSX.Element}
 */
const Home = () => {
  const aboutRef = useRef(null);
  const heroRef = useRef(null)

  // /**
  //  * Fait défiler la section Hero jusqu'à la section "About"
  //  */
  // const scrollToAbout = () => {
  //   aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // /**
  //  * Fait défiler la section Hero jusqu'à la section "Home"
  //  */
  // const scrollToHero = () => {
  //  heroRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <main>  
        <HomeSection 
          // scrollToAbout={scrollToAbout} 
          // scrollToHero={scrollToHero}
          // heroRef={heroRef}
        />

        <About 
          // aboutRef={aboutRef} 
        />
    </main>
  );
};

export default Home;
