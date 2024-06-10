"use client";

import { useState, FC } from 'react';
import styles from './accordion.module.scss';
import { AccordionItemProps, AccordionProps } from './accordion.types';

const AccordionItem: FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionButton} onClick={toggleAccordion}>
        {title}
      </button>
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

const Accordion: FC<AccordionProps> = ({ items }) => {
  return (
    <div className={styles.accordion}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
