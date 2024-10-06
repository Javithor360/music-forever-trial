import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen hero bg-base-200">
            <div className="text-center hero-content">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to <br /> Music Forever</h1>
                    <p className="py-6">
                        Browse and add your favorite songs to our library. <br />
                        Start your musical journey now!
                    </p>
                    <Link to="/library">
                        <button className="btn btn-primary">Check Library</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;