import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate} from "react-router-dom";
import { adoptPet } from "../services/api.js";
import logo2 from "../assets/logo4.jpg";
import logo from "../assets/logo4.jpg";
import dogImage from "../assets/image.png";
import catImage from "../assets/catImage2.png";
import otherAnimal from "../assets/other.jpg";

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
    const adoptThisPet = async (id) => {
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
    }

    const viewPet = (id) => {
        // navigate to viewPetDetails page ...
        navigate(`/profile/${id}`);
    }

    const navigateToHomePage = () => {
        navigate('/');
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
                                                <button type='button' className='btn btn-success text-white'
                                                        onClick={() => adoptThisPet(pet._id)}>Adopt {pet.name}</button>
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
                        <p className='d-flex justify-content-center align-items-center'>Oops ! No Pets Found In The
                            System, Which Suits With Your Opinion 🤔</p>
                    )}
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        <button type='button' className='btn btn-info text-white'
                                onClick={navigateToHomePage}>Back To Homepage
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SuitablePets
