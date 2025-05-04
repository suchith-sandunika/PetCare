const Pet = require("../model/Pet.js");
const setMoodForPet = require("../utils/moodLogic.js");

const getAllPets = async () => {
    try {
        const pets = await Pet.find().lean();
        // identify the mood of the pet ...

        // Check if there are pets in the database ...
        if(!pets) {
            return 'No Pets Found';
        }

        // Add Mood for each pet ...
        return pets.map(pet => {
            let mood = setMoodForPet(pet.createdAt);
            return {
                _id: pet._id,
                name: pet.name,
                image: pet.image,
                species: pet.species,
                age: pet.age,
                personality: pet.personality,
                adopted: pet.adopted,
                adoption_Date: pet.adoption_Date,
                mood,
            };
        });
    } catch (error) {
        return error;
    }
}

const getSpecificPet = async (id) => {
    try {
        // Fetch the pet data related to the id from the database ...
        const pet = await Pet.findById(id);
        // Allocate the pet's mood
        const mood = setMoodForPet(pet.createdAt);

        const petWithMood = {
            name: pet.name,
            image: pet.image,
            species: pet.species,
            age: pet.age,
            personality: pet.personality,
            adopted: pet.adopted,
            adoption_Date: pet.adoption_Date,
            mood,
        }

        return petWithMood;
    } catch (error) {
        return error;
    }
}

const addNewPet = async (name, species, age, personality, image) => {
    try {
        // Create a new Pet and save it in the database ...
        const newPet = await Pet.create({
            name: name,
            image: image,
            species: species,
            age: age,
            personality: personality
        });

        return newPet;
    } catch (error) {
        return error;
    }
}

const updatePet = async (id, name, species, age, personality, image) => {
    try {
        // Update the pet data related to the id ...
        let updatedPet;
        if(image) {
            updatedPet = Pet.findByIdAndUpdate(
                {_id: id},
                { name: name, species: species, age: age, personality: personality, image: image}
            );
        } else {
            updatedPet = Pet.findByIdAndUpdate(
                {_id: id},
                { name: name, species: species, age: age, personality: personality}
            );
        }

        // Check whether the pet data found and updated ...
        if(!updatedPet) {
            return 'Error Occurred in Updating Pet';
        }

        return updatedPet;
    } catch (error) {
        return error;
    }
}

const deletePet = async (id) => {
    try {
        // Delete the pet data related to the id ...
        const deletedPet = Pet.findByIdAndDelete(id);

        // Check whether the pet data found and deleted ...
        if(!deletedPet) {
            return 'Error Occurred in deleting Pet';
        }

        return deletedPet;
    } catch (error) {
        return error;
    }
}

const adoptPet = async (id) => {
    try {
        // Set adopted true for the fetched pet data through id ...
        const adoptedPet = await Pet.findByIdAndUpdate({_id: id}, { adopted: true });

        // Check whether the pet data found and set adopted to true ...
        if(!adoptedPet) {
            return 'Error Occurred in adopting Pet';
        }

        return adoptedPet;
    } catch (error) {
        return error;
    }
}

const FilterByMood = async (mood) => {
    try {
        // fetch all the pets data ...
        const pets = await Pet.find();
        // Define an array to store the pet data (with mood) ...
        let petsDataArray = [];
        // Loop through the pets to find the mood of each pet, create an object, containing pet data with mood and store it in array ...
        pets.forEach((pet) => {
            const petMood = setMoodForPet(pet.createdAt);
            let petWithMood = {
                name: pet.name,
                image: pet.image,
                species: pet.species,
                age: pet.age,
                personality: pet.personality,
                adopted: pet.adopted,
                mood: petMood,
            };
            // push the pet data with mood to the array ...
            petsDataArray.push(petWithMood);
        });
        // filter from the array the pets with the given mood ... (checking the simple, capital variance also) ...
        const petsWithGivenMood = petsDataArray.filter((pet) => pet.mood.includes(mood) || pet.mood.toLowerCase().includes(mood.toLowerCase()) || pet.mood.toUpperCase().includes(mood.toUpperCase()));

        // If there is no pet with given mood found, then return 'No Pets Found' Message ...
        if(!petsWithGivenMood) {
            return 'No Pets Found';
        }

        // Return the pets data with given mood ...
        return petsWithGivenMood;
    } catch (error) {
        return error;
    }
}

const fetchPetsByPersonality = async (species, personality) => {
    try {
        // fetch all the pets data that adopted is false ...
        const pets = await Pet.find({ species: species, adopted: false });
        // Define an array to store the pet data (with mood) ...
        let petsDataArray = [];
        // Loop through the pets to find the mood of each pet, create an object, containing pet data with mood and store it in array ...
        pets.forEach((pet) => {
            const petMood = setMoodForPet(pet.createdAt);
            let petWithMood = {
                name: pet.name,
                image: pet.image,
                species: pet.species,
                age: pet.age,
                personality: pet.personality,
                adopted: pet.adopted,
                mood: petMood,
            };
            // push the pet data with mood to the array ...
            petsDataArray.push(petWithMood);
        });
        // filter from the array the pets with the given mood ... (checking the simple, capital variance also) ...
        const petsWithGivenPersonality = petsDataArray.filter((pet) => pet.personality.includes(personality) || pet.personality.toLowerCase().includes(personality.toLowerCase()) || pet.personality.toUpperCase().includes(personality.toUpperCase()));

        // If there is no pet with given mood found, then return 'No Pets Found' Message ...
        if(!petsWithGivenPersonality) {
            return 'No Pets Found';
        }

        // Return the pets data with given mood ...
        return petsWithGivenPersonality;
    } catch (error) {
        return error;
    }
}

module.exports = { getAllPets, getSpecificPet, addNewPet, updatePet, deletePet, adoptPet, FilterByMood, fetchPetsByPersonality };