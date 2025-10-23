<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | Mi Tienda</title>
    <link rel="shortcut icon" href="Imagenes/favicon.ico">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="vendor/toastr/toastr.min.css" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(rgba(0, 105, 173, 0.7), rgba(0, 105, 173, 0.7)),
                        url('Imagenes/fondoss.jpg') no-repeat center center/cover;
        }

        .login-container {
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            width: 380px;
            padding: 40px 40px;
            text-align: center;
            animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .login-container img {
            width: 90px;
            margin-bottom: 20px;
        }

        .login-container h2 {
            color: #0069ad;
            margin-bottom: 25px;
            font-weight: 600;
        }

        .form-group {
            text-align: left;
            margin-bottom: 20px;
        }

        .form-group label {
            font-weight: 500;
            color: #444;
        }

        .form-group input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            transition: all 0.3s ease;
            font-size: 15px;
        }

        .form-group input:focus {
            border-color: #0069ad;
            box-shadow: 0 0 5px rgba(0, 105, 173, 0.4);
        }

        .btn-login {
            background-color: #0069ad;
            color: white;
            border: none;
            padding: 10px 0;
            border-radius: 8px;
            width: 100%;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease;
        }

        .btn-login:hover {
            background-color: #005489;
        }

        .footer-text {
            margin-top: 15px;
            font-size: 13px;
            color: #666;
        }
    </style>
</head>
<body>

    <div class="login-container">
        <img src="Imagenes/mitienda.png" alt="Logo Mi tienda">
        <h2>Mi Tienda Digital</h2>

        <div class="form-group">
            <label for="usuario">Correo</label>
            <input type="text" id="usuario" placeholder="Ingrese su correo" autocomplete="off">
        </div>

        <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" id="password" placeholder="Ingrese su contraseña">
        </div>

        <button class="btn-login" id="btnInicia">Ingresar</button>

        <p class="footer-text">© 2025 El_Zero_Byte. Todos los derechos reservados.</p>
    </div>

    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/toastr/toastr.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="vendor/loadingoverlay/loadingoverlay.min.js"></script>
    <script src="jsdev/Login.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
    <%--<script src="jsdev/Login.js" type="text/javascript"></script>--%>
</body>
</html>
