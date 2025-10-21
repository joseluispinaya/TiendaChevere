

var table;

const MODELO_BASE = {
    IdProducto: 0,
    Nombre: "",
    Descripcion: "",
    PrecioCompra: 0.0,
    PrecioVenta: 0.0,
    Cantidad: 0,
    IdNegocio: 0
}

$(document).ready(function () {
    //$("#txtPrecioCompra").val("0"); Cantidad: 0,
    //$("#txtPrecioVenta").val("0");
    listaProductos();

})

function listaProductos() {
    if ($.fn.DataTable.isDataTable("#tbProductos")) {
        $("#tbProductos").DataTable().destroy();
        $('#tbProductos tbody').empty();
    }

    var usuario = JSON.parse(sessionStorage.getItem('usuTienda'));
    var request = { IdNegocio: usuario.IdNegocio }

    //var request = { IdNegocio: 1 }

    table = $("#tbProductos").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageProductos.aspx/ObtenerProductosporNegocio',
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
            /*{ "data": "PrecioCompraStr" },*/
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

function mostrarModal(modelo, cboEstadoDeshabilitado = true) {
    // Verificar si modelo es null
    modelo = modelo ?? MODELO_BASE;

    $("#txtIdProducto").val(modelo.IdProducto);
    $("#txtNombre").val(modelo.Nombre);
    $("#txtPrecioCompra").val(modelo.PrecioCompra);
    $("#txtPrecioVenta").val(modelo.PrecioVenta);
    $("#txtCant").val(modelo.Cantidad);
    $("#txtDescripcion").val(modelo.Descripcion);

    //$("#cboEstado").val(modelo.Estado ? 1 : 0);
    //$("#cboEstado").val(modelo.Estado == true ? 1 : 0);

    //$("#cboEstado").prop("disabled", cboEstadoDeshabilitado);
    $("#myTitulodr").text(cboEstadoDeshabilitado ? "Nuevo Producto" : "Editar Producto");

    $("#modalProductos").modal("show");
}

$("#tbProductos tbody").on("click", ".btn-editar", function (e) {
    e.preventDefault();

    let filaSeleccionada = $(this).closest("tr").hasClass("child")
        ? $(this).closest("tr").prev()
        : $(this).closest("tr");

    const model = table.row(filaSeleccionada).data();

    const usuarioNeg = JSON.parse(sessionStorage.getItem('usuTienda'));
    if (!usuarioNeg.Permisos) {
        swal("Atención", "No esta habilitado para Agregar Productos.", "warning");
        return;
    }

    mostrarModal(model, false);
});

$("#tbProductos tbody").on("click", ".btn-detalle", function (e) {
    e.preventDefault();

    let filaSeleccionada = $(this).closest("tr").hasClass("child")
        ? $(this).closest("tr").prev()
        : $(this).closest("tr");

    const model = table.row(filaSeleccionada).data();
    $("#txtProdd").val(model.Nombre);
    $("#txtNumVenta").val(model.Codigo);
    $("#txtFecharegg").val(model.FechaRegistro);
    $("#txtpreciocomm").val(model.PrecioCompraStr);
    $("#txtpreciovennn").val(model.PrecioVentaStr);
    $("#txtCantnnn").val(model.Cantidad);
    $("#txtDescripciondet").val(model.Descripcion);

    $("#modalDatadet").modal("show");
});

$('#btnAddNuevoReg').on('click', function () {

    const usuarioNeg = JSON.parse(sessionStorage.getItem('usuTienda'));
    if (!usuarioNeg.Permisos) {
        swal("Atención", "No esta habilitado para Agregar Productos.", "warning");
        return;
    }

    mostrarModal(null, true);
});

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

function registrarProducto(request) {

    $.ajax({
        type: "POST",
        url: "PageProductos.aspx/Guardar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loaddd").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddd").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaProductos();
                $('#modalProductos').modal('hide');

                var codigo = response.d.Valor;
                swal("Mensaje", response.d.Mensaje + "\nCodigo generado del Producto: " + codigo, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde.", "error");
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            habilitarBoton();
        }
    });
}

function editarProducto(request) {

    $.ajax({
        type: "POST",
        url: "PageProductos.aspx/Editar",
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $("#loaddd").LoadingOverlay("show");
        },
        success: function (response) {
            $("#loaddd").LoadingOverlay("hide");
            if (response.d.Estado) {
                listaProductos();
                $('#modalProductos').modal('hide');
                swal("Mensaje", response.d.Mensaje, "success");
            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#loaddd").LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema intente mas tarde.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}


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

    // Obtener y normalizar precios (reemplazar coma por punto)
    let precioCompraStr = $("#txtPrecioCompra").val().trim().replace(",", ".");
    let precioVentaStr = $("#txtPrecioVenta").val().trim().replace(",", ".");

    // Validar precios antes de convertir
    if (precioCompraStr === "" || isNaN(precioCompraStr) || parseFloat(precioCompraStr) < 0) {
        toastr.warning("", "Debe ingresar un precio de Compra válido (0 o positivo)");
        $("#txtPrecioCompra").focus();
        habilitarBoton();
        return;
    }

    if (precioVentaStr === "" || isNaN(precioVentaStr) || parseFloat(precioVentaStr) <= 0) {
        toastr.warning("", "Debe ingresar un precio de Venta válido (Mayor a 0)");
        $("#txtPrecioVenta").focus();
        habilitarBoton();
        return;
    }

    // Convertir y redondear a 2 decimales exactos
    const precioCompra = Number(parseFloat(precioCompraStr).toFixed(2));
    const precioVenta = Number(parseFloat(precioVentaStr).toFixed(2));

    const val = $("#txtCant").val().trim();
    const cantstr = val === "" || isNaN(val) ? 0 : parseInt(val, 10);

    const usuarioNeg = JSON.parse(sessionStorage.getItem('usuTienda'));

    const modelo = structuredClone(MODELO_BASE);
    modelo["IdProducto"] = parseInt($("#txtIdProducto").val());
    modelo["Nombre"] = $("#txtNombre").val().trim();
    modelo["PrecioCompra"] = precioCompra;
    modelo["PrecioVenta"] = precioVenta;
    modelo["Cantidad"] = cantstr;
    modelo["Descripcion"] = $("#txtDescripcion").val().trim();
    modelo["IdNegocio"] = parseInt(usuarioNeg.IdNegocio);
    //modelo["IdNegocio"] = 1;

    const request = { oProducto: modelo };


    if (parseInt($("#txtIdProducto").val()) === 0) {
        registrarProducto(request);
    } else {
        editarProducto(request);
    }

});

// fin funciones