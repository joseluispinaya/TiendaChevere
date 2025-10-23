
var table;

$(document).ready(function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const idNego = urlParams.get('id');

    if (idNego !== null && idNego.trim() !== "") {

        //cargarUnidadesEdu();
        listaProductosAd(idNego);
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

function listaProductosAd(idNego) {
    if ($.fn.DataTable.isDataTable("#tbProductos")) {
        $("#tbProductos").DataTable().destroy();
        $('#tbProductos tbody').empty();
    }

    var request = { IdNegocio: idNego }

    //var request = { IdNegocio: 1 }

    table = $("#tbProductos").DataTable({
        responsive: true,
        "ajax": {
            "url": '/PageProductos.aspx/ObtenerProductosporNegocio',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data; // apunta al array de datos
                } else {
                    return [];
                }
            }
        },
        "columns": [
            { "data": "IdProducto", "visible": false, "searchable": false },
            { "data": "Codigo" },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            { "data": "PrecioCompraStr" },
            { "data": "PrecioVentaStr" },
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