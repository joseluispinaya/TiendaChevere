
var table;

const MODELO_BASE = {
    IdCaja: 0,
    IdNegocio: 0,
    MontoTotal: 0.0,
    Comentario: ""
}
function ObtenerFechaA() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

$(document).ready(function () {
    const usuario = getUsuarioNeg();

    $("#txtIdTienda").val(usuario.IdNegocio);
    $("#txtTienda").val(usuario.RefNegocio.NombreNegocio);
    $("#txtUsuario").val(usuario.FullNombre);
    $("#txtFechaAct").val(ObtenerFechaA());
    listaCajac(usuario.IdNegocio);
});

function listaCajac(IdNegocio) {
    if ($.fn.DataTable.isDataTable("#tbCajac")) {
        $("#tbCajac").DataTable().destroy();
        $('#tbCajac tbody').empty();
    }

    var request = { IdNegocio: IdNegocio }

    table = $("#tbCajac").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageCaja.aspx/ListaCajaMesNue',
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
            { "data": "IdCaja", "visible": false, "searchable": false },
            { "data": "MontoTotalStr" },
            { "data": "Comentario" },
            {
                "data": "Estado", render: function (data) {
                    if (data === true)
                        return '<span class="badge badge-info">Guardado</span>';
                    else
                        return '<span class="badge badge-danger">Observado</span>';
                }
            },
            { "data": "FechaRegistro" }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

function registrarCierre(request) {

    $.ajax({
        type: "POST",
        url: "PageCaja.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loadingAc").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loadingAc").LoadingOverlay("hide");
            if (response.d.Estado) {
                var idt = parseInt($("#txtIdTienda").val());
                listaCajac(idt);
                $("#txtTotalCaja").val("0");
                $("#txtDetalleCa").val("");

                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loadingAc").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

function habilitarBoton() {
    $('#btnRegistrarPaga').prop('disabled', false);
}

$('#btnRegistrarPaga').on('click', function () {

    $('#btnRegistrarPaga').prop('disabled', true);

    // Obtener y normalizar precios (reemplazar coma por punto)
    let montocajaStr = $("#txtTotalCaja").val().trim().replace(",", ".");

    // Validar precios antes de convertir
    if (montocajaStr === "" || isNaN(montocajaStr) || parseFloat(montocajaStr) < 0) {
        toastr.warning("", "Debe ingresar un precio de Compra válido (0 o positivo)");
        $("#txtTotalCaja").focus();
        habilitarBoton();
        return;
    }

    // Convertir y redondear a 2 decimales exactos
    const ptotalcaja = Number(parseFloat(montocajaStr).toFixed(2));

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdNegocio"] = parseInt($("#txtIdTienda").val());
    modelo["MontoTotal"] = ptotalcaja;
    modelo["Comentario"] = $("#txtDetalleCa").val().trim();

    const request = { oCaja: modelo };

    registrarCierre(request);

});

//fin