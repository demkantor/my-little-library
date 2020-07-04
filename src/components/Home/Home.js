import React from 'react';
import { useSelector } from 'react-redux';
import './Home.css';

const Home = () => {
    const profile = useSelector(state => state.user.currentUser.data);

    return (
        <div className="container">
            {profile &&
                <>
                    <h1 className="home-title">
                        Welcome {profile.firstName}{" "}{profile.lastName}!
                    </h1>
                    {profile.role === "Member"
                    ?
                        <h2>
                            Here you can view and check out media from our library
                        </h2>
                    :
                        <h2>
                            Here you can update/manage your media, view user accounts, check loans and status
                        </h2>
                    }
                </>
            }
        </div>
    )
};

export default Home;
