import React, { memo, useCallback, useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { adoptPet, apiUrl } from "../services/api.js";
import Topics from "../components/Topics.jsx";
import PetProfileCard from "../components/PetProfileCard.jsx";
import Button from "../components/Button.jsx";
import Swal from "sweetalert2";
import logo2 from "../../public/logo4.jpg";
import dogImage from "../../public/image.png";
import catImage from "../../public/catImage2.png";
import otherAnimal from "../../public/other.jpg";

const SuitablePets = ({ data }) => {

    const [pets, setPets] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(data);
        if(data) {
            setPets(data);
        }
    }, [data]);

    // Function to adopt a pet process ...
    const adoptThisPet = useCallback(async (id) => {
        try {
            // call the adoptPet function to set adopt status ...
            const response = await adoptPet(id);
            // check the status of the response ...
            if(response.status === 200) {
                // show a success message with success message ...
                toast.success(response.data.message);
                pets[id].adopted = true;
            } else {
                // show an error message with error message ...
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }, [pets]);

    const viewPet = useCallback((id) => {
        // navigate to viewPetDetails page ...
        navigate(`/profile/${id}`);
    }, [navigate])

    const navigateToHomePage = useCallback(() => {
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
        <div className='container-fluid h-100 w-100 mt-2 mb-2'>
            <ToastContainer/>
            <div className='card w-full h-full' style={{ background: 'cornflowerblue' }}>
                <div className='card-header align-items-center fw-bold border-0 bg-white' style={{ background: '#3B5998' }}>
                    <div className='card-title'>
                        {/*<h2 className='fw-bold d-flex justify-content-center align-items-center'>*/}
                        {/*    <img src={logo2} alt={logo2} className='pet-logo-size mt-3 mb-3'/>*/}
                        {/*    <span className='mr-2 ms-2 text-white font-monospace'>PetCare - The Online Pet Adaptation Center</span>*/}
                        {/*    <img src={logo2} alt={logo2} className='pet-logo-size ms-2 mt-3 mb-3'/>*/}
                        {/*</h2>*/}
                        <Topics main={'h2'}
                                mainClass={'fw-bold d-flex justify-content-center align-items-center'}
                                img1={logo2}
                                img1Alt={logo2}
                                img1Class={'pet-logo-size mt-3 mb-3'}
                                img2={logo2}
                                img2Alt={logo2}
                                img2Class={'pet-logo-size ms-2 mt-3 mb-3'}
                                spanText={'PetCare - The Online Pet Adaptation Center'}
                                spanClass={'mr-2 ms-2 text-white font-monospace'}
                        />
                    </div>
                </div>
                <div className='card-body'>
                    {pets.length > 0 ? (
                        <div className='row justify-content-center gx-3 gy-4'>
                            {pets.map((pet, index) => (
                                <div key={index} className='w-15'>
                                    <PetProfileCard
                                        pet={pet}
                                        styles={{ background: '#2D4373' }}
                                        catImage={catImage}
                                        dogImage={dogImage}
                                        otherAnimalImage={otherAnimal}
                                        viewPet={() => viewPet(pet._id)}
                                        adoptPet={() => adoptThisPet(pet._id)}
                                    />
                                    {/*<div className='card flex-fill shadow-lg' style={{ background: '#2D4373' }}>*/}
                                    {/*    <div className='card-body d-flex flex-column'>*/}
                                    {/*        <h5 className='card-title text-center fw-bold'>{pet.name}</h5>*/}
                                    {/*        {pet.image ? (*/}
                                    {/*            <img src={`${apiUrl}/uploads/${pet.image}`} alt={pet.name}*/}
                                    {/*                 className='card-img-top mb-2 img-fluid'*/}
                                    {/*                 style={{ objectFit: 'cover' }}/>*/}
                                    {/*        ) : (*/}
                                    {/*            (*/}
                                    {/*                pet.species === 'Dog' ? (*/}
                                    {/*                    <img src={dogImage} alt={pet.name}*/}
                                    {/*                         className='card-img-top mb-2 img-fluid'*/}
                                    {/*                         style={{ objectFit: 'cover'}}/>*/}
                                    {/*                ) : (*/}
                                    {/*                    pet.species === 'Cat' ? (*/}
                                    {/*                        <img src={catImage} alt={pet.name}*/}
                                    {/*                             className='card-img-top mb-2 img-fluid'*/}
                                    {/*                             style={{ objectFit: 'cover'}}/>*/}
                                    {/*                    ) : (*/}
                                    {/*                        <img src={otherAnimal} alt={pet.name}*/}
                                    {/*                             className='card-img-top mb-2'*/}
                                    {/*                             style={{ objectFit: 'cover'}}/>*/}
                                    {/*                    )*/}
                                    {/*                )*/}
                                    {/*            )*/}
                                    {/*        )}*/}
                                    {/*        <p className='card-text text-center'>Species: {pet.species}</p>*/}
                                    {/*        <p className='card-text text-center'>Age: {pet.age} Years</p>*/}
                                    {/*        <p className='card-text text-center'>Personality: {pet.personality}</p>*/}
                                    {/*        <div className='d-flex justify-content-center align-items-center mb-2'>*/}
                                    {/*            <p className='card-text mb-0'>Mood: </p>*/}
                                    {/*            <p className={pet.mood === 'Happy' ? 'card-text bg-green ms-2' : pet.mood === 'Excited' ? 'card-text bg-orange ms-2' : 'card-text bg-red ms-2'}>*/}
                                    {/*                {pet.mood} {pet.mood === 'Happy' ? '😊' : pet.mood === 'Excited' ? '🙂' : '😢'}*/}
                                    {/*            </p>*/}
                                    {/*        </div>*/}
                                    {/*        <div className='mt-auto custom-button-group'>*/}
                                    {/*            <button type='button' className='btn btn-success text-white hover-effect'*/}
                                    {/*                    onClick={() => adoptThisPet(pet._id)}>Adopt {pet.name}</button>*/}
                                    {/*            <button type='button' className='btn btn-info text-white hover-effect'*/}
                                    {/*                    onClick={() => viewPet(pet._id)}>View Profile*/}
                                    {/*            </button>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='card text-white d-flex justify-content-center align-items-center shadow-lg' style={{ background: '#2D4373', height: '400px' }}>
                            <h4 className='d-flex justify-content-center align-items-center my-3'>Oops ! No Pets Found In The
                                System, Which Suits With Your Opinion 🤔
                            </h4>
                        </div>
                    )}
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                        {/*<button type='button' className='btn btn-danger text-white hover-effect'*/}
                        {/*        onClick={navigateToHomePage}>Back To Homepage*/}
                        {/*</button>*/}
                        <Button classList={'btn btn-danger text-white hover-effect'}
                                text={'Back To Homepage'}
                                onClick={navigateToHomePage}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(SuitablePets);
