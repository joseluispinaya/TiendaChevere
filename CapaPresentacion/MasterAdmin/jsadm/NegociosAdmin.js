
var table;

const MODELO_BASE = {
    IdNegocio: 0,
    NombreNegocio: "",
    Direccion: "",
    Estado: true
}

$(document).ready(function () {

    listaNegocios();

})

function listaNegocios() {
    if ($.fn.DataTable.isDataTable("#tbNegocios")) {
        $("#tbNegocios").DataTable().destroy();
        $('#tbNegocios tbody').empty();
    }

    table = $("#tbNegocios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'NegociosAdmin.aspx/ListaNegocios',
            "type": "POST", // Cambiado a POST
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
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
            { "data": "IdNegocio", "visible": false, "searchable": false },
            { "data": "NombreNegocio" },
            { "data": "FechaRegistro" },
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
                    '<button class="btn btn-info btn-product btn-sm mr-2"><i class="fas fa-tags"></i></button>' +
                    '<button class="btn btn-success btn-users btn-sm"><i class="fas fa-user-cog"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "150px"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdNegocio").val(modelo.IdNegocio);
    $("#txtNegocioNombre").val(modelo.NombreNegocio);
    $("#txtDireccion").val(modelo.Direccion);

    $("#cboEstado").val(modelo.Estado ? 1 : 0);
    //$("#cboEstado").val(modelo.Estado == true ? 1 : 0);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#myTitulodr").text(cboEstadoDeshabilitado ? "Nuevo Negocio" : "Editar Negocio");

    $("#modalNegocios").modal("show");
}

$("#tbNegocios tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();

    let filaSeleccionada = $(this).closest("tr").hasClass("child")
        ? $(this).closest("tr").prev()
        : $(this).closest("tr");

    const model = table.row(filaSeleccionada).data();
    mostrarModal(model, false);
});

$('#btnAddNuevoReg').on('click', function () {
    mostrarModal(null, true);
});

$("#tbNegocios tbody").on("click", ".btn-product", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    var url = 'DetalleNegocio.aspx?id=' + model.IdNegocio;
    window.location.href = url;

    //swal("Mensaje", "Se pasara el ID: " + model.IdNegocio, "success")
    //mostrarModal(model, false);
})

$("#tbNegocios tbody").on("click", ".btn-users", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();
    var url = 'DetalleUserNego.aspx?id=' + model.IdNegocio;
    window.location.href = url;

    //swal("Mensaje", "Detalle de usuarios del Negocio: " + model.IdNegocio, "success")
    //mostrarModal(model, false);
})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

// Función genérica para guardar o editar
function guardarOEditarNegocio(url, request) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalNegocios").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                listaNegocios();
                $('#modalNegocios').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#modalNegocios").find("div.modal-content").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

// Guardar o editar al hacer clic
$('#btnGuardarCambios').on('click', function () {
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter((item) => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const campo = inputs_sin_valor[0].name;
        const $inputVacio = $(`input[name="${campo}"]`);
        toastr.warning("", `Debe completar el campo: "${campo}"`);
        $inputVacio.focus();
        habilitarBoton();
        return;
    }

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdNegocio"] = parseInt($("#txtIdNegocio").val());
    modelo["NombreNegocio"] = $("#txtNegocioNombre").val().trim();
    modelo["Direccion"] = $("#txtDireccion").val().trim();
    modelo["Estado"] = ($("#cboEstado").val() == "1" ? true : false);

    const request = { oNegocio: modelo };
    const url = modelo.IdNegocio === 0
        ? "NegociosAdmin.aspx/Guardar"
        : "NegociosAdmin.aspx/Editar";

    $("#modalNegocios").find("div.modal-content").LoadingOverlay("show");
    guardarOEditarNegocio(url, request);
});

// fin funciones