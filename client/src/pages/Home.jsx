import React, { memo, useCallback, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { adoptPet, apiUrl, filterPetByMood, getPets } from "../services/api.js";
import logo from '../../public/logo2.jpg';
import logo2 from '../../public/logo3.jpg';
import petImage from '../../public/logo4.jpg';
import dogImage from '../../public/image.png';
import dogImage2 from '../../public/dogImage.png';
import catImage from '../../public/catImage2.png';
import otherAnimal from '../../public/other.jpg';
import '../styles/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    // Create some states to store needed data ...
    const [pets, setPets] = useState([]);
    const [petAdopted, setPetAdopted] = useState(false);
    const navigate = useNavigate();

    // use useEffect hook ...
    useEffect(() => {
        // fetch all the pets ...
        fetchPetsData();
    }, []);

    // Function to fetch all pets data ...
    const fetchPetsData = useCallback (async () => {
            try {
                const response = await getPets();
                // console.log(response);
                if(response.status === 200) {
                    setPets(response.data);
                } else {
                    toast.error(response.data.message);
                    return;
                }
            } catch (error) {
                console.log(error);
                return;
            }
        }, [pets]);

    // Function to handle search input ...
    const handleSearchInput = useCallback(async (e) => {
        const input = e.target.value;
        // console.log(input);
        // according to input value, change the data loading ...
        if(input) {
            await fetchDataAccordingToMood(input);
        } else {
            await fetchPetsData();
        }
    }, [fetchPetsData]);

    // Function to fetch pet data according to mooed ...
    const fetchDataAccordingToMood = useCallback(async (mood) => {
        console.log(mood);
        try {
            // call the filterPetByMood function to filter the pet data through the mood ...
            const response = await filterPetByMood(mood);
            // console.log(response);
            // console.log(response.data.data);
            if(response.status === 200) {
                setPets(response.data.data);
            } else {
                setPets([]);
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }, [pets])


    // Function to adopt a pet process ...
    const adoptThisPet = useCallback(async (id) => {
        try {
            // call the adoptPet function to set adopt status ...
            const response = await adoptPet(id);
            // check the status of the response ...
            if(response.status === 200) {
                // show a success message with success message ...
                toast.success(response.data.message);
                // Find the index of the pet data where pet._id == id ...
                const index = pets.findIndex(pet => pet._id === id);
                // turn the adopted property of the pet to true ...
                pets[index].adopted = true;
                // set pets adaptation status to true to change the button state ...
                setPetAdopted(true);
            } else {
                // show an error message with error message ...
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }, []);

    const moveToAddPet = useCallback(() => {
            // navigate to addPet page ...
            navigate('/add');
        }, [navigate]);

    const viewPet = useCallback((id) => {
        // navigate to viewPetDetails page ...
        navigate(`/profile/${id}`);
    }, [navigate]);

    const moveToIdentifyPet = useCallback(() => {
        // navigate to IdentifySuitablePet page ...
        navigate('/view-suitable-pet');
    }, [navigate]);

    return (
        <div className='container-fluid h-100 w-100 mt-2 mb-2'>
            <ToastContainer/>
            <div className='card w-full h-full' style={{ background: 'cornflowerblue' }}>
                <div className='card-header align-items-center fw-bold border-0' style={{ background: '#3B5998' }}>
                    <div className='card-title rounded-2 mt-1'>
                        <h2 className='fw-bold d-flex justify-content-center align-items-center'>
                            <img src={logo2} alt={logo2} className='pet-logo-size mt-3 mb-3'/>
                            <span className='mr-2 ms-2 text-white font-monospace'>PetCare - The Online Pet Adaptation Center</span>
                            <img src={logo} alt={logo} className='pet-logo-size ms-2 mt-3 mb-3'/>
                        </h2>
                    </div>
                </div>
                <div className='card-body'>
                    <h3 className='align-items-center text-center fw-bold mb-3 rounded-2'>
                        <img src={dogImage2} alt={dogImage2} className='pet-logo-size ms-1 mt-3 mb-3'/>
                        <span className='mr-2 ms-2 text-white font-monospace'>--- Explore & Own Your Pet ---</span>
                        <img src={petImage} alt={petImage} className='pet-logo-size ms-2 ms-1 mt-3 mb-3'/>
                    </h3>
                    <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-end">
                            <div className="d-flex align-items-end search-bar-size">
                                <input
                                    type="text"
                                    className="form-control custom-input"
                                    placeholder="Enter the mood to search"
                                    onChange={handleSearchInput}
                                    style={{ backgroundColor: '#B3CCFF', color: 'white' }}
                                />
                                <Search className="ms-2 mb-2" style={{ color: 'white' }}/>
                            </div>
                        </div>
                    </div>
                    {pets.length > 0 ? (
                        <div className='row justify-content-center gx-3 gy-4'>
                            {pets.map((pet, index) => (
                                <div key={index} className='col-md-2'>
                                    <div className='card flex-fill hover-effect cursor-pointer shadow-lg' style={{ background: '#2D4373' }}>
                                        <div className='card-body d-flex flex-column'>
                                            <h5 className='card-title text-center fw-bold text-white'>{pet.name}</h5>
                                            {pet.image ? (
                                                <img src={`${apiUrl}/uploads/${pet.image}`} alt={pet.name}
                                                     className='card-img-top mb-2 img-fluid img-class-style rounded-bottom'/>
                                            ) : (
                                                (
                                                    pet.species === 'Dog' ? (
                                                        <img src={dogImage} alt={pet.name}
                                                             className='card-img-top mb-2 img-fluid rounded-bottom'
                                                             style={{ objectFit: 'cover'}}/>
                                                    ) : (
                                                        pet.species === 'Cat' ? (
                                                            <img src={catImage} alt={pet.name}
                                                                 className='card-img-top mb-2 img-fluid rounded-bottom'
                                                                 style={{ objectFit: 'cover'}}/>
                                                        ) : (
                                                            <img src={otherAnimal} alt={pet.name}
                                                                 className='card-img-top mb-2 rounded-bottom'
                                                                 style={{ objectFit: 'cover'}}/>
                                                        )
                                                    )
                                                )
                                            )}
                                            <p className='card-text text-center text-white'>Species: {pet.species}</p>
                                            <p className='card-text text-center text-white'>Age: {pet.age} Years</p>
                                            <p className='card-text text-center text-center text-white'>Personality: {pet.personality}</p>
                                            <div
                                                className='d-flex justify-content-center align-items-center mb-2 mood-container'>
                                                <p className='card-text mb-0 mood-label text-white'>Mood: </p>
                                                <p className={pet.mood === 'Happy' ? 'card-text bg-green ms-2' : pet.mood === 'Excited' ? 'card-text bg-orange ms-2' : 'card-text bg-red ms-2'}>
                                                    {pet.mood} {pet.mood === 'Happy' ? '😊' : pet.mood === 'Excited' ? '🙂' : '😢'}
                                                </p>
                                            </div>
                                            <div className='mt-auto custom-button-group'>
                                                {pet.adopted || petAdopted ? (
                                                    <button type='button' className='btn btn-secondary text-white hover-effect' style={{ cursor: 'none' }}
                                                            disabled>
                                                        Adopted
                                                    </button>
                                                ) : (
                                                    <button type='button' className='btn btn-success text-white hover-effect'
                                                            onClick={() => adoptThisPet(pet._id)}>
                                                        Adopt {pet.name}
                                                    </button>
                                                )}
                                                <button type='button' className='btn btn-info text-white hover-effect'
                                                        onClick={() => viewPet(pet._id)}>
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='d-flex justify-content-center align-items-center text-white'>Oops ! No Pets Found in the
                            System 🤔</p>
                    )}
                    <div className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-2'>
                        <button className='btn btn-primary d-flex justify-content-center align-items-center mt-3 hover-effect' style={{ fontSize: '18px' }}
                                onClick={moveToAddPet}>
                            Add a new Pet
                            <span style={{ fontSize: '22px' }}>🐶</span>
                        </button>
                        <button
                            className='btn btn-success d-flex justify-content-center align-items-center mt-3 hover-effect med-text'
                            style={{fontSize: '18px'}}
                            onClick={moveToIdentifyPet}>
                            Identify the Pet Which Suits You
                            <span style={{fontSize: '22px'}}>🐱</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Home);
