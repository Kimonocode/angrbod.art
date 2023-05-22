import '@grafikart/drop-files-element'

const formBox = document.getElementById('formBox')
const showFormBox = document.getElementById('showFormBox')
const formBoxClose = document.getElementById('formBoxClose')

if(formBox && showFormBox && formBoxClose){
    showFormBox.addEventListener('click', () => {
        formBox.classList.add('is-visible')
    })
    formBoxClose.addEventListener('click', () => {
        formBox.classList.remove('is-visible')
    })
}