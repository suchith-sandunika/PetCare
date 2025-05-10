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

const Home2 = () => {
    const [pets, setPets] = useState([]);
    const [petAdopted, setPetAdopted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPetsData();
    }, []);

    const fetchPetsData = useCallback(async () => {
        try {
            const response = await getPets();
            if (response.status === 200) {
                setPets(response.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSearchInput = useCallback(async (e) => {
        const input = e.target.value;
        if (input) {
            await fetchDataAccordingToMood(input);
        } else {
            await fetchPetsData();
        }
    }, [fetchPetsData]);

    const fetchDataAccordingToMood = useCallback(async (mood) => {
        try {
            const response = await filterPetByMood(mood);
            if (response.status === 200) {
                setPets(response.data.data);
            } else {
                setPets([]);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const adoptThisPet = useCallback(async (id) => {
        try {
            const response = await adoptPet(id);
            if (response.status === 200) {
                toast.success(response.data.message);
                const index = pets.findIndex(pet => pet._id === id);
                pets[index].adopted = true;
                setPetAdopted(true);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }, [pets]);

    const moveToAddPet = useCallback(() => navigate('/add'), [navigate]);
    const viewPet = useCallback((id) => navigate(`/profile/${id}`), [navigate]);
    const moveToIdentifyPet = useCallback(() => navigate('/view-suitable-pet'), [navigate]);

    return (
        <div className='container-fluid h-100 w-100 mt-2 mb-2 animate__animated animate__fadeIn'>
            <ToastContainer />
            <div className='card shadow-lg' style={{ background: 'linear-gradient(to bottom, #3B5998, #8B9DC3)' }}>
                <div className='card-header border-0 text-center text-white fw-bold' style={{ backgroundColor: '#3B5998' }}>
                    <h2 className='d-flex justify-content-center align-items-center'>
                        <img src={logo2} alt='logo2' className='pet-logo-size mt-3 mb-3 animate__animated animate__bounceInLeft' />
                        <span className='mx-3 font-monospace'>PetCare - The Online Pet Adaptation Center</span>
                        <img src={logo} alt='logo' className='pet-logo-size mt-3 mb-3 animate__animated animate__bounceInRight' />
                    </h2>
                </div>
                <div className='card-body'>
                    <h3 className='text-center text-white mb-3 rounded-2'>
                        <img src={dogImage2} alt='dogImage2' className='pet-logo-size mt-3 mb-3 animate__animated animate__fadeInLeft' />
                        <span className='mx-2 font-monospace'>Explore to own your pet</span>
                        <img src={petImage} alt='petImage' className='pet-logo-size mt-3 mb-3 animate__animated animate__fadeInRight' />
                    </h3>
                    <div className="row mb-3">
                        <div className="col-12 d-flex justify-content-end">
                            <div className="d-flex align-items-end search-bar-size">
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    placeholder="Enter the mood to search"
                                    onChange={handleSearchInput}
                                />
                                <Search className="ms-2 mb-2" style={{ color: 'white' }} />
                            </div>
                        </div>
                    </div>
                    {pets.length > 0 ? (
                        <div className='row justify-content-center gx-3 gy-4'>
                            {pets.map((pet, index) => (
                                <div key={index} className='col-md-2 animate__animated animate__zoomIn'>
                                    <div className='card flex-fill hover-effect cursor-pointer shadow-sm' style={{ background: '#2D4373' }}>
                                        <div className='card-body d-flex flex-column'>
                                            <h5 className='card-title text-center fw-bold text-white'>{pet.name}</h5>
                                            {pet.image ? (
                                                <img src={`${apiUrl}/uploads/${pet.image}`} alt={pet.name} className='card-img-top mb-2 img-fluid img-class-style rounded-bottom' />
                                            ) : (
                                                <img src={pet.species === 'Dog' ? dogImage : pet.species === 'Cat' ? catImage : otherAnimal} alt={pet.name} className='card-img-top mb-2 img-fluid rounded-bottom' style={{ objectFit: 'cover' }} />
                                            )}
                                            <p className='card-text text-center text-white'>Species: {pet.species}</p>
                                            <p className='card-text text-center text-white'>Age: {pet.age} Years</p>
                                            <p className='card-text text-center text-white'>Personality: {pet.personality}</p>
                                            <div className='d-flex justify-content-center align-items-center mb-2 mood-container'>
                                                <p className='card-text mb-0 mood-label text-white'>Mood:</p>
                                                <p className={`card-text ms-2 px-2 rounded ${pet.mood === 'Happy' ? 'bg-success' : pet.mood === 'Excited' ? 'bg-warning' : 'bg-danger'} text-white`}>
                                                    {pet.mood} {pet.mood === 'Happy' ? '😊' : pet.mood === 'Excited' ? '🙂' : '😢'}
                                                </p>
                                            </div>
                                            <div className='mt-auto d-flex flex-column gap-2'>
                                                {pet.adopted || petAdopted ? (
                                                    <button className='btn btn-secondary text-white' disabled style={{ cursor: 'none' }}>Adopted</button>
                                                ) : (
                                                    <button className='btn btn-success text-white' onClick={() => adoptThisPet(pet._id)}>Adopt {pet.name}</button>
                                                )}
                                                <button className='btn btn-info text-white' onClick={() => viewPet(pet._id)}>View Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text-center text-white'>Oops! No Pets Found in the System 🤔</p>
                    )}
                    <div className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4'>
                        <button className='btn btn-primary px-4' onClick={moveToAddPet}>Add a new Pet 🐶</button>
                        <button className='btn btn-success px-4' onClick={moveToIdentifyPet}>Identify a Pet 🐱</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Home2);
