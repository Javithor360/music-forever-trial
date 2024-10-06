// client/src/pages/NewSong.jsx
import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Form validation with messages to display (FILE EXTENSIONS ARE CHECKED ON THE SERVER)
const validationSchema = Yup.object().shape({
    songName: Yup.string().required('Song name is required'),
    audioFile: Yup.mixed().required('Audio track is required'),
    songCover: Yup.mixed().required('Album cover is required')
});

const NewSong = () => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/upload`;
    
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            // Building a FormData object with the provided form data
            const formData = new FormData();
            formData.append('songName', values.songName);
            formData.append('audioFile', values.audioFile);
            formData.append('songCover', values.songCover);
    
            // Sending the request to the server
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Since we're working with files, it's mandatory to define the content as form-data
                }
            });
    
            toast.success(res.data.message || 'Successfully uploaded song!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unexpected error. Try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container p-4 mx-auto">
            <p className="mb-4 text-2xl font-bold">Upload a new song</p>
            <Formik
                initialValues={{ songName: '', audioFile: null, songCover: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="songName" className="label">
                                <span className="label-text">Song name</span>
                            </label>
                            <Field
                                type="text"
                                name="songName"
                                className="w-full input input-bordered"
                            />
                            <ErrorMessage name="songName" component="div" className="mt-1 text-sm text-error" />
                        </div>

                        <div>
                            <label htmlFor="audioFile" className="label">
                                <span className="label-text">Audio track</span>
                            </label>
                            <input
                                type="file"
                                name="audioFile"
                                accept="audio/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    setFieldValue("audioFile", file);
                                    if (!values.songName) {
                                        setFieldValue("songName", file.name.split('.')[0]);
                                    }
                                }}
                                className="w-full file-input file-input-bordered"
                            />
                            <ErrorMessage name="audioFile" component="div" className="mt-1 text-sm text-error" />
                        </div>

                        <div>
                            <label htmlFor="songCover" className="label">
                                <span className="label-text">Album cover</span>
                            </label>
                            <input
                                type="file"
                                name="songCover"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    setFieldValue("songCover", file);
                                }}
                                className="w-full file-input file-input-bordered"
                            />
                            <ErrorMessage name="songCover" component="div" className="mt-1 text-sm text-error" />
                        </div>

                        <div className='flex gap-2'>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary"
                            >
                                Save
                            </button>
                            <Link
                                to="/library"
                                className='btn btn-secondary'
                            >
                                Back
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewSong;