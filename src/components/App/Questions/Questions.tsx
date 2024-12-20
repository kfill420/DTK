import './Questions.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import React, { useState, useRef, useEffect, MutableRefObject } from 'react';

interface QuestionProps {
  title: string;
  content: string[];
}

const Question: React.FC<QuestionProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
      } else {
        contentRef.current.style.maxHeight = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className="questions_list_item">
      <div className="questions_list_item_title" onClick={toggle}>
        <span className="questions_list_item_title_text">{title}</span>
        <div className={`questions_list_item_title_icon ${isOpen ? 'questions_list_item_title_icon_open' : ''}`}>
          {isOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
        </div>
      </div>
      <div ref={contentRef} className={`questions_list_item_text ${isOpen ? 'open' : ''}`}>
        {content.map((text, idx) => (
          <span key={idx} className="questions_list_item_text_item">{text}</span>
        ))}
      </div>
    </div>
  );
};

const Questions: React.FC = () => {
  const questions = [
    {
      title: 'Quelle est la distinction entre les niveaux « imparfait », « correct »,  « très bon » et « parfait » ?',
      content: [
        'Imparfait : Pour ceux qui se contentent du nécessaire',
        'UN DEFAUT PARMIS :',
        '-FACE ID',
        '-TOUCH ID',
        '-INDUCTION',
        '-USURE PRONONCER',
        'Correct : Pour ceux qui veulent une bonne affaire.',
        'Quelque trace d’usure visible.',
        'Très bon : Pour ceux qui veulent une très bonne affaire.',
        'Peu de trace d’usure.',
        'Parfait : Aucun signe d’usure, état impeccable.',
        'Idéal pour cadeau, performances optimales. Expérience premium assurée !'
      ]
    },
    {
      title: "Quelle est la différence entre le reconditionné et l'occasion ?",
      content: [
        "Reconditionné : Un téléphone reconditionné a été inspecté, réparé et remis à neuf par un professionnel pour s'assurer qu'il fonctionne comme un appareil neuf. Il peut inclure une nouvelle batterie, des pièces de rechange et souvent vient avec une garantie. Les téléphones reconditionnés sont soumis à des tests rigoureux de qualité et de performance.",
        "Occasion : Un téléphone d'occasion est un appareil qui a été utilisé précédemment et est vendu dans son état actuel, sans nécessairement passer par un processus de remise à neuf. L'avantage de l'occasion est que l'appareil n'a pas été démonté ni réparé, ce qui signifie qu'il n'a pas subi de réparations potentielles qui pourraient poser des problèmes à l'avenir. Cependant, il peut présenter des signes d'usure. L'état des téléphones d'occasion peut varier largement, de bien entretenu à usé."
      ]
    },
    {
      title: 'Quels sont les éléments couverts par la garantie ?',
      content: [
        "La garantie prend en charge toutes les pannes et dysfonctionnements du téléphone à l'exception des dommages causés par une casse ou une oxydation (par exemple, si le téléphone est tombé dans l'eau). Cela signifie que tout problème technique ou défaillance de l'appareil sera couvert, mais les dommages résultant d'un usage inapproprié ou d'accidents ne seront pas pris en charge."
      ]
    }
  ];

  return (
    <div className="questions">
      <span className="questions_intro">Vous hésitez toujours ?</span>
      <h3 className="questions_title">Vos questions fréquentes chez DTK</h3>
      <span className="questions_description">
        Si vous avez d'autres questions après avoir consulté les réponses ci-dessous, n'hésitez pas à nous contacter via WhatsApp, disponible en bas de la page.
      </span>
      <div className="questions_list">
        {questions.map((q, index) => (
          <Question key={index} title={q.title} content={q.content} />
        ))}
      </div>
      <div className="customer_service">
        <span className="customer_service_hourly">Notre service client est disponible du lundi au dimanche, de 8h à 19h.</span>
        <span className="customer_service_delay">Temps moyen de réponse : 24 heures</span>
        <button className="customer_service_button">Découvrez nos produits</button>
      </div >
    </div>
  );
};

export default Questions;
