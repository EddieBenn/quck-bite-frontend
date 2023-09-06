import React, { useRef, useState, ChangeEvent } from "react";
import "./InputAdornment.css"

interface TextFieldProps {
  value?: string;
  handleChange?:(e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required: boolean;
   adornment: string;
  type: string;
  placeholder?: string
}

const TextField: React.FC<TextFieldProps> = ({ value, handleChange, name, required, adornment,type, placeholder}) => {
  const inputEl = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [blur, setBlur] = useState<boolean>(false);

  return (
    <div className="textfield">
      <div
        className={`textfield__input ${blur && "textfield__input--focused"}`}
        onClick={() => {
          inputEl.current?.focus();
        }}
      >
        <div className="textfield__input-adornment">
          <span className="textfield__adornment-text">{adornment}</span>
        </div>
        <input
          value={value}
          onChange={handleChange}
          ref={inputEl as React.Ref<HTMLInputElement>}
          placeholder= {placeholder}
          className="textfield__input-field"
          onFocus={() => setBlur(!blur)}
          onBlur={() => setBlur(false)}
          name= {name}
          type= {type}

          required= {required}
        />
      </div>
    </div>
  );
};
export default TextField;
