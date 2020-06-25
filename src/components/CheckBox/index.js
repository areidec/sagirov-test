import React from 'react';

const CheckBox = ({
  propsInput: {
    name, label, validators, errorTypes
  },
  register,
  errors
}) => {
  return (
    <div className='form__control'>
      <div className='checkbox'>
        <input 
          name={name}
          ref={register({...validators})}
          onChange={(e)=> console.log(e.target.checked)}
          type='checkbox' 
          id={name} />
        <label htmlFor={name}>{label}</label>
      </div>
      { errors[name] && <p className='error'>{errorTypes[errors[name].type]}</p> }
    </div>
  )
}

export default CheckBox;