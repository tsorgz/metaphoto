import { useEffect, useState } from "react"

import '@/styles/SearchChip.css'

export default function SearchChip(props: {id: string, label: string, onValid: CallableFunction, validation?: CallableFunction}) {

    const { id, label, onValid, validation } = props
    const validationState = {
        EMPTY: '',
        VALID: 'valid',
        INVALID: 'invalid'
    }
    const [valid, setValid] = useState(validationState.EMPTY)
    const [text, setText] = useState('')

    const confirmValidation = (e: any) => {
        const input = e.target.textContent
        setText(input)
        
        if (!input) {
            setValid(validationState.EMPTY)
        }
        else if (validation) {
            setValid(validation(input) ? validationState.VALID : validationState.INVALID)
        }
        else {
            setValid(validationState.VALID)
        }
    }

    const clearInput = (e: any) => {
        const inputElement = document.getElementById(id)
        if(!inputElement) return
        inputElement.innerHTML = ''
        setValid(validationState.EMPTY)
        setText('')
    }

    useEffect(()=> {
        if (valid === validationState.VALID) {
            onValid(text)
        } else {
            onValid('')
        }
    }, [valid, text])


    return (
        <div className={`search--chip ${valid}`}>
            <label htmlFor={id}>{label}</label>
            <span id={id} className="search--chip-input" role="textbox" contentEditable onBlur={confirmValidation}/>
            <span className="search--chip-delete" hidden={valid === validationState.EMPTY} onClick={clearInput}>&times;</span>
        </div>
    )
}