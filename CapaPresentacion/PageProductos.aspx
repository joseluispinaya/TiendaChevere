<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageProductos.aspx.cs" Inherits="CapaPresentacion.PageProductos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #tbProductos thead th {
            color: #000;
            font-weight: bold;
            vertical-align: middle;
        }

        #tbProductos tbody td {
            vertical-align: middle;
        }

        #modalProductos .form-group > label {
            font-weight: bold;
            color: #000;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
        <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-id-card mr-3"></i>PANEL DE REGISTRO DE PRODUCTOS</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center mb-4">
                <button type="button" id="btnAddNuevoReg" class="btn btn-success btn-sm mr-3"><i class="fas fa-user-plus mr-2"></i>Nuevo Registro</button>
            </div>

            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-striped table-bordered table-sm" id="tbProductos" cellspacing="0" style="width: 100%">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Descripcion</th>
                                <%--<th>Precio Compra</th>--%>
                                <th>Precio Venta</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="modalProductos" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="loaddd">
            <div class="modal-header">
                <h6 id="myTitulodr">Detalle</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" value="0" id="txtIdProducto">
                <div class="form-group">
                    <label for="txtNombre">Nombre del Producto</label>
                    <input type="text" class="form-control input-validar" id="txtNombre" name="Nombre Producto">
                </div>

                <div class="form-row">
                    <div class="form-group col-sm-4">
                        <label for="txtPrecioCompra">Precio Compra</label>
                        <input type="number" class="form-control input-validar" id="txtPrecioCompra" name="Precio Compra">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="txtPrecioVenta">Precio Venta</label>
                        <input type="number" class="form-control input-validar" id="txtPrecioVenta" name="Precio Venta">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="txtCant">Cantidad</label>
                        <input type="number" class="form-control input-validar" id="txtCant" name="Cantidad">
                    </div>
                </div>

                <div class="form-group">
                    <label for="txtDescripcion">Descripcion del producto</label>
                    <textarea class="form-control" rows="3" id="txtDescripcion"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnGuardarCambios" class="btn btn-primary btn-sm" type="button">Guardar Cambios</button>
                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>

    <div class="modal fade" id="modalDatadet" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6>Detalle del Producto</h6>
                    <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="input-group input-group-sm col-sm-8 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupProdu">Producto:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupProdu"
                                id="txtProdd" disabled>
                        </div>
                        <div class="input-group input-group-sm col-sm-4 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupcodigo">Codigo:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupcodigo"
                                id="txtNumVenta" disabled>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroucanrmm">Cantidad:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroucanrmm"
                                id="txtCantnnn" disabled>
                        </div>
                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupfechare">Registrado:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupfechare"
                                id="txtFecharegg" disabled>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupreciocom">Precio Compra:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGroupreciocom"
                                id="txtpreciocomm" disabled>
                        </div>
                
                        <div class="input-group input-group-sm col-sm-6 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGrouprecivent">Precio Venta:</span>
                            </div>
                            <input type="text" class="form-control text-right" aria-label="Small" aria-describedby="inputGrouprecivent"
                                id="txtpreciovennn" disabled>
                        </div>

                    </div>
                    <div class="form-group">
                        <label for="txtDescripciondet">Descripcion del producto</label>
                        <textarea class="form-control" rows="2" id="txtDescripciondet" disabled></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- <a href="#" class="btn btn-primary btn-sm" target="_blank" id="linkImprimir">Imprimir</a> -->
                    <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%--<script src="jsdev/PageProductos.js" type="text/javascript"></script>--%>
    <script src="jsdev/PageProductos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
