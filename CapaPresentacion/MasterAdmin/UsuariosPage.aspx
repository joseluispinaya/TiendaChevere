﻿<%@ Page Title="" Language="C#" MasterPageFile="~/MasterAdmin/HomeAdmin.Master" AutoEventWireup="true" CodeBehind="UsuariosPage.aspx.cs" Inherits="CapaPresentacion.MasterAdmin.UsuariosPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="card shadow mb-4">
    <div class="card-header bg-second-primary">
        <h6 class="m-0 font-weight-bold text-white"><i class="fas fa-id-card mr-3"></i>PANEL DE USUARIOS</h6>
    </div>
    <div class="card-body">
        <div class="row justify-content-center mb-4">
            <button type="button" id="btnAddNuevoReg" class="btn btn-success btn-sm mr-3"><i class="fas fa-id-card mr-2"></i>Nuevo Registro</button>
        </div>

        <div class="row">
            <div class="col-sm-12">
                <table class="table table-striped table-bordered table-sm" id="tbUsuarios" cellspacing="0" style="width: 100%">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombres</th>
                            <th>Correo</th>
                            <th>Celular</th>
                            <th>Negocio</th>
                            <th>Permiso</th>
                            <th>Estado</th>
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

<div class="modal fade" id="modalUsuarios" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content" id="loaddd">
            <div class="modal-header">
                <h6 id="myTitulodr">Detalle</h6>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" value="0" id="txtIdUsuario">
                <div class="form-row">
                    <div class="form-group col-sm-4">
                        <label for="txtNombre">Nombres</label>
                        <input type="text" class="form-control form-control-sm input-validar" id="txtNombre" name="Nombres">
                    </div>
                    <div class="form-group col-sm-5">
                        <label for="txtApellidos">Apellidos</label>
                        <input type="text" class="form-control form-control-sm input-validar" id="txtApellidos" name="Apellidos">
                    </div>
                    <div class="form-group col-sm-3">
                        <label for="txtCelular">Celular</label>
                        <input type="text" class="form-control form-control-sm input-validar" id="txtCelular" name="Celular">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-sm-6">
                        <label for="txtCorreo">Correo</label>
                        <input type="text" class="form-control form-control-sm input-validar" id="txtCorreo" name="Correo">
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="txtClave">Clave</label>
                        <input type="text" class="form-control form-control-sm input-validar" id="txtClave" name="Clave">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-sm-8">
                        <label for="cboNegocio">Select Negocio</label>
                        <select class="form-control form-control-sm" id="cboNegocio">
                        </select>
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="cboEstado">Estado</label>
                        <select class="form-control form-control-sm" id="cboEstado">
                            <option value="1">Activo</option>
                            <option value="0">No Activo</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btnGuardarCambios" class="btn btn-primary btn-sm" type="button">Guardar Cambios</button>
                <button class="btn btn-danger btn-sm" type="button" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%--<script src="jsadm/UsuariosPage.js" type="text/javascript"></script>--%>
<script src="jsadm/UsuariosPage.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
