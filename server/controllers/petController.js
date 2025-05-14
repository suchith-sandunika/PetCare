const PDF = require('pdfkit');
const fs = require('fs');
const path = require('path');
const { getAllPets, getSpecificPet, addNewPet, updatePet, deletePet, adoptPet, filterByMood, fetchPetsByPersonality } = require("../services/petService.js");

const fetchPets = async (req, res) => {
    await getAllPets()
        .then((result) => {
            console.log(result);
            return res.status(200).json({ message: 'Pet Details Fetched Successfully', data: result });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const fetchSpecificPet = async (req, res) => {
    const id = req.params.id;

    // Validate the id ...
    if(!id) {
        return res.status(404).send("Id is required");
    }

    await getSpecificPet(id)
        .then((result) => {
            console.log(result);
            return res.status(200).json({ message: 'Pet Details Updated Successfully', data: result });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const createNewPet = async (req, res) => {
    const { name, species, age, personality} = req.body;

    // Check the relevant fields are empty or not ...
    if(!name || !species || !age || !personality) {
        return res.status(400).send("Pet Name, Species, age, personality, mood and Adopted Status is Required");
    }

    // set the image filename ...
    const imageName = req.file ? req.file.filename : null;
    console.log('Uploaded Image:', imageName);

    await addNewPet(name, species, age, personality, imageName)
        .then((result) => {
            console.log(result);
            return res.status(201).json({ message: 'Pet Added Successfully', data: result });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const updateSpecificPet = async (req, res) => {
    const id = req.params.id;
    const { name, species, age, personality } = req.body;

    // Check the relevant fields are empty or not ...
    if(!id || !name || !species || !age || !personality) {
        return res.status(400).send("Pet Name, species, age, personality, id is required");
    }

    // set the image filename ...
    const imageName = req.file ? req.file.filename : null;
    console.log('Uploaded Image:', imageName);

    await updatePet(id, name, species, age, personality, imageName)
        .then((result) => {
            console.log(result);
            return res.status(200).json({ message: 'Pet Details Updated Successfully', data: result });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const deleteSpecificPet = async (req, res) => {
    const id = req.params.id;

    // Validate the id ...
    if (!id) {
        return res.status(400).send("Pet id is required");
    }

    await deletePet(id)
        .then((result) => {
            console.log(result);
            return res.status(200).send('Pet Details Deleted Successfully');
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const adoptSpecificPet = async (req, res) => {
    const id = req.params.id;

    // Validate the id ...
    if (!id) {
        return res.status(400).send("Pet id is required");
    }

    await adoptPet(id)
        .then((result) => {
            console.log(result);
            return res.status(200).send('Pet Adopted Successfully');
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const fetchPetsDataRelatedToMood = async (req, res) => {
    const { mood } = req.params;

    await filterByMood(mood)
        .then((result) => {
            console.log(result);
            return res.status(200).json({ message: 'Pet Details Fetched Successfully', data: result });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const fetchPetsDataRelatedToPersonality = async (req, res) => {
    const { species, personality } = req.params;

    if(!species || !personality) {
        return res.status(400).send('Pet Species and Personality Required');
    }

    await fetchPetsByPersonality(species, personality)
        .then((result) => {
            console.log(result);
            return res.status(200).json({ message: 'Pet Details Fetched Successfully', data: result });
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    );
}

const downloadPDF = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send("Pet ID is required to download adaptation PDF");
        }

        try {
            const pet = await getSpecificPet(id);

            if(!pet) {
                return res.status(404).send('No Pets Found For Id');
            }

            if(pet.adopted === false) {
                return res.status(400).send('To generate a report, the pet must be adopted');
            }

            const doc = new PDF({ margin: 30, size: 'A4' });

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="Pet Adaptation Report.pdf"');

            doc.pipe(res);

            doc.fontSize(20).text('Pet Adaptation Report', { align: 'center' });
            doc.moveDown();

            doc
                .fontSize(14)
                .fillColor('black')
                .text(`Pet Name: ${pet.name}`)
                .text(`Related Species: ${pet.species}`)
                .text(`Age: ${pet.age}`)
                .text(`Personality: ${pet.personality}`)
                .text(`Mood: ${pet.mood}`)

            // If pet has an image, display it ...
            if(pet.image !== null) {
                const imagePath = path.join(__dirname, '../uploads', pet.image);

                if(fs.existsSync(imagePath)) {
                    doc.image(imagePath, {
                        fit: [150, 150],
                        align: 'center',
                        valign: 'center',
                    });
                } else {
                    doc.text('(Image Not Found)');
                }

                doc.moveDown().moveDown();
            }

            doc.end();
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = { fetchPets, fetchSpecificPet, createNewPet, updateSpecificPet, deleteSpecificPet, adoptSpecificPet, fetchPetsDataRelatedToMood, fetchPetsDataRelatedToPersonality, downloadPDF };