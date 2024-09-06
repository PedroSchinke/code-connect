import { availableTags } from "./js/availableTags.js";
import { setErrorMessage } from "./js/setErrorMessage.js";

const uploadBtn = document.getElementById('upload-button');
const inputUpload = document.getElementById('image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
})

function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve({ url: reader.result, name: file.name })
        }

        reader.onerror = () => {
            reject(`Error on reading the file ${file.name}`)
        }

        reader.readAsDataURL(file);
    })
}

const mainImage = document.querySelector('.main-image');
const imageNameContainer = document.querySelector('.image-name-container');
const imageName = imageNameContainer.querySelector('p');

inputUpload.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const fileContent = await readFileContent(file);
            imageNameContainer.style.display = 'flex'
            mainImage.src = fileContent.url;
            imageName.textContent = fileContent.name;
            mainImage.id = '';
        } catch (error) {
            console.error('Error on reading file');
        }
    }
})

const tagsInput = document.getElementById('tags-input');
const tagsList = document.querySelector('.tags-list');
const tagsInputContainer = document.getElementById('tags-input-container');

async function verifyAvailableTags(tag) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (availableTags.includes(tag)) {
                resolve();
            } else if (!availableTags.includes(tag)) {
                reject('Tag unavailable');
            } else {
                reject('Error on verifying this tag');
            }
        }, 500)
    })
}

tagsInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tag = tagsInput.value.trim();

        if (tag !== "") {
            try {
                await verifyAvailableTags(tag);

                const newTag = document.createElement('li');
                newTag.classList.add('tag-container');
                newTag.innerHTML = `<p>${tag}</p> <img src="./img/close-black.svg" class="remove-tag">`
                tagsList.appendChild(newTag);
                tagsInput.value = '';
                document.getElementById('error-message')?.remove();
            } catch (error) {
                setErrorMessage(error, tagsInputContainer);
            }
        }
    }
})

tagsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-tag')) {
        const tagToRemove = event.target.parentElement;
        tagsList.removeChild(tagToRemove);
    }
})

const publishButton = document.querySelector('.publish-button');

async function publishProject(projectName, projectDescription, projectTags) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const itWorked = Math.random() > 0.5;

            if (itWorked) {
                resolve("Project published successfully")
            } else {
                reject("Error on publishing the project")
            }
        }, 500)
    })
}

publishButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const projectTitle = document.getElementById('title').value;
    const projectDescription = document.getElementById('description').value;
    const projectTags = Array.from(tagsList.querySelectorAll('p')).map((tag) => tag.textContent);

    try {
        const result = await publishProject(projectTitle, projectDescription, projectTags);
        console.log('It worked!');
    } catch (error) {
        console.log("It didn't worked:" + error);
    }
})

const discardButton = document.querySelector('.discard-button');

discardButton.addEventListener('click', (event) => {
    event.preventDefault();

    const form = document.querySelector('form');
    form.reset();

    imageNameContainer.style.display = 'none';
    mainImage.id = 'image-icon';
    mainImage.src = './img/image-square-svgrepo-com.svg';
    imageName.textContent = '';

    tagsList.innerHTML = '';
})