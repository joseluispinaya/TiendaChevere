<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PagePedidos.aspx.cs" Inherits="CapaPresentacion.PagePedidos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
        <div class="row">
        <div class="col-sm-12">
            <div class="card shadow mb-4">
                <div class="card-header bg-second-primary">
                    <h6 class="m-0 font-weight-bold text-white">Pedido de Productos</h6>
                </div>
                <div class="card-body">
                    <div class="form-row align-items-end">
                        <div class="form-group col-sm-3">
                            <label for="txtFechaAct">Fecha Actual</label>
                            <input type="text" class="form-control form-control-sm" id="txtFechaAct" disabled>
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="txtCantidad">Cantidad</label>
                            <input type="text" class="form-control form-control-sm" id="txtCantidad" disabled>
                        </div>
                        <div class="form-group col-sm-3">
                            <button type="button" class="btn btn-success btn-block btn-sm" id="btnBuscar"><i class="fas fa-search mr-2"></i>Buscar</button>
                        </div>
                        <div class="form-group col-sm-3">
                            <button class="btn btn-info btn-block btn-sm" type="button" id="btnImprimir"><i class="fas fa-print mr-2"></i>Reporte</button>
                        </div>
                    </div>
                    <h6 class="mb-2 font-weight-bold text-primary text-center">Lista de Productos para comprar</h6>

                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table table-striped table-sm" id="tbProducto">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Producto</th>
                                        <th>Descripcion</th>
                                        <th>Precio Compra</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalListaPro" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h6>Lista de Productos</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <table id="tbLisProd" class="table table-sm table-striped table-bordered" cellspacing="0" style="width: 100%">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Producto</th>
                                    <th>Descripcion</th>
                                    <th>Precio Compra</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="vendor/jspdfzero/jspdfzero.js"></script>
    <%--<script src="jsdev/PagePedidos.js" type="text/javascript"></script>--%>
    <script src="jsdev/PagePedidos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
