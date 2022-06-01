const notificationsButton = document.querySelector('#grant-button');
const showNotificationButton = document.querySelector('#notifications-button');
const pictureElem = document.querySelector('#gallery');
const cameraButton = document.querySelector('#start-camera');
const videoElem = document.querySelector('#camera');
const takePictureButton = document.querySelector('#take-picture');
const canvas = document.querySelector('#picture');
const galleryElem = document.querySelector('#gallery');
const ctx = canvas.getContext('2d');
let stream;
const images = [];

let picturesFromStorage = JSON.parse(localStorage.getItem('myPictures'));
let imagesFromStorage = JSON.parse(localStorage.getItem('gallery'));
let notificationPermission = '';

/*function createNotification() {
    const text = 'Detta är en notifikation!';

    const notification = new Notification('Notis', { body: text });

    notification.addEventListener('click', () => {
        window.open('https://localhost:4000');
    });
}

function requestNotificationsPermission() {
    Notification.requestPermission().then((permission) => {
        console.log(permission);
        notificationPermission = permission;
    });
}

notificationsButton.addEventListener('click', () => {
    requestNotificationsPermission();
});

showNotificationButton.addEventListener('click', () => {
    if (notificationPermission === 'granted') {
        createNotification();
    }
});*/




/*function createPictureItem(picture) {
    const pictureElem = document.createElement('li');
    pictureElem.innerHTML = picture.task;
    pictureElem.append(pictureElem);

  pictureElem.addEventListener('click', () => {
        picturesFromStorage = JSON.parse(localStorage.getItem('myPictures'));
        /*
        1. Ta bort vald bild från arrayen (använd filter() eller en splice())
        2. Spara den nya arrayen till localStorage
       */ 
       /* console.log(picture);
   pictureElem.remove();

      picturesFromStorage = picturesFromStorage.filter((pictureItem) => {
            console.log(pictureItem);
            if (pictureItem.task !== picture.task) {
                return pictureItem;
            }
        });

        saveToLocalStorage(picturesFromStorage);

       /** En variant med splice istället */

       // Vi behöver först hitta indexet vår todo ligger på i arrayen
    //    const index = picturesFromStorage.findIndex((pictureItem) => pictureItem.task === picture.task);
    //    picturesFromStorage.splice(index, 1);
    //    saveToLocalStorage(picturesFromStorage);

    

function displayPictures(pictures) {
    for(const picture of pictures) {
        console.log(picture);
        createPictureItem(picture);
    }
}

function saveToLocalStorage(pictures) {
    localStorage.setItem('myPictures', JSON.stringify(pictures));
}

/*async function getPictures() {
    const response = await fetch('https://awesome-todo-api.herokuapp.com/tasks');
    const data = await response.json();

    console.log(data);
    displayPictures(data.pictures);
    saveToLocalStorage(data.pictures);
}

function requestNotificationPermission() {
    Notification.requestPermission().then((permission) => {
        notificationPermission = permission;

        loadPictures();
    });
}

function createNotification(text) {
    console.log(notificationPermission);
    if (notificationPermission === 'granted') {
        const icon = 'icons/icon-192.png';

        const notification = new Notification('Awesome Picture App', { body: text, icon: icon });

        notification.addEventListener('click', () => {
            getPictures();
        });
    }
}*/

/*function loadPictures() {
    if (picturesFromStorage && picturesFromStorage.length > 0) {
        createNotification('Dina pictures kommer från localstorage och kan vara gamla. Vill du göra en uppdatering?');
        displayPictures(picturesFromStorage);
    } else {
        createNotification('Du har de senaste!');
        getPictures();
    }
}*/

window.addEventListener('load', async () => {
    if('serviceWorker' in navigator){
        try {
            await navigator.serviceWorker.register('service-worker.js');
        } catch(err) {
            console.error('Whooopsie!', err)
        }
    }
});

//requestNotificationPermission();

cameraButton.addEventListener('click', async () => {
    if ('mediaDevices' in navigator) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        console.log(stream);
        videoElem.srcObject = stream;
    }
});

takePictureButton.addEventListener('click', () => {
    ctx.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png'); // Konverterar det till en png-bild

    images.push({
        id: images.length,
        image: imageData        
    });

    localStorage.setItem('cameraApp', JSON.stringify(images));
});

function createImage(image) {
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);
console.log(image)
    galleryElem.append(imageElem);
}

function getImages() {
    const images = JSON.parse(localStorage.getItem('cameraApp'));

    for(const image of images) {
        createImage(image);
    }
}

getImages();

galleryElem.addEventListener('click', () => {
    /*
    1. Ta bort vald todo från arrayen (använd filter() eller en splice())
    2. Spara den nya arrayen till localStorage
   */ 
    console.log(gallery);
    galleryElem.remove();
});

