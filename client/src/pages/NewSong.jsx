import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
    songName: Yup.string().required('El nombre de la canción es requerido'),
    audioFile: Yup.mixed().required('La pista de audio es requerida'),
    songCover: Yup.mixed().required('La portada de la canción es requerida') // New field validation
});

const url = `${import.meta.env.VITE_API_BASE_URL}/upload`;

const NewSong = () => {
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append('songName', values.songName);
            formData.append('audioFile', values.audioFile); // Ensure this matches the server
            formData.append('songCover', values.songCover); // Ensure this matches the server
    
            // Log the form data to check its contents
            console.log("Form Data:", formData.get('songName'), formData.get('audioFile'), formData.get('songCover'));
    
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Show success toast with server message
            toast.success(res.data.message || 'Canción subida con éxito!');
            console.log(res);
        } catch (error) {
            // Show error toast with server message if available
            toast.error(error.response?.data?.message || 'Error al subir la canción. Inténtalo de nuevo.');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container p-4 mx-auto">
            <p className="mb-4 text-2xl font-bold">Subir Canción</p>
            <Formik
                initialValues={{ songName: '', audioFile: null, songCover: null }} // Add songCover to initialValues
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="songName" className="label">
                                <span className="label-text">Nombre de la canción</span>
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
                                <span className="label-text">Pista de audio de la canción</span>
                            </label>
                            <input
                                type="file"
                                name="audioFile"
                                accept="audio/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    console.log("Selected audio file:", file); // Log the selected file
                                    setFieldValue("audioFile", file);
                                }}
                                className="w-full file-input file-input-bordered"
                            />
                            <ErrorMessage name="audioFile" component="div" className="mt-1 text-sm text-error" />
                        </div>

                        <div>
                            <label htmlFor="songCover" className="label">
                                <span className="label-text">Portada de la canción</span>
                            </label>
                            <input
                                type="file"
                                name="songCover"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files[0];
                                    console.log("Selected cover file:", file); // Log the selected cover
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
                                Enviar
                            </button>
                            <Link
                                to="/library"
                                className='btn btn-secondary'
                            >
                                Volver
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewSong;