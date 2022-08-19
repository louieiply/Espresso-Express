import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className='h-screen bg-gray-900'>
    <div className='w-full max-w-md bg-grey m-auto rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
        <h1 className='text-2xl text-white font-medium  text-primary mt-4 mb-12 text-center'>
            Signup
        </h1>
        {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div>
                <label className='text-white' htmlFor='username'>Username</label>
                <input
                  placeholder="Your username"
                  name="username"
                  type="text"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm `}
                  value={formState.name}
                  onChange={handleChange}
                />
                </div>
                <div>
                  <label className='text-white' htmlFor='email'>Email</label>
                <input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm `}
                  value={formState.email}
                  onChange={handleChange}
                />
                </div>
                <div>
                  <label className='text-white' htmlFor='password'>Passsword</label>
                <input
                  
                  placeholder="******"
                  name="password"
                  type="password"
                  className={`w-full p-2 text-primary border rounded-md outline-none text-sm `}
                  value={formState.password}
                  onChange={handleChange}
                />
                </div>
                <div className='flex justify-center items-center mt-6'>
                      <button
                          className={`bg-blue-500 py-2 px-4 text-sm text-black-bold rounded border  focus:outline-none `}
                      >
                          Submit
                      </button>
                      
                  </div>
                </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      
    
  );
            };

export default Signup;