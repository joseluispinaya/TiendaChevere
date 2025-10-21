
$(document).ready(function () {
    const usuarioL = sessionStorage.getItem('usuTienda');

    if (usuarioL) {
        obtenerDetalleUsuarioRP();
    } else {
        window.location.href = 'Login.aspx';
    }

    //obtenerEsquema();
});

$('#salirsis').on('click', function (e) {
    e.preventDefault();
    CerrarSesion();
});

function obtenerDetalleUsuarioRP() {
    const usuarioL = sessionStorage.getItem('usuTienda');
    if (usuarioL) {
        const usuario = JSON.parse(usuarioL);

        $("#nomUserg").text(usuario.Apellidos);
        //$("#imgUsumast").attr("src", usuario.ImageFull);


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