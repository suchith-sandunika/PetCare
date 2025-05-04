import React, { memo, useCallback, useState } from 'react'
import {useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Swal from 'sweetalert2';
import {createPet} from "../services/api.js";
import petImage from '../assets/logo.jpg';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddNewPet = () => {
    // Create some states to store needed data ...
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [species, setSpecies] = useState('');
    const [age, setAge] = useState(0);
    const [personality, setPersonality] = useState('');
    const [isError, setIsError] = useState(false);

    // set page navigation ...
    const navigate = useNavigate();

    const handleImageChange = useCallback((e) => {
        // access the selected file ...
        const file = e.target.files[0];
        // access the file object url ...
        const imageUrl = URL.createObjectURL(file);
        console.log(file);
        console.log(imageUrl);
        if (file) {
            // set the selected file as newly updated image ...
            setImage(file);
            // set the selected file object url as newly updated image url ...
            setImagePath(imageUrl);
        }
    }, [image, imagePath]);

    const addPet = useCallback(async () => {
        // check whether the fields are empty or not ...
        if(!name || !species || !age || !personality) {
            setIsError(true);
            return;
        }

        const formData = new FormData();
        // append data into formData ...
        formData.append('image', image);
        formData.append('name', name);
        formData.append('species', species);
        formData.append('age', age);
        formData.append('personality', personality);

        try {
            // call the createPet to add a new pet ...
            const response = await createPet(formData);
            console.log(response);
            // check the response status ...
            if(response.status === 201) {
                // show a success message with success message ...
                toast.success(response.data.message);
                navigate('/');
            } else {
                // show an error message with error message ...
                toast.error(response.data.message);
                return;
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }, []);

    const cancelOperation = useCallback(() => {
        // set a confirmation before leaving the page ...
        Swal.fire({
            title: 'Confirmation About Going Back',
            text: 'Are you sure you want exit from adding a new pet?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Go Back To Homepage'
        }).then(async (result) => {
            if (result.isConfirmed) {
                // navigate to home page ...
                navigate('/');
            }
        });
    }, [navigate]);

    return (
        <div className='container-fluid mt-2 min-vh-100 d-flex justify-content-center align-items-center m-auto'>
            <ToastContainer/>
            <div className='card w-40'>
                <div className='card-header bg-white border-0'>
                    <div className='card-title'>
                        <h4 className='fw-bold d-flex justify-content-center align-items-center'>Add New Pet Data</h4>
                    </div>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='card-img img-fluid d-flex justify-content-center align-items-center border-2'>
                            { image ? (
                                <img src={imagePath} alt={image} className='pet-image-size'/>
                            ) : (
                                <img src={petImage} alt={petImage} className='pet-image-size'/>
                            )}
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='image' className='form-label'>Image</label>
                            <input type='file' name='image' className='form-control' accept='image/*'
                                   onChange={handleImageChange}/>
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='name' className='form-label'>Name <span className='bg-red'>*</span></label>
                            <input type='text' id='name' name='name' placeholder='Enter Pet Name'
                                   className='form-control' value={name} onChange={(e) => setName(e.target.value)}/>
                            {!name && isError && (
                                <span className='bg-red'>Name is Required</span>
                            ) }
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='species' className='form-label'>Species <span className='bg-red'>*</span></label>
                            <input type='text' id='species' name='species' placeholder='Enter Pet Species'
                                   className='form-control' value={species}
                                   onChange={(e) => setSpecies(e.target.value)}/>
                            {!species && isError && (
                                <span className='bg-red'>Species is Required</span>
                            ) }
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='age' className='form-label'>Age (in years) <span className='bg-red'>*</span></label>
                            <input type='number' id='age' name='age' placeholder='Enter Pet Age'
                                   className='form-control' value={age} onChange={(e) => setAge(e.target.value)}/>
                            {!age && isError && (
                                <span className='bg-red'>Age is Required</span>
                            ) }
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='personality' className='form-label'>Personality <span className='bg-red'>*</span></label>
                            <input type='text' id='personality' name='personality' placeholder='Enter Pet Personality'
                                   className='form-control' value={personality}
                                   onChange={(e) => setPersonality(e.target.value)}/>
                            {!personality && isError && (
                                <span className='bg-red'>Personality is Required</span>
                            ) }
                        </div>
                        <div className='d-flex justify-content-center align-content-center gap-2'>
                            <button type='button' className='btn btn-info text-white text-center mt-2'
                                    onClick={addPet}>Add the Pet
                            </button>
                            <button type='button' className='btn btn-danger text-white text-center mt-2'
                                    onClick={cancelOperation}>Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default memo(AddNewPet);
