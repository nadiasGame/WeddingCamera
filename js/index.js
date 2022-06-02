const cameraButton = document.querySelector('.button-div-camera');
const videoElem  = document.querySelector('#camera');
const takePictureButton = document.querySelector('.button-div');
const galleryElem = document.querySelector('#gallery')
const streamElem = document.querySelector('.stream-window');
const pictureElem = document.querySelector('.picture-window')
const newPicturesElem = document.querySelector('.button-div-pic');


const canvas = document.querySelector('#picture');
const ctx = canvas.getContext('2d');
canvas.width = 342;
canvas.height = 310;


let stream;
let images;

let imagesStored = JSON.parse(localStorage.getItem('wedding-photos-App'))
if (imagesStored) {
    images = imagesStored
} else {
    images = [];
}

/* stream.html // Autostreamar kameran när behörighet ges*/
async function cameraAutoStart(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) { // browser support
            stream = await navigator.mediaDevices.getUserMedia({video:true, audio:false});
            videoElem.srcObject = stream;
            videoElem.load();
            videoElem.play();
    }
};


takePictureButton.addEventListener ('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    takePictureButton.style.display='none'
    streamElem.style.display='none' 
    pictureElem.style.display='block' 
    images.push({
        id: images.lenght,
        image: imageData
    });
    localStorage.setItem('wedding-photos-App', JSON.stringify(images));
});

newPicturesElem.addEventListener ('click', () => {
    streamElem.style.display='block' 
    pictureElem.style.display='none' 
    takePictureButton.style.display = 'block'
});


function newFunction() {
    cameraAutoStart();
}

function createImage(image){
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    galleryElem.append(imageElem);

};

function getImages(){
    for (let image of images){
        createImage(image);
    }

};

cameraAutoStart();
getImages();