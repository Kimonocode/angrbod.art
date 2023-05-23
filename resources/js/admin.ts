import '@grafikart/drop-files-element'

const formBox = document.getElementById('formBox')
const showFormBox = document.getElementById('showFormBox')
const formBoxClose = document.getElementById('formBoxClose')
const productsWidgetButton = document.querySelectorAll('.product_widget button')

// show/hide formBox
if(formBox && showFormBox && formBoxClose){
    showFormBox.addEventListener('click', () => {
        formBox.classList.add('is-visible')
    })
    formBoxClose.addEventListener('click', () => {
        formBox.classList.remove('is-visible')
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