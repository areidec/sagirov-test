import React from 'react';
import {useForm} from 'react-hook-form';
import {
  Link
} from 'react-router-dom';
import { Base64 } from 'js-base64';

import Input from '../input';

const SingInForm = ({setModal}) => {
  
  const { handleSubmit, register, errors, reset, getValues, setError } = useForm();

  const onSubmit = data => {
    const { firstName, password } = data;
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      setError('firstName', 'notFound');
    } else {
      const user = users.filter(user => user.email === firstName || user.tel === firstName );

      if(user.length > 0 && Base64.decode(user[0].password) === password) {
        setModal({ isShow: true, title: 'Вы зарегистрированы' });
        setTimeout(() => {
          setModal({ isShow: false, title: 'Вы зарегистрированы' });
        }, 5000);
        setTimeout(() => {
          setModal({ isShow: false, title: '' });
        }, 6000);
        reset();
      } else {
        setError('password', 'inCorrect');
      }

    }
  };

  const inputs = {
    firstName: {
      name: 'firstName',
      label: 'Email или номер телефона',
      errorTypes: {
        required: 'Это поле обязательно для заполнения',
        notFound: 'Данного пользователя не существует'
      },
      validators: {
        required: true
      }
    },
    password: {
      name: 'password',
      label: 'Пароль',
      type: 'password',
      errorTypes: {
        required: 'Это поле обязательно для заполнения',
        inCorrect: 'Пароль не верен'
      },
      validators: {
        required: true
      }
    }
  }

  

  return (
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='form__title'>Вход</h1>
      <p className='form__under-title'>Введите свои данные</p>
      <div className='form__body'>
        {
          Object.values(inputs).map(({...values}) => {
            return <Input propsInput={values} key={values.name} errors={errors} register={register} getValues={getValues} />
          })
        }
        <div className='form__submit'>
          <button className='btn btn-rect' type='submit'>Войти</button>
        </div>
        <div className='form__footer'>
          <p>Нет аккаунта? <Link to='/'>Зарегистрироваться</Link></p>
        </div>
      </div>
    </form>
  )
}

export default SingInForm;