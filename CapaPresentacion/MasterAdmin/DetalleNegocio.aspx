<%@ Page Title="" Language="C#" MasterPageFile="~/MasterAdmin/HomeAdmin.Master" AutoEventWireup="true" CodeBehind="DetalleNegocio.aspx.cs" Inherits="CapaPresentacion.MasterAdmin.DetalleNegocio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
        <div class="card-header bg-second-primary">
            <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-tags mr-3"></i>DETALLE DE PRODUCTOS POR TIENDA</h6>
        </div>
        <div class="card-body">
            <div class="row justify-content-center mb-4">
                <button type="button" id="btnAddNuevoReg" class="btn btn-success btn-sm mr-3"><i class="fas fa-user-plus mr-2"></i>Nuevo Registro</button>
                <button type="button" id="btnVolver" class="btn btn-danger btn-sm"><i class="fas fa-reply mr-2"></i>Volver</button>
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
                                <th>Precio Compra</th>
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="jsadm/DetalleNegocio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
<%--<script src="jsadm/DetalleNegocio.js" type="text/javascript"></script>--%>
</asp:Content>
