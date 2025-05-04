import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { adoptPet, filterPetByMood, getPets } from "../services/api.js";
import logo from '../assets/logo2.jpg';
import logo2 from '../assets/logo3.jpg';
import petImage from '../assets/logo4.jpg';
import dogImage from '../assets/image.png';
import catImage from '../assets/catImage2.png';
import otherAnimal from '../assets/other.jpg';
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
    const fetchPetsData = async () => {
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
    }

    // Function to handle search input ...
    const handleSearchInput = async (e) => {
        const input = e.target.value;
        console.log(input);
        // according to input value, change the data loading ...
        if(input) {
            await fetchDataAccordingToMood(input);
        } else {
            await fetchPetsData();
        }
    }

    // Function to fetch pet data according to mooed ...
    const fetchDataAccordingToMood = async (mood) => {
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
    }


    // Function to adopt a pet process ...
    const adoptThisPet = async (id) => {
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
    }

    const moveToAddPet = () => {
        // navigate to addPet page ...
        navigate('/add');
    }

    const viewPet = (id) => {
        // navigate to viewPetDetails page ...
        navigate(`/profile/${id}`);
    }

    const moveToIdentifyPet = () => {
        // navigate to IdentifySuitablePet page ...
        navigate('/view-suitable-pet');
    }

    return (
        <div className='container-fluid h-100 w-100 mt-2 mb-2'>
            <ToastContainer/>
            <div className='card w-full h-full'>
                <div className='card-header align-items-center fw-bold border-0 bg-white'>
                    <div className='card-title'>
                        <h3 className='fw-bold d-flex justify-content-center align-items-center'>
                            <img src={logo2} alt={logo2} className='pet-logo-size ms-2'/>
                            PetCare - The Online Pet Adaptation Center
                            <img src={logo} alt={logo} className='pet-logo-size mt-1'/>
                        </h3>
                    </div>
                </div>
                <div className='card-body'>
                    <h5 className='align-items-center text-center fw-bold mb-3'>
                        Explore to own your pet
                        <img src={petImage} alt={petImage} className='pet-logo-size ms-1'/>
                    </h5>
                    <div className='container'>
                        <div className="row mb-3">
                            <div className="col d-flex justify-content-end">
                                <div className='d-flex justify-content-end align-items-end w-25'>
                                    <input type='text' className='form-control' placeholder='Enter the mood to search' onChange={handleSearchInput}/>
                                    <Search className='ms-2 mb-2'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {pets.length > 0 ? (
                        <div className='row justify-content-center gx-3 gy-4'>
                            {pets.map((pet, index) => (
                                <div key={index} className='w-15'>
                                    <div className='card flex-fill'>
                                        <div className='card-body d-flex flex-column'>
                                            <h5 className='card-title text-center fw-bold'>{pet.name}</h5>
                                            {pet.image ? (
                                                <img src={`http://localhost:5000/uploads/${pet.image}`} alt={pet.name}
                                                     className='card-img-top mb-2 img-fluid'
                                                     style={{height: '150px', objectFit: 'cover'}}/>
                                            ) : (
                                                (
                                                    pet.species === 'Dog' ? (
                                                        <img src={dogImage} alt={pet.name}
                                                             className='card-img-top mb-2 img-fluid'
                                                             style={{height: '150px', objectFit: 'cover'}}/>
                                                    ) : (
                                                        pet.species === 'Cat' ? (
                                                            <img src={catImage} alt={pet.name}
                                                                 className='card-img-top mb-2 img-fluid'
                                                                 style={{height: '150px', objectFit: 'cover'}}/>
                                                        ) : (
                                                            <img src={otherAnimal} alt={pet.name}
                                                                 className='card-img-top mb-2'
                                                                 style={{height: '150px', objectFit: 'cover'}}/>
                                                        )
                                                    )
                                                )
                                            )}
                                            <p className='card-text text-center'>Species: {pet.species}</p>
                                            <p className='card-text text-center'>Age: {pet.age} Years</p>
                                            <p className='card-text text-center'>Personality: {pet.personality}</p>
                                            <div className='d-flex justify-content-center align-items-center mb-2'>
                                                <p className='card-text mb-0'>Mood: </p>
                                                <p className={pet.mood === 'Happy' ? 'card-text bg-green ms-2' : pet.mood === 'Excited' ? 'card-text bg-orange ms-2' : 'card-text bg-red ms-2'}>
                                                    {pet.mood} {pet.mood === 'Happy' ? '😊' : pet.mood === 'Excited' ? '🙂' : '😢'}
                                                </p>
                                            </div>
                                            <div className='mt-auto d-flex justify-content-center gap-2'>
                                                {pet.adopted || petAdopted ? (
                                                    <button type='button' className='btn btn-secondary text-white'
                                                            disabled>Adopted</button>
                                                ) : (
                                                    <button type='button' className='btn btn-success text-white'
                                                            onClick={() => adoptThisPet(pet._id)}>Adopt {pet.name}</button>
                                                )}
                                                <button type='button' className='btn btn-info text-white'
                                                        onClick={() => viewPet(pet._id)}>View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='d-flex justify-content-center align-items-center'>Oops ! No Pets Found in the
                            System 🤔</p>
                    )}
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        <button className='btn btn-primary d-flex justify-content-center align-items-center mt-3'
                                onClick={moveToAddPet}>
                            Add a new Pet 🐶
                        </button>
                        <button className='btn btn-success d-flex justify-content-center align-items-center mt-3' onClick={moveToIdentifyPet}>
                            Identify the Pet Which Suits You 🐱
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
