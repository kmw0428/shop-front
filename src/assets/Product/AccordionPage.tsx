import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: string;
  isActive: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  isActive,
  onClick,
}) => {
  return (
    <div className="accordion-item">
      <div
        className={`accordion-title ${isActive ? "active" : ""}`}
        onClick={onClick}
      >
        {title}
      </div>
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
};

interface AccordionProps {
  items: { title: string; content: string }[]; // 수정: contents 속성을 문자열로 변경
  image: string;
}

const AccordionPage: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onTitleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      <div className="accordion-image">
        <img src="/PA.jpg" alt="Accordion Image" />
      </div>
      <div className="accordion">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isActive={activeIndex === index}
            onClick={() => onTitleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AccordionPage;
