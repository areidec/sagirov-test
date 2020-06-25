import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Link
} from 'react-router-dom';

import { Base64 } from 'js-base64';

import Input from '../input';
import CheckBox from '../CheckBox';

const RegistForm = ({ setModal }) => {
  
  const { handleSubmit, register, errors, reset, getValues, setValue } = useForm();
  const onSubmit = data => {
    const { email, password, tel } = data;
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    let encodedPass = Base64.encode(password);
    let userData = {
      email,
      password: encodedPass,
      tel: tel.replace(/ /g, '')
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    reset();
    setValue('tel', '');
    setModal({ isShow: true, title: 'Вы зарегистрированы' });
    setTimeout(() => {
      setModal({ isShow: false, title: 'Вы зарегистрированы' });
    }, 5000);
    setTimeout(() => {
      setModal({ isShow: false, title: '' });
    }, 6000);
  };

  const inputs = {
    firstName: {
      name: 'firstName',
      label: 'Имя',
      errorTypes: {
        required: 'Это поле обязательно для заполнения'
      },
      validators: {
        required: true
      }
    },
    nickName: {
      name: 'nickName',
      label: 'Никнейм',
      errorTypes: {
        required: 'Это поле обязательно для заполнения'
      },
      validators: {
        required: true
      }
    }
    ,
    email: {
      name: 'email',
      label: 'Email',
      errorTypes: {
        required: 'Это поле обязательно для заполнения',
        
      },
      validators: {
        required: true,
        pattern: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim
      }
    },
    tel: {
      name: 'tel',
      label: 'Телефон',
      type: 'tel',
      mask: '+ 7 \999 999 99 99',
      errorTypes: {
        required: 'Это поле обязательно для заполнения',
        validate: 'Минимальная длинна 11 символов'
      },
      validators: {
        required: true,
        validate: value => {
          let pureValue = value.replace(/_/g, '').replace(/ /g, '');
          if (pureValue.length < 11) return false;
          return true
        }
      }
    },
    password: {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      errorTypes: {
        required: 'Это поле обязательно для заполнения',
        pattern: 'Слабый пароль'
      },
      validators: {
        required: true,
        pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
      }
    },
    agree: {
      name: 'agree',
      label: 'Я даю свое согласие на обработку персональных данных',
      type: 'checkbox',
      errorTypes: {
        required: 'Это поле обязательно для заполнения'
      },
      validators: {
        required: true
      }
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='form__title'>Регистрация</h1>
      <p className='form__under-title'>Введите свои данные</p>
      <div className='form__body'>
        {
          Object.values(inputs).map(({...values}) => {
            if (values.type === 'checkbox') {
              return <CheckBox propsInput={values} key={values.name} errors={errors} register={register} />
            }
            return <Input propsInput={values} key={values.name} errors={errors} register={register} getValues={getValues} />
          })
        }
        <div className='form__submit'>
          <button className='btn btn-rect' type='submit'>Зарегистрироваться</button>
        </div>
        <div className='form__footer'>
          <p>Есть аккаунт? <Link to='/login'>Войти</Link></p>
        </div>
      </div>
    </form>
  )
}

export default RegistForm;