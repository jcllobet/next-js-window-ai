import React from 'react';
import styles from '../styles/Home.module.css';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const SubmitButton: React.FC<ButtonProps> = ({ text, type = 'button', onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.textWhite} ${styles.fontBold} ${styles.py2} ${styles.px4} ${styles.btnLarger} ${styles.gradientBackground} ${styles.rounded}`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
