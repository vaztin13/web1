"use strict";
document.addEventListener("DOMContentLoaded", function (event) {

    loadContent("front");

    function selectTab(id) {
        document.querySelectorAll("#" + id)
    }

    /**
     * Carga el contenido del main segun el link del nav clickeado
     */
    async function loadContent(id) {
        console.log(`Loading content for id = ${id}`);
        let response = await fetch(`${window.location.origin}/${id}.html`);
        try {
            if (response.ok) {
                let content = await response.text();
                document.querySelector("#main").innerHTML = content;
                if (id == "support") {
                    captchaLoad();
                }
                if (id == "admin") {
                    tableAPI();
                }
            } else {
                console.log("Error loading" + id);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function push(event) {
        event.preventDefault();
        // Guarda el id del link clickeado
        let id = event.target.id;
        console.log(id + " selected" );
        selectTab(id);
        loadContent(id);
        // Pushea el estado y agrega el id a la URL
        window.history.pushState({ id }, `${id}`, `/${id}.html`);
    }

    /**
     * Al cargar la página agrega un evento push a cada link del nav
     */
    window.addEventListener("load", function (event) {
        document.querySelector("#front").addEventListener("click", (event) => push(event));
        document.querySelector("#support").addEventListener("click", (event) => push(event));
        document.querySelector("#admin").addEventListener("click", (event) => push(event));
    })

    /**
     * Agrega un evento PopState (cuando se clickearon los botones atrás/adelante)
     */
    window.addEventListener("popstate", (event) => {
        // Guarda el id del estado anterior
        console.log(event);
        let stateId = event.state.id;
        console.log("stateId = ", stateId);
        selectTab(stateId);
        loadContent(stateId);
    });
});