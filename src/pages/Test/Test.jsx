import { motion, useScroll, useTransform } from "framer-motion";

export default function Test() {
  // const { scrollY } = window.document.;
  // const scale = useTransform(scrollY, [0, 500], [500, 3]); // adapte selon ta page

  window.addEventListener("scroll", () => {
  console.log(window.scrollY); // valeur en pixels du scroll vertical
});


  return (
  
  <>
    <div className="container">
      <div className="hero">
        <img 
          src="src/assets/pictureOfMeBW.jpg" 
          alt="" 
          className="hero-image" 
          style={{
            WebkitMaskSize: "100%"
          }}
        />        
      </div>
    </div>
    <section
      style={{
        width: "100%",
        height: "2000px"
      }}
    >

    </section>
    
  </>
  );
}
