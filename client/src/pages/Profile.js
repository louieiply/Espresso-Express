import { useQuery } from '@apollo/client';
import React from 'react';
import { QUERY_ME } from '../utils/queries';
import Auth from "../utils/auth";
const Profile = () => {
    const {loading, data} = useQuery(QUERY_ME);

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
            <p>Profile Page</p>
            Id: {profileData._id}
            <br/>
            Email: {profileData.email}
            <br/>
            Username: {profileData.username}
            Admin Stuff: {Auth.isUserAdmin()? <h1>is Admin</h1>: <h1>not Admin</h1>}

            <table class="table-fixed">
  <thead>
    <tr>
      <th>Type</th>
      <th>Name</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Id:</td>
      <td>{profileData._id}</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
        </>
    );
};

export default Profile