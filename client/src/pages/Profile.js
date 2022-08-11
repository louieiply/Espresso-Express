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
        </>
    );
};

export default Profile