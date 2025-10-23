
function getAdmin() {
    const data = sessionStorage.getItem('adminTien');
    return data ? JSON.parse(data) : null;
}

$(document).ready(function () {
    const usuario = getAdmin();

    if (usuario) {
        obtenerAdmin();
    } else {
        window.location.href = '../Login.aspx';
    }
});

$('#salirsis').on('click', function (e) {
    e.preventDefault();
    sessionStorage.clear();
    window.location.replace('../Login.aspx');
});

function obtenerAdmin() {
    const usuario = getAdmin();
    if (usuario) {

        $("#nomUsergA").text(usuario.Apellidos);

    } else {
        console.error('No se encontró información del usuario en sessionStorage.');
        window.location.href = '../Login.aspx';
    }
}

//fin