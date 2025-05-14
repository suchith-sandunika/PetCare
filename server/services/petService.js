const Pet = require("../model/Pet.js");
const setMoodForPet = require("../utils/moodLogic.js");

const getAllPets = async () => {
    return await Pet.find().lean();
}

const getSpecificPet = async (id) => {
    return await Pet.findById(id).lean();
}

const addNewPet = async (name, species, age, personality, image) => {
    return await Pet.create({
        name: name,
        image: image,
        species: species,
        age: age,
        personality: personality
    });
}

const updatePet = async (name, species, age, personality, image, id) => {
    let updatePet
    if(!image) {
        updatePet = await Pet.findByIdAndUpdate(id,
            {
                name: name,
                species: species,
                age: age,
                personality: personality
            },
            {
                new: true
            }
        );
    } else {
        updatePet = await Pet.findByIdAndUpdate(id,
            {
                name: name,
                species: species,
                age: age,
                personality: personality,
                image: image
            },
            {
                new: true
            }
        );
    }

    return updatePet;
}

const deletePet = async (id) => {
    return await Pet.findByIdAndDelete(id);
}

const adoptPet = async (id) => {
    return await Pet.findByIdAndUpdate(id,
        {
            adopted: true
        },
        {
            new:
                true
        }
    );
}

const filterByMood = async (mood) => {
    return await Pet.find({ mood: mood }).lean();
}

const filterByPersonality = async (personality) => {
    return await Pet.find({ personality: personality }).lean();
}

module.exports = { getAllPets, getSpecificPet, addNewPet, updatePet, deletePet, adoptPet, filterByMood, filterByPersonality };