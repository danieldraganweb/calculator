import React from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', disabled = false, className, value }) => (
    <button
        className={`${styles.button} ${className || ''}`}
        onClick={() => onClick(value)}
        type={type}
        disabled={disabled}
    >
        {children}
    </button>
);

export default Button;
