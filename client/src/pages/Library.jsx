import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import { Link } from 'react-router-dom';

const Library = () => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/files`;
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch media files from the server
  const fetchMediaFiles = async () => {
    try {
      const response = await axios.get(url);
      setMediaFiles(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  // Define loading component
  if (loading) {
    return <div className="mt-5 text-center">Loading...</div>;
  }

  // Define error component
  if (error) {
    return <div className="mt-5 text-center text-red-500">{error}</div>;
  }

  if (mediaFiles.length === 0) {
    return <div className="mt-5 text-center">
      <p className='text-2xl font-bold'>Oops! <br /> There's nothing to display yet... <br />:(</p>
      <Link to="/new">
        <button className="mt-3 btn btn-primary">Add music</button>
      </Link>
    </div>
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">Available elements</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mediaFiles.map((media, index) => (
          <div key={index} className="shadow-xl card bg-base-100">
            <figure>
              {media.cover ? (
                <img src={`${import.meta.env.VITE_MEDIA_SERVER_URL}/uploads/${media.cover}`} alt="Cover" className="object-cover w-full h-[600px]" />
              ) : (
                <div className="flex items-center justify-center bg-gray-200 h-600">
                  <span>No Cover Available</span>
                </div>
              )}
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {media.track ? getOriginalName(media.track) : 'No Track Available'}
              </h2>
              {media.track && (
                <div className="mt-2">
                  <ReactAudioPlayer
                    src={`${import.meta.env.VITE_MEDIA_SERVER_URL}/uploads/${media.track}`}
                    controls
                    style={{
                      width: '100%',
                      borderRadius: '8px',
                      backgroundColor: '#1f1f1f',
                      color: '#f0f0f0',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to extract the original name from the track filename
const getOriginalName = (filename) => {
  // Remove everything before the first underscore
  const nameWithExtension = filename.split('_').slice(1).join('_'); // Join the parts after the first underscore
  const nameWithoutExtension = nameWithExtension.split('.')[0]; // Remove the file extension

  // Check if the name contains "_cover" and remove it
  const finalName = nameWithoutExtension.includes('_cover')
    ? nameWithoutExtension.replace('_cover', '')
    : nameWithoutExtension;

  // Replace remaining underscores with spaces
  return finalName.replace(/_/g, ' ').trim(); // Replace underscores with spaces and trim any extra spaces
};

export default Library;