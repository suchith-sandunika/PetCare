import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_SERVER_URL || 'http://localhost:5000/api/v1';

// Set the backend api with axios ...
const Api = axios.create({
    baseURL: apiUrl,
    headers: {
        "Content-Type": "application/json",
    }
});

// api calls ...

// api call to fetch all pets data ...
const getPets = () => Api.get('/pets');

// api call to fetch pet data by id ...
const getPetById = (id) => Api.get(`/pets/${id}`);

// api call to create a new pet ...
const createPet = (formData) => Api.post('/pets', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
});

// api call to update a pet by id ...
const updatePetDetails = (id, formData) => Api.put(`/pets/${id}`, formData, {
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

// api call to delete a pet by id ...
const deletePetDetails = (id) => Api.delete(`/pets/${id}`);

// api call to adopt a pet ...
const adoptPet = (id) => Api.patch(`/pets/${id}/adopt`);

// api call to filter a pet through a given mood ...
const filterPetByMood = (mood) => Api.get(`/pets/filter/${mood}`);

// api call to filter pets data through personality ...
const filterPetsByPersonality = (species, personality) => Api.get(`/pets/filter/${species}/${personality}`);

// api call to download the pet adaptation report pdf ...
const downloadPDF = (id) => Api.get(`/pets/generate-pdf/${id}`, {
    responseType: 'blob' // Important for binary data like PDFs
});

export { apiUrl, getPets, getPetById, createPet, updatePetDetails, deletePetDetails, adoptPet, filterPetByMood, filterPetsByPersonality, downloadPDF }