
var table;

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idNego = urlParams.get('id');

    if (idNego !== null && idNego.trim() !== "") {

        //cargarUnidadesEdu();
        listaUsuariosNego(idNego);
    } else {
        swal({
            title: "Mensaje",
            text: "No hay parámetro de búsqueda válido en la URL",
            type: "warning",
            timer: 1500,
            showConfirmButton: false
        });

        setTimeout(function () {
            window.location.href = 'NegociosAdmin.aspx';
        }, 1200);
    }
});

function listaUsuariosNego(idNego) {
    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        $("#tbUsuarios").DataTable().destroy();
        $('#tbUsuarios tbody').empty();
    }

    var request = { IdNegocio: idNego }

    table = $("#tbUsuarios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'DetalleUserNego.aspx/ListaUsuariosNego',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                //console.log("Response from server:", json.d.objeto);
                if (json.d.Estado) {
                    return json.d.Data; // Asegúrate de que esto apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdUsuario", "visible": false, "searchable": false },
            { "data": "FullNombre" },
            { "data": "Correo" },
            { "data": "Celular" },
            {
                "data": "Permisos", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-info">Habilitado</span>';
                    else
                        return '<span class="badge badge-danger">No Habilitado</span>';
                }
            },
            {
                "data": "Estado", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-info">Activo</span>';
                    else
                        return '<span class="badge badge-danger">No Activo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-info btn-detalle btn-sm"><i class="fas fa-eye"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "100px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#btnVolver').on('click', function () {
    window.location.href = 'NegociosAdmin.aspx';
})

//fin