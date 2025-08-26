import React from 'react'
import AboutParagraphe from './AboutParagraph/AboutParagraphe'

export default function AboutText() {
    let paragraphOne = (`Je m'appelle Anthony Fouda-Many et j’ai toujours été attiré par la création, la logique et le besoin de comprendre comment les choses fonctionnent. Mais ce n’est qu’après une première carrière que j’ai décidé de suivre cette intuition à plein temps : devenir développeur web.`)

    let paragrapheTwo = `J’ai entamé cette reconversion avec une formation complète chez OpenClassrooms, puis j’ai enchaîné avec un Mastère Développeur Web Full Stack chez LiveCampus, pour approfondir mes compétences et me spécialiser dans des technologies modernes comme React, Node.js, MongoDB, Framer Motion, ou encore SCSS.` 

    let paragrapheThree = `Je consacre chaque moment libre à pratiquer, apprendre, améliorer. Avec un emploi du temps chargé (travail, vie de famille, études), je garde une régularité qui m’a permis de développer un vrai projet personnel : éMOTion, une application destinée à une coach en communication. Ce projet me pousse à réfléchir comme un professionnel : architecture, sécurité, gestion d’état, UX, responsive design, animations fluides, etc.`

    let paragrapheFour = `Je cherche aujourd’hui une alternance pour mettre en pratique mes compétences dans un cadre d’équipe, apprendre des développeurs expérimentés, et contribuer à des projets concrets avec sérieux et implication.` 

    let paragrapheFive = `<span classname="gras">Autonome<spans/>, curieux, rigoureux, je suis prêt à m’investir pleinement dans une entreprise qui partage des valeurs de transmission, de qualité et de passion pour le web.`

  return (
    <div>
        <AboutParagraphe
            paragraph={paragraphOne} 
        />
        <AboutParagraphe
            paragraph={paragrapheTwo} 
        />
        <AboutParagraphe
            paragraph={paragrapheThree} 
        />
        <AboutParagraphe
            paragraph={paragrapheFour} 
        />
        <AboutParagraphe
            paragraph={paragrapheFive} 
        />
        
    </div>
  )
}
