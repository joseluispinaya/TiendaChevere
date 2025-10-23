
$('#btnInicia').on('click', function () {

    $('#btnInicia').prop('disabled', true);

    //VALIDACIONES DE USUARIO
    if ($("#usuario").val().trim() === "" || $("#password").val().trim() === "") {
        swal("Mensaje", "Complete los datos para iniciar sesion", "warning");
        $('#btnInicia').prop('disabled', false);
        return;
    }

    loginSistema();
})

function loginSistema() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/Logeo",
        data: JSON.stringify({ Usuario: $("#usuario").val().trim(), Clave: $("#password").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (!response.d.Estado) {

                if (response.d.Valor === "admin") {
                    loginSistemaAdmin(); // intenta login como admin
                } else {
                    swal("Mensaje", response.d.Mensaje, "warning");
                    $('#btnInicia').prop('disabled', false);
                }
                return;
            }

            const usuarioData = response.d.Data;
            sessionStorage.setItem('usuTienda', JSON.stringify(usuarioData));
            swal({
                title: "Bienvenido",
                text: `Hola ${usuarioData.FullNombre || "Usuario"} 👋`,
                icon: "success",
                timer: 1500,
                buttons: false
            });
            $('#btnInicia').prop('disabled', false);
            $("#usuario, #password").val("");

            setTimeout(() => window.location.href = 'Inicio.aspx', 1200);

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Ocurrió un problema al intentar iniciar sesión. Intente nuevamente.", "error");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $('#btnInicia').prop('disabled', false);
        }
    });
}

function loginSistemaAdmin() {
    $.ajax({
        type: "POST",
        url: "Login.aspx/LogeoAdmin",
        data: JSON.stringify({ Usuario: $("#usuario").val().trim(), Clave: $("#password").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");

            if (response.d.Estado) {
                const userAdmin = response.d.Data;

                if (!userAdmin.Estado) {
                    swal("Atención", "El Administrador no se encuentra activo.", "warning");
                } else {
                    sessionStorage.setItem('adminTien', JSON.stringify(userAdmin));
                    swal({
                        title: "Bienvenido Admin",
                        text: `Hola ${userAdmin.FullNombreAd || "Usuario"} 👋`,
                        icon: "success",
                        timer: 1500,
                        buttons: false
                    });

                    setTimeout(() => window.location.href = 'MasterAdmin/InicioAdmin.aspx', 1200);
                }

                $('#btnInicia').prop('disabled', false);
                $("#usuario, #password").val("");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
                $('#btnInicia').prop('disabled', false);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            swal("Error", "Hubo un problema, intente más tarde.", "error");
            console.log(xhr.status + "\n" + xhr.responseText + "\n" + thrownError);
            $('#btnInicia').prop('disabled', false);
        }
    });
}

function loginSistemaOrigi() {

    $.ajax({
        type: "POST",
        url: "Login.aspx/Logeo",
        data: JSON.stringify({ Usuario: $("#usuario").val().trim(), Clave: $("#password").val().trim() }),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            $.LoadingOverlay("show");
        },
        success: function (response) {
            $.LoadingOverlay("hide");
            if (response.d.Estado) {

                const usuarioData = response.d.Data;

                if (!usuarioData.Estado) {
                    swal("Atención", "El usuario no se encuentra activo.", "warning");
                } else {
                    sessionStorage.setItem('usuTienda', JSON.stringify(usuarioData));
                    swal({
                        title: "Bienvenido",
                        text: `Hola ${usuarioData.Nombres || "Usuario"} 👋`,
                        icon: "success",
                        timer: 1500,
                        buttons: false
                    });

                    setTimeout(() => window.location.href = 'Inicio.aspx', 1200);
                }

                $("#usuario, #password").val("");

            } else {
                swal("Mensaje", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $.LoadingOverlay("hide");
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            swal("Error", "Ocurrió un problema al intentar iniciar sesión. Intente nuevamente.", "error");
        },
        complete: function () {
            // Rehabilitar el botón después de que la llamada AJAX se complete (éxito o error)
            $('#btnInicia').prop('disabled', false);
        }
    });
}

//finn