import React, {useState} from 'react'
import {toast, ToastContainer} from "react-toastify";
import petImage from "../assets/other.jpg";
import {filterPetsByPersonality} from "../services/api.js";
import SuitablePets from "./SuitablePets.jsx";

const IdentifySuitablePet = () => {
    const [species, setSpecies] = useState('');
    const [personality, setPersonality] = useState('');
    const [isError, setIsError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [suitablePets, setSuitablePets] = useState([]);

    const submitResponse = async () => {
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
    }

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
                            <div className='d-flex justify-content-center align-content-center gap-2'>
                                <button type='button' className='btn btn-primary text-white text-center mt-2'
                                        onClick={submitResponse}>
                                    Submit Your Response
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
export default IdentifySuitablePet
