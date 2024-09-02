const uploadBtn = document.getElementById("upload-button");
const inputUpload = document.getElementById("image-upload");

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
const imageName = document.querySelector('.image-name-container p');

inputUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (file) {
        try {
            const fileContent = await readFileContent(file);
            mainImage.src = fileContent.url;
            imageName.textContent = fileContent.name;
        } catch (error) {
            console.error('Error on reading file');
        }
    }
})