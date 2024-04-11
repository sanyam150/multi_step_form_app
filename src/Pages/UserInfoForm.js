import React from 'react';
import '../App.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const UserInfoForm = () => {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    parentsName: yup.string().required('Parents Name is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .test(
        'Phone Number length',
        'Phone number must be exactly 10 digits',
        (val) => val && val.length === 10
      ),
    email: yup.string().email().required('Valid email is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (formData) => {
    localStorage.setItem('userInformation', JSON.stringify(formData));
    navigate('/AddMembersForm');
  };

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>User Information</h2>
      <div className='userInfoContainer'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className='userInfoContainer_inputValues'
            type='text'
            placeholder='FirstName...'
            {...register('firstName')}
          />
          <p>{errors.firstName?.message}</p>
          <input
            className='userInfoContainer_inputValues'
            type='text'
            placeholder='LastName...'
            {...register('lastName')}
          />
          <p>{errors.lastName?.message}</p>
          <input
            className='userInfoContainer_inputValues'
            type='text'
            placeholder='ParentsName...'
            {...register('parentsName')}
          />
          <p>{errors.parentsName?.message}</p>
          <input
            className='userInfoContainer_inputValues'
            type='number'
            placeholder='Phone number...'
            {...register('phoneNumber')}
          />
          <p>{errors.phoneNumber?.message}</p>
          <input
            className='userInfoContainer_inputValues'
            type='email'
            placeholder='Email...'
            {...register('email')}
          />
          <p>{errors.email?.message}</p>

          <input
            className='userInfoContainer_inputValues'
            type='submit'
            style={{ width: '100%' }}
          />
        </form>
      </div>
    </>
  );
};

export default UserInfoForm;
