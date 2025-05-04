import React, { memo, useCallback, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import petImage from "../assets/other.jpg";
import { filterPetsByPersonality } from "../services/api.js";
import SuitablePets from "./SuitablePets.jsx";

const IdentifySuitablePet = () => {
    const [species, setSpecies] = useState('');
    const [personality, setPersonality] = useState('');
    const [isError, setIsError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [suitablePets, setSuitablePets] = useState([]);

    const navigate = useNavigate();

    const submitResponse = useCallback(async () => {
        // check whether the fields are empty or not ...
        if (!species || !personality) {
            setIsError(true);
            return;
        }

        try {
            const response = await filterPetsByPersonality(species, personality);
            console.log(response);
            if(response.status === 200) {
                setIsLoading(true);
                setSuitablePets(response.data);
            } else {
                setSuitablePets([]);
            }
        } catch (error) {
            console.log(error);
            return;
        }
    }, [isLoading, suitablePets]);

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
            { !isLoading && (
                <div className='card w-50'>
                    <div className='card-header bg-white border-0'>
                        <div className='card-title'>
                            <h4 className='fw-bold d-flex justify-content-center align-items-center'>Choose A Pet For
                                Your
                                Opinion
                            </h4>
                        </div>
                    </div>
                    <div className='card-body'>
                        <form>
                            <div
                                className='card-img img-fluid d-flex justify-content-center align-items-center border-2'>
                                <img src={petImage} alt={petImage} className='pet-img-size'/>
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
                                <label htmlFor='personality' className='form-label'>Personality <span
                                    className='bg-red'>*</span></label>
                                <input type='text' id='personality' name='personality'
                                       placeholder='Enter Pet Personality'
                                       className='form-control' value={personality}
                                       onChange={(e) => setPersonality(e.target.value)}/>
                                {!personality && isError && (
                                    <span className='bg-red'>Personality is Required</span>
                                )}
                            </div>
                            <div className='mt-auto custom-button-group'>
                                <button type='button' className='btn btn-primary text-white'
                                        onClick={submitResponse}>
                                    Submit Your Response
                                </button>
                                <button type='button' className='btn btn-danger text-white'
                                        onClick={cancelOperation}>Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isLoading && (
                <SuitablePets data={suitablePets}/>
            )}
        </div>
    )
}
export default memo(IdentifySuitablePet);
