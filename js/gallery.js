const galleryElem = document.querySelector("#gallery");


const images = JSON.parse(localStorage.getItem('wedding-photos-App')); 

function createImage(image) {
    const div = document.createElement('div') 
    const imageElem = document.createElement('img');
    imageElem.setAttribute('src', image.image);

    const deleteButton = document.createElement('button');  
    deleteButton.innerHTML = '×'   
    deleteButton.classList.add('deleteButton');
    deleteButton.addEventListener('click', () => {
        console.log('picture deleted')
        
        div.remove();
        console.log(image);
        console.log(images);
        let newArr = images.filter(imageInFilter =>  image.image != imageInFilter.image);
        console.log(newArr);
        localStorage.setItem('wedding-photos-App', JSON.stringify(newArr))
    })

    div.append(imageElem); 
    div.append(deleteButton);
    galleryElem.append(div); 
}

function getImages() {

    for (const image of images) {
        createImage(image);
    }
}

getImages();