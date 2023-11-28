import React from 'react';
import '../button/styles.css';

const Button = ({ onClick }) => {
  return (
    <button name='remover' onClick={onClick}>Remover</button>
  );
}

export { Button };
