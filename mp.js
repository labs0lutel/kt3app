const audioUpload = document.getElementById('audioUpload');
const videoUpload = document.getElementById('videoUpload');
const audio = document.getElementById('audio');
const video = document.getElementById('video');

audioUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        audio.src = e.target.result;
        audio.play();
    }
    reader.readAsDataURL(file);
});

videoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        video.src = e.target.result;
        video.play();
    }
    reader.readAsDataURL(file);
});