import React, {useState} from 'react';
import InputMask from 'react-input-mask';
import {EyeSvg} from '../icons';

const Input = ({ 
  propsInput: {
    name, label, type = 'text' , validators, errorTypes, mask
  },
  register,
  errors,
  getValues,
  }) => {
  let classNames = '';
  const [ value, setValue ] = useState('');
  const [ typeInput, setType ] = useState(type);
  
  if(value.trim().length > 0) {
    classNames = ' not-empty';
  }

  const toggleVisiblePass = () => {
    if (typeInput === 'password') {
      setType('text');
    } else {
      setType('password');
    }
  }

  const input = mask ? 
  <InputMask
    mask={mask}
    onChange={(e) => {
      setValue(e.target.value);
    }}
    name={name}
    value={getValues('tel')}
  >
    {() => <input  ref={register({...validators})} className={classNames} id={name} name={name} type={typeInput}  />}
  </InputMask> :
  <input
    onChange={(e) => setValue(e.target.value)}
    className={classNames}
    id={name} name={name} 
    type={typeInput} ref={register({...validators})} />;
  return (
    <div className='form__control'>
      {input}
      <label htmlFor={name}>{label}</label>
      <div className='under-line'></div>
      { name === 'password' ? 
          <button type='button' className='btn password-btn' onClick={toggleVisiblePass}><EyeSvg /></button> : null}
      { errors[name] && <p className='error'>{errorTypes[errors[name].type]}</p> }
    </div>
  )
}

export default Input;