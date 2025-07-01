
export default function About({aboutRef}) {
  return (
    <section
        ref={aboutRef}
        id="about"
        className="aboutContainer"
      >
        <h1 style={{ fontSize: "4rem", color: "#fff" }}>À propos</h1>
      </section>
  )
}
