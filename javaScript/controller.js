import { view } from "./view.js";
import { model } from "./model.js";

/**
 * controlador de la app
 */
export let controller = {

  /**
   * metodo donde inicia la app, trae todos los usuarios
   * en un array que es recorrido y añadido al modelo usuarios
   * y posteriormente llama a la vista 
   */  
  init: async function () {
    let res = await fetch("http://localhost:3000/users"),
      json = await res.json();
    json.forEach((element) => {
      model.usuarios.push(element);
    });
    view.render();
  },

  /**
   * metdodo para eliminar un usuario
   * @param {Number} id 
   */
  deleteUser: async function (id) {
    let options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    };
    await fetch(`http://localhost:3000/users/${id}`, options);
  },

  /**
   * metodo para crear o actualizar un usuario
   * @param {Number} id 
   * @param {String} name 
   * @param {String} username 
   * @param {String} email 
   */
  createOrUpdateUser: async function (id, name, username, email) {
    if (id === "") {
      let options = {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          name: name,
          username: username,
          email: email,
        }),
      };
      await fetch(`http://localhost:3000/users`, options);
    }
    let options = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        name: name,
        username: username,
        email: email,
      }),
    };
    await fetch(`http://localhost:3000/users/${id}`, options);
  },
};

controller.init();
