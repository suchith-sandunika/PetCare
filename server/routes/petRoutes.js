const express = require("express");
const upload = require("../middleware/imageUpload.js");
const { fetchPets, fetchSpecificPet, createNewPet, updateSpecificPet, deleteSpecificPet, adoptSpecificPet, fetchPetsDataRelatedToMood, fetchPetsDataRelatedToPersonality, downloadPDF } = require("../controllers/petController.js");

const router = express.Router();

// Route to get all pets ...
router.get("/", fetchPets);

// Route to get a specific pet ...
router.get("/:id", fetchSpecificPet);

// Route to add a new pet ...
router.post("/", upload.single('image'), createNewPet);

// Route to update a pet ...
router.put("/:id", upload.single('image'), updateSpecificPet);

// Route to delete a pet ...
router.delete("/:id", deleteSpecificPet);

// Route to adopt a pet ...
router.patch("/:id/adopt", adoptSpecificPet);

// Route to get pets by mood ...
router.get("/filter/:mood", fetchPetsDataRelatedToMood);

// Route to get pets by personality ...
router.get('/filter/:species/:personality', fetchPetsDataRelatedToPersonality);

// Route to get download pet adaptation report ...
router.get('/generate-pdf/:id', downloadPDF);

module.exports = router;