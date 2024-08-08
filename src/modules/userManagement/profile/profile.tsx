import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Profile = () => {

    const { user, isAuthenticated, isLoading,getAccessTokenSilently } = useAuth0();

    console.log("esto tengo",getAccessTokenSilently())

    if (isLoading) {
        return <div>
            Loading...
        </div>
    }

    return (
        <>
        {
              isAuthenticated && (
                <div>
                    <img src={user!.picture} alt={user!.name} />
                    <h2>{user!.name}</h2>
                    <h2>{user!.email}</h2>
                </div>
    
            )
        }
        </>

    
      
    )
}

export default Profile