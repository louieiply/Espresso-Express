import { useQuery } from '@apollo/client';
import React from 'react';
import { QUERY_ME } from '../utils/queries';
import Auth from "../utils/auth";
const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return (
      <>
        Loading...
      </>
    )
  }

  const profileData = data?.me || {}

  return (
    <>
    <section className="min-h-screen bg-gray-900  py-10">
      <h1 className='text-center font-medium leading-tight text-5xl mt-0 mb-2 text-gray-600'>Profile Page</h1>

      <div class="overflow-x-auto relative border-black shadow-md sm:rounded-lg">
      <table className ="w-full text-sm text-left text-gray-500 ">
        <thead className =' text-black-700 uppercase bg-gray-50 dbg-gray-700 ' >
          <tr>
            <th scope='col' className='py-3 px-6'>Type</th>
            <th scope='col' className='py-3 px-6'>Name</th>

          </tr>
        </thead>
        <tbody>
          <tr className ="bg-white border-b bg-gray-900 border-gray-700">
           
           

          </tr>
          <tr>
            <td className='py-4 px-6 text'>Email</td>
            <td>{profileData.email}</td>

          </tr>
          <tr>
            <td className='py-4 px-6'>Name</td>
            <td>{profileData.username}</td>

          </tr>
          <tr>
            <td className='py-4 px-6'>Admin</td>
            <td>{Auth.isUserAdmin() ? <h1>is Admin</h1> : <h1>not Admin</h1>}
            </td>

          </tr>
        </tbody>
      </table>
      </div>
      </section>
    </>
  );
};

export default Profile