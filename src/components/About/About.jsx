import ProfilImage from "../../assets/photodeface.png"
import AboutText from "./AboutText/AboutText"
import ProfilPicture from "./ProfilPicture/ProfilPicture"

export default function About({aboutRef}) {
  return (
    <section
        ref={aboutRef}
        id="about"
        className="aboutContainer"
      >
        
        <AboutText />
        <ProfilPicture 
          image={ProfilImage}
          alt="photo de profil Anthony Fouda-Many"
        />
      </section>
  )
}
