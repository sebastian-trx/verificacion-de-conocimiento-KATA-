import { view } from "./view.js";
import { model } from "./model.js";

export let controller = {
  init: async function () {
    let res = await fetch("http://localhost:3000/users"),
      json = await res.json();
    json.forEach((element) => {
      model.usuarios.push(element);
    });
    view.render();
  },

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
