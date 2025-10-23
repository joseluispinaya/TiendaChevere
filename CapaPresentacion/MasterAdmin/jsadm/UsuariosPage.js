

var table;

const MODELO_BASE = {
    IdUsuario: 0,
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Clave: "",
    Celular: "",
    IdNegocio: 0,
    Estado: true
}

$(document).ready(function () {
    listaUsuarios();
    cargarNegocios();

})

function cargarNegocios() {
    $("#cboNegocio").html("");

    $.ajax({
        type: "POST",
        url: "NegociosAdmin.aspx/ListaNegocios",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                $.each(response.d.Data, function (i, row) {
                    if (row.Estado === true) {
                        $("<option>").attr({ "value": row.IdNegocio }).text(row.NombreNegocio).appendTo("#cboNegocio");
                    }

                })
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }

        }
    });
}

function listaUsuarios() {
    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        $("#tbUsuarios").DataTable().destroy();
        $('#tbUsuarios tbody').empty();
    }

    table = $("#tbUsuarios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'UsuariosPage.aspx/ListaUsuarios',
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
            { "data": "IdUsuario", "visible": false, "searchable": false },
            { "data": "FullNombre" },
            { "data": "Correo" },
            { "data": "Celular" },
            { "data": "RefNegocio.NombreNegocio" },
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

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdUsuario").val(modelo.IdUsuario);
    $("#txtNombre").val(modelo.Nombres);
    $("#txtApellidos").val(modelo.Apellidos);
    $("#txtCorreo").val(modelo.Correo);
    $("#txtClave").val(modelo.Clave);
    $("#txtCelular").val(modelo.Celular);
    $("#cboNegocio").val(modelo.IdNegocio == 0 ? $("#cboNegocio option:first").val() : modelo.IdNegocio);

    $("#cboEstado").val(modelo.Estado ? 1 : 0);
    //$("#cboEstado").val(modelo.Estado == true ? 1 : 0);

    $("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#myTitulodr").text(cboEstadoDeshabilitado ? "Nuevo Registro" : "Editar Usuario");

    $("#modalUsuarios").modal("show");
}

$("#tbUsuarios tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();

    let filaSeleccionada = $(this).closest("tr").hasClass("child")
        ? $(this).closest("tr").prev()
        : $(this).closest("tr");

    const model = table.row(filaSeleccionada).data();
    mostrarModal(model, false);
});

$("#tbUsuarios tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();

    let filaSeleccionada = $(this).closest("tr").hasClass("child")
        ? $(this).closest("tr").prev()
        : $(this).closest("tr");

    const model = table.row(filaSeleccionada).data();
    const estatus = !model.Permisos; // ← Aquí se invierte el valor

    swal({
        title: "Mensaje de Confirmación",
        text: "¿Está seguro de modificar los permisos?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Sí, Aceptar",
        cancelButtonText: "No, Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (respuesta) {
            if (respuesta) {
                $(".showSweetAlert").LoadingOverlay("show");

                var request = {
                    IdUsuario: model.IdUsuario,
                    Permisos: estatus
                };

                $.ajax({
                    type: "POST",
                    url: "UsuariosPage.aspx/EstadoPermisos",
                    data: JSON.stringify(request),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    error: function (xhr, ajaxOptions, thrownError) {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                    },
                    success: function (response) {
                        $(".showSweetAlert").LoadingOverlay("hide");
                        if (response.d.Estado) {
                            listaUsuarios();
                            swal("Mensaje", response.d.Mensaje, "success");
                        } else {
                            swal("Mensaje", response.d.Mensaje, "error");
                        }
                    }
                });
            }
        });
});

$('#btnAddNuevoReg').on('click', function () {
    mostrarModal(null, true);
});

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

function guardarOEditarUsuario(url, request) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalUsuarios").find("div.modal-content").LoadingOverlay("hide");

            if (response.d.Estado) {
                listaUsuarios();
                $('#modalUsuarios').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#modalUsuarios").find("div.modal-content").LoadingOverlay("hide");
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
    modelo["IdUsuario"] = parseInt($("#txtIdUsuario").val());
    modelo["Nombres"] = $("#txtNombre").val().trim();
    modelo["Apellidos"] = $("#txtApellidos").val().trim();
    modelo["Correo"] = $("#txtCorreo").val().trim();
    modelo["Clave"] = $("#txtClave").val().trim();
    modelo["Celular"] = $("#txtCelular").val().trim();
    modelo["IdNegocio"] = $("#cboNegocio").val();
    modelo["Estado"] = ($("#cboEstado").val() == "1" ? true : false);

    const request = { oUsuario: modelo };
    const url = modelo.IdUsuario === 0
        ? "UsuariosPage.aspx/Guardar"
        : "UsuariosPage.aspx/Editar";

    $("#modalUsuarios").find("div.modal-content").LoadingOverlay("show");
    guardarOEditarUsuario(url, request);
});

// fin funciones