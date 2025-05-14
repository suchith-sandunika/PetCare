import React from "react";
import { apiUrl } from "../services/api.js";
import Button from "./Button.jsx";

const PetProfileCard = ({ styles, pet, catImage, dogImage, otherAnimalImage, viewPet, adoptPet }) => {
    return (
        <div className='card flex-fill hover-effect cursor-pointer shadow-lg' style={styles}>
            <div className='card-body d-flex flex-column'>
                <h5 className='card-title text-center fw-bold text-white'>{pet.name}</h5>
                {pet.image ? (
                    <img src={`${apiUrl}/uploads/${pet.image}`} alt={pet.name}
                         className='card-img-top mb-2 img-fluid img-class-style rounded-bottom'/>
                ) : (
                    pet.species === 'Dog' ? (
                        <img src={dogImage} alt={pet.name}
                             className='card-img-top mb-2 img-fluid rounded-bottom'
                             style={{objectFit: 'cover'}}/>
                    ) : (
                        pet.species === 'Cat' ? (
                            <img src={catImage} alt={pet.name}
                                 className='card-img-top mb-2 img-fluid rounded-bottom'
                                 style={{objectFit: 'cover'}}/>
                        ) : (
                            <img src={otherAnimalImage} alt={pet.name}
                                 className='card-img-top mb-2 rounded-bottom'
                                 style={{objectFit: 'cover'}}/>
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
                    {pet.adopted || true ? (
                        // <button type='button' className='btn btn-secondary text-white hover-effect' style={{ cursor: 'none' }}
                        //         disabled>
                        //     Adopted
                        // </button>
                        <Button
                            classList={'btn btn-secondary text-white hover-effect'}
                            text={'Adopted'}
                            onClick={() => adoptPet}
                        />
                    ) : (
                        // <button type='button' className='btn btn-success text-white hover-effect'
                        //         onClick={() => adoptThisPet(pet._id)}>
                        //     Adopt {pet.name}
                        // </button>
                        <Button
                            classList={'btn btn-success text-white hover-effect'}
                            text={`Adopt ${pet.name}`}
                            onClick={adoptPet}
                        />
                    )}
                    {/*<button type='button' className='btn btn-info text-white hover-effect'*/}
                    {/*        onClick={() => viewPet(pet._id)}>*/}
                    {/*    View Profile*/}
                    {/*</button>*/}
                    <Button classList={'btn btn-info text-white hover-effect'}
                            text={'View Profile'}
                            onClick={viewPet}
                    />
                </div>
            </div>
        </div>
    )
}

export default PetProfileCard;