import '@grafikart/drop-files-element'

const formBox = document.getElementById('formBox')
const formBox2 = document.getElementById('formBox2')
const showFormBox = document.getElementById('showFormBox')
const showFormBox2 = document.getElementById('showFormBox2')
const formBoxClose = document.getElementById('formBoxClose')
const formBoxClose2 = document.getElementById('formBoxClose2')
const productsWidgetButton = document.querySelectorAll('.product_widget button')

// show/hide formBox
if(
    formBox 
    && showFormBox 
    && formBoxClose 
    && showFormBox2 
    && formBox2 
    && formBoxClose2
){
    showFormBox.addEventListener('click', () => {
        formBox.classList.add('is-visible')
    })

    showFormBox2.addEventListener('click', () => {
        formBox2.classList.add('is-visible')
    })

    formBoxClose.addEventListener('click', () => {
        formBox.classList.remove('is-visible')
    })

    formBoxClose2.addEventListener('click', () => {
        formBox2.classList.remove('is-visible')
    })
}

productsWidgetButton.forEach(button => {
    button.addEventListener('click', () =>{
        button
            .parentElement
            ?.parentElement
            ?.querySelector('.product_widgets')
            ?.classList.toggle('is-visible')
    })
})