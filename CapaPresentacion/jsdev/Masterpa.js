
function getUsuarioNeg() {
    const data = sessionStorage.getItem('usuTienda');
    return data ? JSON.parse(data) : null;
}

$(document).ready(function () {
    const usuario = getUsuarioNeg();

    if (usuario) {
        obtenerDetalleUsuarioRP();
    } else {
        window.location.href = 'Login.aspx';
    }
});

$('#salirsis').on('click', function (e) {
    e.preventDefault();
    CerrarSesion();
});

function obtenerDetalleUsuarioRP() {
    const usuario = getUsuarioNeg();
    if (usuario) {

        $("#nomUserg").text(usuario.Apellidos);

    } else {
        console.error('No se encontró información del usuario en sessionStorage.');
        window.location.href = 'Login.aspx';
    }
}


// Función para cerrar sesión

function CerrarSesion() {

    $.ajax({
        type: "POST",
        url: "Inicio.aspx/CerrarSesion",
        data: {},
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
        },
        success: function (response) {
            if (response.d.Estado) {
                sessionStorage.clear();
                window.location.replace('Login.aspx');
            } else {
            }

        }
    });
}