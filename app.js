let contenedorHTML = document.getElementById("contenedor");
const formularioA = document.getElementById("formularioA")
const contenedorPosts = [];
const title = document.getElementById("title");
const body = document.getElementById("body");
const formulario = document.getElementById("formulario");
const fragment = document.createDocumentFragment();

const entradaBuscador = document.getElementById("buscador");
const buscadorBtn = document.getElementById("btnBuscador");

let contador = 1;

fetch("https://jsonplaceholder.typicode.com/posts")
.then(response=>response.json())
.then(datos =>{
    contenedorPosts.push(datos);
    buscador();
});

function pintar(){
    contenedorHTML.innerHTML = "";
    for(let i = 0;i < contenedorPosts[0].length;i++){
        const {id,body,title} = contenedorPosts[0][i];
        const div = document.createElement("div");
        div.className = "col-lg-6 col-xs-12 mt-2";
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h4>${title}</h4>
                    <p><em>${body}</em></p>
                    <p>${id}</p>
                </div>
                <div class="card-footer">
                    <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#Modal" onclick="actualizar(${id})">Update</button>
                    <button class="btn btn-outline-danger" onclick="eliminar(${id})">Delete</button>
                </div>
            </div>
        `;
        fragment.appendChild(div);
    }
    contenedorHTML.appendChild(fragment)
}

function eliminar(id){
    for(let i = 0;i < contenedorPosts[0].length;i++){
        if(contenedorPosts[0][i].id === id){
            contenedorPosts[0].splice(i,1);
        }
    }
    pintar();
}

function agregar(e){
    e.preventDefault();
    error(e);
    pintar();
    formulario.reset();
}

function actualizar (id){
    const title = document.getElementById("titleA");
    const body = document.getElementById("bodyA");
    let temporal = {};
    temporal = buscar(id);

    title.value = temporal.title;
    body.value = temporal.body;

    if(contador === 1){
        formularioA.addEventListener("submit",(e)=>{
            e.preventDefault();
            temporal.title = title.value;
            temporal.body = body.value;
            pintar();
        })
    }
    contador++;
}
function buscar(id){
    for (let i = 0;i < contenedorPosts[0].length;i++){
        if(contenedorPosts[0][i].id == id){
            return contenedorPosts[0][i];
        }
    }
}

function error(e){
    const newPost = {};
    for(let i = 0;i < e.target.length;i++){
        if(e.target[i].type == "text"){
            if(!e.target[i].value ){
                const error = document.getElementById("error");
                error.innerHTML +=`El campo ${e.target[i].id} esta vacio <br>`;
                error.className = "alert alert-danger"
                setTimeout(()=>{
                    error.innerHTML =``;
                    error.className = ""
                },2000)
            }else{
                newPost[e.target[i].id] = e.target[i].value;
            }
        }
    }
    if("body" in newPost && "title" in newPost){
        newPost.id = contenedorPosts[0].length + 1;
        contenedorPosts[0].push(newPost);
    }
};

function buscador(){
    const texto = entradaBuscador.value;
    contenedorHTML.innerHTML = "";
    for(let i = 0;i < contenedorPosts[0].length;i++){
        const {id,body,title} = contenedorPosts[0][i];
        if(body.indexOf(texto) != -1){
            contenedorHTML.innerHTML += `
            <div class="col-lg-6 col-xs-12 mt-2">
                <div class="card">
                    <div class="card-body">
                        <h4>${title}</h4>
                        <p><em>${body}</em></p>
                        <p>${id}</p>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-outline-warning" data-toggle="modal" data-target="#Modal" onclick="actualizar(${id})">Update</button>
                        <button class="btn btn-outline-danger" onclick="eliminar(${id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
        }
    }
    console.log("hola")
}

buscadorBtn.addEventListener("click",buscador)

formulario.addEventListener("submit",agregar)