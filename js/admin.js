"use strict";
function tableAPI() {

    const getAPI_URL = () => {
        const endPoint = `https://62b39803a36f3a973d245b99.mockapi.io/api/v1/adminTable`;
        const query = `?page=${pageNumber}&limit=10`;
        return `${endPoint}${query}`;
    };
    
    const API_URL = `https://62b39803a36f3a973d245b99.mockapi.io/api/v1/adminTable`
    
    let pageNumber = 1;
    let form = document.querySelector("#form");
    let gamesArray = [];

    getTableDataAPI(false);

    refreshBtn.addEventListener("click", function () {
        //Por si se bugea mockapi
        getTableDataAPI();
        console.log("Refresh successfully");
    });

    form.addEventListener("submit", async function (e) {
        //send table data 2 API
        e.preventDefault();

        let formData = new FormData(this);

        let games = {
            "game": formData.get("game_name"),
            "version": formData.get("game_version"),
            "discount": formData.get("game_discount"),
            "price": formData.get("game_price")
        };

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(games)
        });
        console.log("Successfully sent:");
        console.log(games);
        document.querySelector("#sendMsg").innerHTML = "Enviado correctamente!";
        setTimeout(function () {
            document.getElementById("sendMsg").innerHTML = '';
        }, 3000);
        getTableDataAPI();
        resetInputs();
    });


    // mostrar tabla con get
    async function getTableDataAPI() {
        tableJson.innerHTML = `<div id="reload">
                            <i class="fa-solid fa-circle-notch fa-spin fa-2x"></i>
                         </div>
    `; //icono recarga tabla
        let response = await fetch(getAPI_URL(), {
            method: "GET"
        });
        gamesArray = await response.json();
        tableJson.innerHTML = "";
        for (const item of gamesArray) {
            let html = `<td id=table class="${item.discount > 0 ? "highlighted_table_json" : "normal_table_json"
                }">  ${item.id}  </td> 
    <td id=table class="${item.discount > 0 ? "highlighted_table_json" : "normal_table_json"
                }">  ${item.version}  </td> 
    <td id=table class="${item.discount > 0 ? "highlighted_table_json" : "normal_table_json"
                }">  ${item.game}  </td> 
    <td id=table class="${item.discount > 0 ? "highlighted_table_json" : "normal_table_json"
                }">  ${item.discount + " %"}  </td> 
    <td id=table class="${item.discount > 0 ? "highlighted_table_json" : "normal_table_json"
                }">  ${"$ " + item.price}  </td>
    <td><i data-id="${item.id
                }" class="fa-solid fa-pen-to-square btnEdit" data-bs-toggle="modal" data-bs-target="#myModal"></i></td>  
    <td><i id="delete_game${item.id}" class="fa-solid fa-trash-can"></i></td>
    `;
            tableJson.innerHTML += html;
        }
        for (let index = 0; index < gamesArray.length; index++) {
            let id = gamesArray[index].id;
            document
                .querySelector("#delete_game" + id)
                .addEventListener("click", function () {
                    deleteItem(id);
                    window.setTimeout(getTableDataAPI, 1000);
                });
        }
        editBtn();
    }

    function editBtn() {
        let btnEdit = document.querySelectorAll(".btnEdit");
        for (const btn of btnEdit) {
            btn.addEventListener("click", initEditForm);
        }
    }

    async function deleteItem(id) {
        console.log(`Deleting game #${id}...`);
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                console.log(`Game #${id} successfully deleted.`);
                let json = await response.json();
                console.log(json);
            } else {
                console.log("error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    document.addEventListener("DOMContentLoaded", getTableDataAPI);

    formEdit.addEventListener("submit", modifyFormPUT);

    // funcion editar
    async function initEditForm() {
        const idSeleccionado = this.dataset.id;
        console.log(this.dataset.id); //que boton estoy apretando
        let selectedGame = gamesArray.find(function (games) {
            return games.id == idSeleccionado;
        });
        inputEditId.value = selectedGame.id;
        inputGamePUT.value = selectedGame.game;
        inputDiscountPUT.value = selectedGame.discount;
        inputPricePUT.value = selectedGame.price;
    }


    // PUT
    async function modifyFormPUT(event) {
        event.preventDefault();
        let formData = new FormData(this);
        let datos = {
            "game": formData.get("gamePUT"),
            "version": formData.get("editVersionPUT"),
            "discount": formData.get("discountPUT"),
            "price": formData.get("pricePUT")
        };
        console.log(datos);
        let response = null;
        inputsPUT.disabled = true;
        try {
            response = await fetch(API_URL + "/" + formData.get("id"), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
        } catch (ex) {
            console.log(ex);
        }
        if (response == null) {
            return;
        }

        console.log(response.ok);
        formEdit.reset();
        inputsPUT.disabled = false;
        // Actualizar la tabla
        await getTableDataAPI();
        //esconde modal
        $('#myModal').modal('hide'); //esconde modal una vez enviado el form - usa jquery
    }

    //reset de inputs
    buttonReset.addEventListener("click", function () {
        resetInputs();
    })

    function resetInputs() {
        document.querySelector("#game_name").value = "";
        document.querySelector("#game_discount").value = "";
        document.querySelector("#game_price").value = "";
    }



    // BTN PREV PAGINATE
    prevBtn.addEventListener("click", () => {
        pageNumber = pageNumber > 1 ? pageNumber - 1 : pageNumber;
        console.log("prev")
        getTableDataAPI();
        whatPage.innerHTML = "Pagina " + pageNumber; // selector div dom
    });


    // BTN NEXT PAGINATE
    nextBtn.addEventListener("click", () => {
        pageNumber++;
        console.log("next")
        getTableDataAPI();
        whatPage.innerHTML = "Pagina " + pageNumber;
    });

}