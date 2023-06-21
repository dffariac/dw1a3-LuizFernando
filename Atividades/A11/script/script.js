const inputCep = document.querySelector('[data-input-cep]')
const btnCep = document.querySelector('[data-btn-cep]')
const resultadoCep = document.querySelector('[data-resultado-cep]')
const messaError = document.querySelector('[data-message-error]')
const submitForm = (event) => {
  const cepValue = inputCep.value
  if(event.key === 'Enter'){
    event.preventDefault()
    checksInputs(cepValue)
  }
}
const checksInputs = (cep) => {
  if(cep.trim() === ''){
    messaError.classList.add('messageActive')
    messaError.innerHTML = 'Digite algo no campo primeiro!'
    inputCep.classList.add('inputError')
    resultadoCep.innerHTML = ``
  }else if(cep.length > 8 || cep.length < 8){
    messaError.classList.add('messageActive')
    messaError.innerHTML = 'Cep inválido, cep geralmente são 8 números'
    inputCep.classList.add('inputError')
    resultadoCep.innerHTML = ``
  }
  else{
    buscaCep(cep)
    messaError.classList.remove('messageActive')
    inputCep.classList.remove('inputError')
  }
}
const handleClick = (event) => {
  event.preventDefault()
  const cepValue = inputCep.value
  checksInputs(cepValue) ? buscaCep(cepValue) : ''
}
const buscaCep = (cep) => {
  const apiCep = `https://viacep.com.br/ws/${cep}/json/`
  fetch(apiCep)
    .then(response => response.json())
    .then((cep => {
        if(cep.erro){
          inputCep.classList.add('inputError')
          messaError.classList.add('messageActive')
          messaError.innerHTML = 'Não foi possível localizar seu cep!'
          resultadoCep.innerHTML = ``
        }else{
          messaError.classList.remove('messageActive')
          inputCep.classList.remove('inputError')
            resultadoCep.innerHTML =             
            ` <p>Cep : ${cep.cep}</p>
              <p>Rua : ${cep.logradouro}</p>
              <p>Bairro : ${cep.bairro}</p>
              <p>Cidade : ${cep.localidade}</p>
              <p>Estado : ${cep.uf}</p>`
        }
    }))
}
inputCep.addEventListener('keypress', submitForm)
btnCep.addEventListener('click', handleClick)