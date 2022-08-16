import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
      <div className='h-screen flex bg-black-bg1'>
          <div className='w-full max-w-md bg-grey m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
              <h1 className='text-2xl font-medium  text-primary mt-4 mb-12 text-center'>
                  Log in to your account
              </h1>
              <div className="card-body">
      {data ? (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      ) : (
              <form onSubmit={handleFormSubmit}>
                  <div>
                      <label htmlFor='email'>Email</label>
                      <input
                          type='email'
                          className={`w-full p-2 text-primary border rounded-md outline-none text-sm `}
                          id='email'
                          placeholder='Your Email'
                      />
                  </div>
                  <div>
                      <label htmlFor='password'>Password</label>
                      <input
                          type='password'
                          className={`w-full p-2 text-primary border rounded-md outline-none text-sm `}
                          id='password'
                          placeholder='Your Password'
                      />
                  </div>
                  <div className='flex justify-center items-center mt-6'>
                      <button
                          className={`bg-blue-500 py-2 px-4 text-sm text-black-bold rounded border  focus:outline-none `}
                      >
                          Login
                      </button>
                  </div>
              </form>
      )}
       {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          {error.message}
        </div>
      )}
          </div>
      </div>
    </div>
  );
};
export default Login;