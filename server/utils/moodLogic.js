const setMoodForPet = (date) => {
    const currentDate = new Date();
    // Get the time difference (in milliseconds) between two dates ...
    const diffInMs = currentDate - new Date(date);
    // Convert that time difference in milliseconds into days ...
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    // console.log(diffInDays);

    // Check day conditions ...
    if (diffInDays < 1) {
        return 'Happy';
    } else if (diffInDays => 1 && diffInDays <= 3) {
        return 'Excited';
    } else {
        return 'Sad';
    }
}

module.exports = setMoodForPet;