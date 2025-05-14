// import React from "react";
// import {apiUrl} from "../services/api.js";
// import petImage from "../../public/logo.jpg";
// import '../styles/styles.css';
//
// const PetDataCard = ({ updatedImage, updatedImagePath, img, image, name, species, age, personality }) => {
//     return (
//         <form>
//             <div className='card-img img-fluid d-flex justify-content-center align-items-center border-2'>
//                 {updatedImage ? (
//                     <img src={updatedImagePath} alt={image} className='pet-image-size rounded-2'/>
//                 ) : (
//                     image ? (
//                         <img src={`${apiUrl}/uploads/${image}`} alt={image} className='pet-image-size rounded-2'/>
//                     ) : (
//                         <img src={petImage} alt={petImage} className='pet-image-size rounded-2'/>
//                     )
//                 )}
//             </div>
//             <div className='form-group mt-2'>
//                 <label htmlFor='image' className='form-label text-white'>Image</label>
//                 <input type='file' name='image' className='form-control text-white' accept='image/*'
//                        style={{background: 'cornflowerblue'}}
//                        onChange={handleImageChange}/>
//             </div>
//             <div className='form-group mt-2'>
//                 <label htmlFor='name' className='form-label text-white'>Name <span className='bg-red'>*</span></label>
//                 <input type='text' id='name' name='name' placeholder='Enter Pet Name'
//                        style={{background: 'cornflowerblue'}}
//                        className='form-control text-white' value={name} onChange={(e) => setName(e.target.value)}/>
//                 {!name && isError && (
//                     <span className='bg-red'>Name is Required</span>
//                 )}
//             </div>
//             <div className='form-group mt-2'>
//                 <label htmlFor='species' className='form-label text-white'>Species <span
//                     className='bg-red'>*</span></label>
//                 <input type='text' id='species' name='species' placeholder='Enter Pet Species'
//                        className='form-control text-white' value={species} style={{background: 'cornflowerblue'}}
//                        onChange={(e) => setSpecies(e.target.value)}/>
//                 {!species && isError && (
//                     <span className='bg-red'>Species is Required</span>
//                 )}
//             </div>
//             <div className='form-group mt-2'>
//                 <label htmlFor='age' className='form-label text-white'>Age (in years) <span className='bg-red'>*</span></label>
//                 <input type='number' id='age' name='age' placeholder='Enter Pet Age'
//                        style={{background: 'cornflowerblue'}}
//                        className='form-control text-white' value={age} onChange={(e) => setAge(e.target.value)}/>
//                 {!age && isError && (
//                     <span className='bg-red'>Age is Required</span>
//                 )}
//             </div>
//             <div className='form-group mt-2'>
//                 <label htmlFor='personality' className='form-label text-white'>Personality <span
//                     className='bg-red'>*</span></label>
//                 <input type='text' id='personality' name='personality' placeholder='Enter Pet Personality'
//                        className='form-control text-white' value={personality} style={{background: 'cornflowerblue'}}
//                        onChange={(e) => setPersonality(e.target.value)}/>
//                 {!personality && isError && (
//                     <span className='bg-red'>Personality is Required</span>
//                 )}
//             </div>
//             <div className='custom-button-group mt-3'>
//                 <button type='button' className='btn btn-warning text-white hover-effect'
//                         onClick={() => updatePet(petId)}>
//                     Update the Pet Details
//                 </button>
//                 <button type='button' className='btn btn-danger text-white hover-effect'
//                         onClick={() => deletePet(petId)}>
//                     Remove Pet
//                 </button>
//                 {petAdopted && petId && (
//                     <button type='button' className='btn text-white hover-effect' style={{background: 'green'}}
//                             onClick={() => downloadPetPDF(petId)}>
//                         Download Adaptation Report
//                     </button>
//                 )}
//                 <button type='button' className='btn btn-info text-white hover-effect' style={{background: 'orange'}}
//                         onClick={cancelOperation}>
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     )
// }
//
// export default PetDataCard;