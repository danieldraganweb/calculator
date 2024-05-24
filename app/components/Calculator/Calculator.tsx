"use client";
import React, { useReducer } from "react";
import styles from "./Calculator.module.scss";
import Button from "../Button/Button";

const initialState = {
    currentOperand: '',
    previousOperand: null as string | null,
    operation: null as string | null,
};

type Action =
    | { type: 'ADD_DIGIT'; payload: string }
    | { type: 'CHOOSE_OPERATION'; payload: string }
    | { type: 'CLEAR' }
    | { type: 'DELETE_DIGIT' }
    | { type: 'EVALUATE' };

const reducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case 'ADD_DIGIT':
            if (action.payload === '.' && state.currentOperand.includes('.')) {
                return state;
            }
            return {
                ...state,
                currentOperand: state.currentOperand + action.payload,
            };
        case 'CHOOSE_OPERATION':
            if (state.currentOperand === '') return state;
            if (state.previousOperand !== null) {
                return {
                    ...state,
                    previousOperand: eval(`${state.previousOperand} ${state.operation} ${state.currentOperand}`).toString(),
                    currentOperand: '',
                    operation: action.payload,
                };
            }
            return {
                ...state,
                operation: action.payload,
                previousOperand: state.currentOperand,
                currentOperand: '',
            };
        case 'CLEAR':
            return initialState;
        case 'DELETE_DIGIT':
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            };
        case 'EVALUATE':
            if (state.previousOperand === null || state.currentOperand === '' || state.operation === null) {
                return state;
            }
            return {
                ...state,
                previousOperand: null,
                operation: null,
                currentOperand: eval(`${state.previousOperand} ${state.operation} ${state.currentOperand}`).toString(),
            };
        default:
            return state;
    }
};

const Calculator: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleButtonClick = (value: string) => {
        if (value === 'AC') {
            dispatch({ type: 'CLEAR' });
        } else if (value === 'DEL') {
            dispatch({ type: 'DELETE_DIGIT' });
        } else if (['+', '-', '*', '/'].includes(value)) {
            dispatch({ type: 'CHOOSE_OPERATION', payload: value });
        } else if (value === '=') {
            dispatch({ type: 'EVALUATE' });
        } else {
            dispatch({ type: 'ADD_DIGIT', payload: value });
        }
    };

    return (
        <div className={styles["calculator-grid"]}>
            <div className={styles["output"]}>
                <div className={styles["previous-operand"]}>{state.previousOperand} {state.operation}</div>
                <div className={styles["current-operand"]}>{state.currentOperand}</div>
            </div>
            <Button className={styles["span-two"]} onClick={handleButtonClick} value="AC">AC</Button>
            <Button onClick={handleButtonClick} value="DEL">DEL</Button>
            <Button onClick={handleButtonClick} value="/">/</Button>
            <Button onClick={handleButtonClick} value="1">1</Button>
            <Button onClick={handleButtonClick} value="2">2</Button>
            <Button onClick={handleButtonClick} value="3">3</Button>
            <Button onClick={handleButtonClick} value="*">*</Button>
            <Button onClick={handleButtonClick} value="4">4</Button>
            <Button onClick={handleButtonClick} value="5">5</Button>
            <Button onClick={handleButtonClick} value="6">6</Button>
            <Button onClick={handleButtonClick} value="+">+</Button>
            <Button onClick={handleButtonClick} value="7">7</Button>
            <Button onClick={handleButtonClick} value="8">8</Button>
            <Button onClick={handleButtonClick} value="9">9</Button>
            <Button onClick={handleButtonClick} value="-">-</Button>
            <Button onClick={handleButtonClick} value=".">.</Button>
            <Button onClick={handleButtonClick} value="0">0</Button>
            <Button className={styles["span-two"]} onClick={handleButtonClick} value="=">=</Button>
        </div>
    );
};

export default Calculator;