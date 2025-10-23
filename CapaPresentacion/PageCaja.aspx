<%@ Page Title="" Language="C#" MasterPageFile="~/HomePage.Master" AutoEventWireup="true" CodeBehind="PageCaja.aspx.cs" Inherits="CapaPresentacion.PageCaja" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-sm-8">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card shadow mb-4">
                        <div class="card-header bg-second-primary">
                            <h6 class="m-0 font-weight-bold text-white">Detalle Mensual</h6>
                        </div>
                        <div class="card-body">
                            <input type="hidden" value="0" id="txtIdTienda">
                            
                            <div class="form-row align-items-end">
                                <div class="form-group col-sm-4">
                                    <label for="txtTienda">Tienda</label>
                                    <input type="text" class="form-control form-control-sm" id="txtTienda" disabled>
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="txtUsuario">Usuario</label>
                                    <input type="text" class="form-control form-control-sm" id="txtUsuario" disabled>
                                </div>
                                <div class="form-group col-sm-4">
                                    <label for="txtFechaAct">Fecha Actual</label>
                                    <input type="text" class="form-control form-control-sm" id="txtFechaAct" disabled>
                                </div>
                            </div>

                            <h6 class="mb-3 font-weight-bold text-primary">Informacion Cierre de Caja del Mes Actual</h6>

                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-striped table-bordered table-sm" id="tbCajac" cellspacing="0" style="width: 100%">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Monto</th>
                                                <th>Detalle</th>
                                                <th>Estado</th>
                                                <th>Fecha</th>
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

        </div>
        <div class="col-sm-4">

            <div class="row">
                <div class="col-sm-12">
                    <div class="card shadow mb-4">
                        <div class="card-header bg-second-primary">
                            <h6 class="m-0 font-weight-bold text-white">Detalle Caja</h6>
                        </div>
                        <div class="card-body" id="loadingAc">

                            <div class="input-group input-group-sm mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupDescuento">Ingrese Total Caja:</span>
                                </div>
                                <input type="text" class="form-control text-right" aria-label="Small"
                                    aria-describedby="inputGroupDescuento" id="txtTotalCaja">
                            </div>

                            <div class="form-group mb-3">
                                <label for="txtDetalleCa">Detalle</label>
                                <textarea class="form-control" rows="3" id="txtDetalleCa"></textarea>
                            </div>

                            <div class="form-group mb-0">
                                <button class="btn btn-success btn-sm btn-block" type="button" id="btnRegistrarPaga">Registrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%--<script src="jsdev/PageCaja.js" type="text/javascript"></script>--%>
<script src="jsdev/PageCaja.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
