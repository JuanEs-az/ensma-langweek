import "@babel/polyfill";
import './styles.css';
import * as Text from './js/text-provider'

//DOM OBJ
const table = document.querySelector(".textos-table")
const loading = document.querySelector(".loading-texts")

const submit = document.querySelector("#submit-text")
const inputs = {
    title: document.querySelector(".title-input"),
    author: document.querySelector(".author-input"),
    link: document.querySelector(".link-input")
}
const formadvice = document.querySelector(".form-advice")
//Mostrar los textos publicados hasta el momento

Text.getAll().then(got => {
    loading.classList.add("d-none")
    if( got.length > 0 ){
        got.forEach(({title, author, date, link}) => {
            let tr = document.createElement("tr")
            let html = 
            `
            <td>${title}</td>
            <td>${author}</td>
            <td>${date}</td>
            <td><a class="button" href="${link}">Leer...</a></td>
            `
            tr.innerHTML = html
            table.appendChild(tr)
        });
    }else{
        let tr = document.createElement("tr")
        let html = 
        `
        <td>--</td>
        <td>--</td>
        <td>--</td>
        <td>--</td>
        `
        tr.innerHTML = html
        table.appendChild(tr)
    }
})

//Publicar Textos
submit.addEventListener('click', () => {
    const title = inputs.title.value
    const author = inputs.author.value 
    const link = inputs.link.value
    if(!(title.length > 0) || !(author.length > 0) || !(link.length > 0)){
        formadvice.innerText = "Debes de rellenar todos los campos"
        formadvice.classList.add("bg-danger")
        formadvice.classList.remove("invisible")
        return
    }
    try{
        new URL(link)
    }catch{
        formadvice.innerText = "Este link no existe"
        formadvice.classList.add("bg-danger")
        formadvice.classList.remove("invisible")
        return
    }
    const sure = confirm("¿Estás seguro? No podrás borrar el texto tras esta acción");
    if(sure){
        Text.save(title, author, link).then(() => {
            formadvice.innerText = "¡Tu texto ha sido publicado! Recarga la pagina para verlo"
            formadvice.classList.remove("bg-danger")
            formadvice.classList.add("bg-info")
            formadvice.classList.remove("invisible")
        }).catch(() => {
            formadvice.innerText = "Ha ocurrido un error en el servidor, prueba intentandolo más tarde o reporta el problema"
            formadvice.classList.add("bg-danger")
            formadvice.classList.remove("invisible")
        })
    }
})