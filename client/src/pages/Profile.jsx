import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import Swal from "sweetalert2";
import {deletePetDetails, downloadPDF, getPetById, updatePetDetails} from "../services/api.js";
import petImage from "../assets/logo.jpg";
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Profile = () => {
    // access the url related params data (id) ...
    const { id } = useParams();

    // Create some states to store needed data ...
    const [pet, setPet] = useState({});

    const [petId, setPetId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [species, setSpecies] = useState('');
    const [age, setAge] = useState('');
    const [personality, setPersonality] = useState('');
    const [petAdopted, setPetAdopted] = useState(false);
    const [updatedImage, setUpdatedImage] = useState(null);
    const [updatedImagePath, setUpdatedImagePath] = useState(null);
    const [isError, setIsError] = useState(false);

    // set page navigation ...
    const navigate = useNavigate();

    // use useEffect hook ...
    useEffect(() => {
        if(id) {
            // fetch the pet data related to the id ...
            getPetById(id)
                .then((result) => {
                    // console.log(result.data.name);
                    // set data for the state variables ...
                    setPet(result.data);
                    setName(result.data.name);
                    setSpecies(result.data.species);
                    setAge(result.data.age);
                    setPersonality(result.data.personality);
                    setImage(result.data.image);
                    setPetAdopted(result.data.adopted);
                    // set the param variable id as petId ...
                    setPetId(id);
                })
                .catch((error) => {
                    console.log(error);
                    return;
                });
        }
    }, [id]);

    const handleImageChange = (e) => {
        // access the selected file ...
        const file = e.target.files[0];
        // access the file object url ...
        const imageUrl = URL.createObjectURL(file);
        console.log(file);
        console.log(imageUrl);
        if (file) {
            // set the selected file as newly updated image ...
            setUpdatedImage(file);
            // set the selected file object url as newly updated image url ...
            setUpdatedImagePath(imageUrl);
        }
    };

    const updatePet = async (id) => {
        // check whether the fields are empty or not ...
        if (!name || !species || !age || !personality) {
            setIsError(true);
            return;
        }
        // define formData ...
        const formData = new FormData();
        // append data into formData ...
        formData.append('image', image);
        formData.append('name', name);
        formData.append('species', species);
        formData.append('age', age);
        formData.append('personality', personality);

        // set a confirmation before update ...
        Swal.fire({
            title: 'Confirmation About Updating Pet Details',
            text: `Are you sure you want to update ${name}'s profile ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // call the updatePetDetails to update the pet data ...
                    const response = await updatePetDetails(id, formData);
                    console.log(response);
                    // check the status of the response ...
                    if(response.status === 200) {
                        // show a success popup ...
                        await Swal.fire({
                            icon: 'success',
                            title: 'Pet Details Updated!',
                            text: 'Pet Details Updated Successfully!',
                            confirmButtonColor: '#3085d6',
                        });
                    } else {
                        // show an error popup ...
                        await Swal.fire({
                            icon: 'error',
                            title: 'Update Failed',
                            text: 'Update Failed! Try again later',
                            confirmButtonColor: '#3085d6',
                        });
                        return;
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
        });
    }

    const deletePet = async (id) => {
        // set a confirmation before delete ...
        Swal.fire({
            title: 'Confirmation About Deleting Pet Details',
            text: `Are you sure you want to Delete ${name}'s details?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // call the deletePetDetails to delete the pet data ...
                    const response = await deletePetDetails(id);
                    console.log(response);
                    // check the response status ...
                    if(response.status === 200) {
                        // show a success popup ...
                        await Swal.fire({
                            icon: 'success',
                            title: 'Pet Details Deleted!',
                            text: 'Pet Details Deleted Successfully!',
                            confirmButtonColor: '#3085d6',
                        });
                        navigate('/');
                    } else {
                        await Swal.fire({
                            icon: 'error',
                            title: 'Delete Failed',
                            text: 'Delete Process Failed! Try again later',
                            confirmButtonColor: '#3085d6',
                        });
                        return;
                    }
                } catch (error) {
                    console.log(error);
                    return;
                }
            }
        });
    }

    const downloadPetPDF = async (id) => {
        try {
            const response = await downloadPDF(id); // ✅ Use the renamed function

            if (response.status !== 200) {
                toast.error('Failed to download PDF');
                return;
            }

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'pet_adaptation_report.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading PDF:', error);
            toast.error('Something went wrong!');
        }
    };

    const cancelOperation = () => {
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
    }

    return (
        <div className='container-fluid mt-2 min-vh-100 d-flex justify-content-center align-items-center m-auto'>
            <ToastContainer/>
            <div className='card w-50'>
                <div className='card-header bg-white border-0'>
                    <div className='card-title'>
                        <h4 className='fw-bold d-flex justify-content-center align-items-center'>{name}'s Profile</h4>
                    </div>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='card-img img-fluid d-flex justify-content-center align-items-center border-2'>
                            { updatedImage ? (
                                <img src={updatedImagePath} alt={image} className='pet-image-size'/>
                            ) : (
                                image ? (
                                    <img src={`http://localhost:5000/uploads/${image}`} alt={image} className='pet-image-size'/>
                                ) : (
                                    <img src={petImage} alt={petImage} className='pet-image-size'/>
                                )
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
                            )}
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='species' className='form-label'>Species <span
                                className='bg-red'>*</span></label>
                            <input type='text' id='species' name='species' placeholder='Enter Pet Species'
                                   className='form-control' value={species}
                                   onChange={(e) => setSpecies(e.target.value)}/>
                            {!species && isError && (
                                <span className='bg-red'>Species is Required</span>
                            )}
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='age' className='form-label'>Age (in years) <span className='bg-red'>*</span></label>
                            <input type='number' id='age' name='age' placeholder='Enter Pet Age'
                                   className='form-control' value={age} onChange={(e) => setAge(e.target.value)}/>
                            {!age && isError && (
                                <span className='bg-red'>Age is Required</span>
                            )}
                        </div>
                        <div className='form-group mt-2'>
                            <label htmlFor='personality' className='form-label'>Personality <span
                                className='bg-red'>*</span></label>
                            <input type='text' id='personality' name='personality' placeholder='Enter Pet Personality'
                                   className='form-control' value={personality}
                                   onChange={(e) => setPersonality(e.target.value)}/>
                            {!personality && isError && (
                                <span className='bg-red'>Personality is Required</span>
                            )}
                        </div>
                        <div className='d-flex justify-content-center align-content-center gap-2'>
                            <button type='button' className='btn btn-warning text-white text-center mt-2' onClick={() => updatePet(petId)}>
                                Update the Pet Details
                            </button>
                            <button type='button' className='btn btn-danger text-white text-center mt-2' onClick={() => deletePet(petId)}>
                                Remove Pet
                            </button>
                            { petAdopted && petId && (
                                <button type='button' className='btn btn-primary text-white text-center mt-2'
                                        onClick={() => downloadPetPDF(petId)}>
                                    Download Adaptation Report
                                </button>
                            )}
                            <button type='button' className='btn btn-info text-white text-center mt-2'
                                    onClick={cancelOperation}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;
