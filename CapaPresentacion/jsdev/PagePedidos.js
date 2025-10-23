


let tablaSer;
var table;

function ObtenerFechaA() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

$(document).ready(function () {
    $("#txtFechaAct").val(ObtenerFechaA());
})

function listaModProductos() {
    if ($.fn.DataTable.isDataTable("#tbLisProd")) {
        $("#tbLisProd").DataTable().destroy();
        $('#tbLisProd tbody').empty();
    }

    var usuario = JSON.parse(sessionStorage.getItem('usuTienda'));
    var request = { IdNegocio: usuario.IdNegocio }

    //var request = { IdNegocio: 1 }

    table = $("#tbLisProd").DataTable({
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
            {
                "defaultContent": '<button class="btn btn-primary btn-seleccion btn-sm"><i class="fas fa-plus-circle"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "40px"
            },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            { "data": "PrecioCompraStr" }
        ],
        "order": [],
        "columnDefs": [
            { "orderable": false, "targets": 0 }
        ],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#btnBuscar').on('click', function () {
    listaModProductos();
    $("#modalListaPro").modal("show");
})

let ProductosParaVentaC = [];

$("#tbLisProd tbody").on("click", ".btn-seleccion", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const model = table.row(filaSeleccionada).data();

    //console.log(model);
    let producto_encontradov = ProductosParaVentaC.filter(p => p.IdProducto == model.IdProducto)
    if (producto_encontradov.length > 0) {
        swal("Mensaje", "El Producto ya fue agregado a la Lista", "warning")
        return;
    }

    let pedidodata = {
        IdProducto: parseInt(model.IdProducto),
        Nombre: model.Nombre,
        Descripcion: model.Descripcion,
        PrecioCompra: model.PrecioCompraStr
    }
    ProductosParaVentaC.push(pedidodata);
    detallePedido();

    $('#modalListaPro').modal('hide');
});

function detallePedido() {
    if ($.fn.DataTable.isDataTable("#tbProducto")) {
        $("#tbProducto").DataTable().destroy();
        $("#tbProducto tbody").empty();
    }

    tablaSer = $("#tbProducto").DataTable({
        "responsive": true,
        "data": ProductosParaVentaC,
        "columns": [
            {
                "defaultContent": '<button class="btn btn-danger btn-eliminar btn-sm"><i class="fas fa-trash-alt"></i></button>',
                "orderable": false,
                "searchable": false,
                "width": "40px"
            },
            { "data": "Nombre" },
            { "data": "Descripcion" },
            { "data": "PrecioCompra" }
        ],
        "order": [],
        "columnDefs": [
            { "orderable": false, "targets": 0 }
        ],
        "dom": "rt",
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });

    $("#txtCantidad").val(ProductosParaVentaC.length + " Productos Agregados");
}

$("#tbProducto tbody").on("click", ".btn-eliminar", function (e) {
    e.preventDefault();
    let filaSeleccionada;

    if ($(this).closest("tr").hasClass("child")) {
        filaSeleccionada = $(this).closest("tr").prev();
    } else {
        filaSeleccionada = $(this).closest("tr");
    }

    const data = tablaSer.row(filaSeleccionada).data();

    // Buscar el índice del objeto en DetalleActili para eliminarlo
    ProductosParaVentaC = ProductosParaVentaC.filter(p => p.IdProducto != data.IdProducto);

    detallePedido();
});

function ReportePedido() {

    const Canti = ProductosParaVentaC.length;
    const fechaActual = new Date().toLocaleDateString("es-BO", {
        day: "2-digit", month: "2-digit", year: "numeric"
    });

    var props = {
        outputType: jsPDFInvoiceTemplate.OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: `Reporte_Pedidos_${fechaActual.replace(/\//g, "_")}`,
        orientationLandscape: true,
        //compress: true,
        logo: {
            src: "../Imagenes/reporttf.png",
            type: 'PNG', //optional, when src= data:uri (nodejs case)
            width: 53.33, //aspect ratio = width/height
            height: 26.66,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "SISTEMAS",
            address: "Riberalta Beni",
            phone: "+591 73999726",
            email: "Lista Pedido",
            email_1: "joseluisdelta1@gmail.com",
            website: "www.elzerobyte.com",
        },
        contact: {
            label: "Lista de Pedido:",
            name: "Tienda Online",
            address: "Departamento de sistemas",
            phone: "Tienda nombre",
            email: "soporte_asba@gmail.com",
            otherInfo: "Mas detalle",
        },
        invoice: {
            label: "Nro #: ",
            num: "Mas detalle",
            invDate: "Fecha:",
            invGenDate: fechaActual,
            headerBorder: false,
            tableBodyBorder: false,
            header: ["Producto", "Descripcion producto", "Precio Compra"],
            table: ProductosParaVentaC.map((item, index) => [
                item.Nombre,
                item.Descripcion,
                item.PrecioCompra
            ]),
            invTotalLabel: "Cantidad:",
            invTotal: Canti.toString(),
            invCurrency: "Prod.",
            row1: {
                col1: 'Generado',
                col2: 'Todo',
                col3: 'Bien',
                style: {
                    fontSize: 10
                }
            },
            invDescLabel: "Gracias por usar nuestro sistema",
            invDesc: "Reporte interno de uso solo para socios Riberalta-Beni-Bolivia.",
        },
        footer: {
            text: "Este es un documento generado automáticamente.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    var pdfObject = jsPDFInvoiceTemplate.default(props);
    console.log(pdfObject);
    ProductosParaVentaC = [];
    detallePedido();
}


$('#btnImprimir').on('click', function () {
    if (ProductosParaVentaC.length < 1) {
        swal("Mensaje", "No se puede Generar un reporte Vacio", "error");
        return;
    }

    ReportePedido();
});