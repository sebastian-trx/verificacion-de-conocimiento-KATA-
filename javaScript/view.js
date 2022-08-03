import { controller } from "./controller.js";
import { model } from "./model.js";
export let view = {
  render: async function () {
    /**
     * inyeccion de nodos al DOM 
     */

    //div root
    let root = document.querySelector(".root");
    //contenedor del form
    let divformContainer = document.createElement("div");
    divformContainer.classList.add("formContainer");
    //formulario
    let form = document.createElement("form");
    // entradas
    let inputName = document.createElement("input");
    inputName.type = "text";
    inputName.classList.add("name");
    let inputEmail = document.createElement("input");
    inputEmail.type = "text";
    inputEmail.classList.add("email");
    let inputUsername = document.createElement("input");
    inputUsername.type = "text";
    inputUsername.classList.add("username");
    let inputId = document.createElement("input");
    inputId.type = "hidden";
    inputId.classList.add("id");
    let buttonUpdate = document.createElement("input");
    buttonUpdate.type = "button";
    buttonUpdate.value = "enviar";
    buttonUpdate.classList.add("update");
    //agregamos cosas al form
    form.append(inputName, inputUsername, inputEmail, inputId, buttonUpdate);
    //agregamos form al divformcontainer
    divformContainer.append(form);
    // contenedor de la tabla
    let divtableContainer = document.createElement("div");
    divtableContainer.classList.add("tableContainer");
    // tabla
    let table = document.createElement("table");
    // tbody
    let tbody = document.createElement("tbody");
    tbody.classList.add("tbody");
    // tr's
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = "Nombre";
    let td2 = document.createElement("td");
    td2.textContent = "Usuario";
    let td3 = document.createElement("td");
    td3.textContent = "Correo";
    let td4 = document.createElement("td");
    td4.textContent = "Acciones";
    // agrega tbody a table
    table.append(tbody);
    // agrega tr a tbody
    tbody.append(tr);
    tr.append(td1, td2, td3, td4);
    // agrega tabla a div tableContainer
    divtableContainer.append(table);
    // agrega los div container al div raiz
    root.append(divformContainer, divtableContainer);
    buttonUpdate.addEventListener("click", () => {
      controller.createOrUpdateUser(
        inputId.value,
        inputName.value,
        inputUsername.value,
        inputEmail.value
      );
    });

    /**
     * recorremos el modelo que contiene los usuarios 
     */
    model.usuarios.forEach((el) => {
        let tbody = document.querySelector(".tbody");
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.textContent = el.name;
        let td2 = document.createElement("td");
        td2.textContent = el.username;
        let td3 = document.createElement("td");
        td3.textContent = el.email;
        let td4 = document.createElement("td");
        let buttonDelete = document.createElement("button");
        buttonDelete.textContent = "eliminar";
        buttonDelete.addEventListener("click", () => {
          controller.deleteUser(el.id);
        });
        let buttonEdit = document.createElement("button");
        buttonEdit.textContent = "editar";
        buttonEdit.addEventListener("click", () => {
          inputId.value = el.id;
          inputName.value = el.name;
          inputUsername.value = el.username;
          inputEmail.value = el.email;
        });

        tbody.append(tr);
        td4.append(buttonEdit, buttonDelete);
        tr.append(td1, td2, td3, td4);
      });
  },
}