
const caixaescreve = document.getElementById("caixa-escreve");
const boxlista = document.getElementById("box-lista");
function addTask(){
    if(caixaescreve.value === ''){
        alert("Você deve escrever algo primeiro");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = caixaescreve.value;
        boxlista.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    caixaescreve.value = "";
    SalvarInformações();
}

boxlista.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("verificado");
        SalvarInformações();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        SalvarInformações();
    }
}, false);

function SalvarInformações(){
    localStorage.setItem("data", boxlista.innerHTML);
}
function MostrarTarefas(){
    boxlista.innerHTML = localStorage.getItem("data");
}
MostrarTarefas();

function toggleMenu() {
    const menuLateral = document.getElementById('menuLateral');
    menuLateral.classList.toggle('show');
}