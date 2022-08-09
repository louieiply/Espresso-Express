import { useQuery } from '@apollo/client';
import React from 'react';
import { QUERY_ME } from '../utils/queries';

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
        </>
    );
};

export default Profile