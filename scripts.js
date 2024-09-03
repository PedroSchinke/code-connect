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
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(availableTags.includes(tag))
        }, 500)
    })
}

tagsInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tag = tagsInput.value.trim();
        console.log(verifyAvailableTags(tag));

        if (tag !== "") {
            try {
                const availableTag = await verifyAvailableTags(tag);

                if (availableTag) {
                    const newTag = document.createElement('li');
                    newTag.classList.add('tag-container');
                    newTag.innerHTML = `<p>${tag}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    tagsList.appendChild(newTag);
                    tagsInput.value = '';
                    document.getElementById('error-message')?.remove();
                } else {
                    return setErrorMessage('Não é possível inserir essa tag', tagsInputContainer);
                }
            } catch (error) {
                console.error(error);
                alert('Não foi possível fazer a verificação da tag');
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
                resolve("Projeto publicado com sucesso.")
            } else {
                reject("Erro ao publicar o projeto.")
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
        console.log('deu certo');
    } catch (error) {
        console.log('deu errado:' + error);
    }
})