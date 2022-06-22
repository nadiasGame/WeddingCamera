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
    sendNotification();
    localStorage.setItem('wedding-photos-App', JSON.stringify(images));
    
});

newPicturesElem.addEventListener ('click', () => {
    streamElem.style.display='block' 
    pictureElem.style.display='none' 
    takePictureButton.style.display = 'block'
});

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

window.addEventListener('load', async () => {
    if('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('service-worker.js');
        } catch(err) {
            console.error('Whooopsie!', err)
        }
    }
});

function sendNotification() {
    if (notificationPermission !== "granted") { return; } // har dom godkänt notiser, då kan vi fortsätta
    let text = "Klick! Din bild är nu sparad, klicka här för att se den i galleriet!";

    const notification = new Notification('Bröllopsfotografen', {
      body: text,
      icon: './icons/notification.png'
    });

    notification.onclick = function() {
      window.open('gallery.html');
    };
}


var notificationPermission = "";
function askNotification() {
    if (!("Notification" in window)) { 
      alert("This browser does not support desktop notifications");
      return;
    }
    Notification.requestPermission().then(function(result) { 
      if (result === 'denied') {
        notificationPermission = "denied";
        console.log("Permission wasn't granted. Allow a retry.");
        return;
      }
      if (result === 'default') {
        notificationPermission = "default";
        console.log('The permission request was dismissed.');
        return;
      }
      notificationPermission = "granted";
      console.log('Permission was granted for notifications');
    });
  }
askNotification();

cameraAutoStart();
getImages();