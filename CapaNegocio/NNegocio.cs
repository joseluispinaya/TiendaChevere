using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class NNegocio
    {
        #region "PATRON SINGLETON"
        private static NNegocio daoEmpleado = null;
        private NNegocio() { }
        public static NNegocio GetInstance()
        {
            if (daoEmpleado == null)
            {
                daoEmpleado = new NNegocio();
            }
            return daoEmpleado;
        }
        #endregion

        public Respuesta<bool> RegistrarNegocio(ENegocio oNegocio)
        {
            return DNegocio.GetInstance().RegistrarNegocio(oNegocio);
        }

        public Respuesta<bool> EditarNegocio(ENegocio oNegocio)
        {
            return DNegocio.GetInstance().EditarNegocio(oNegocio);
        }

        public Respuesta<List<ENegocio>> ListaNegocios()
        {
            return DNegocio.GetInstance().ListaNegocios();
        }

        // usuarios

        public Respuesta<bool> RegistrarUsuarios(EUsuario oUsuario)
        {
            return DNegocio.GetInstance().RegistrarUsuarios(oUsuario);
        }

        public Respuesta<bool> Editarusuarios(EUsuario oUsuario)
        {
            return DNegocio.GetInstance().Editarusuarios(oUsuario);
        }

        public Respuesta<List<EUsuario>> ListaUsuarios()
        {
            return DNegocio.GetInstance().ListaUsuarios();
        }

        public Respuesta<EUsuario> LoginUsuario(string Correo, string Clave)
        {
            return DNegocio.GetInstance().LoginUsuario(Correo, Clave);
        }

        public Respuesta<List<EUsuario>> ListaUsuariosNego(int IdNegocio)
        {
            return DNegocio.GetInstance().ListaUsuariosNego(IdNegocio);
        }

        public Respuesta<EAdministrador> LoginAdmin(string Correo, string Clave)
        {
            return DNegocio.GetInstance().LoginAdmin(Correo, Clave);
        }

        public Respuesta<bool> EstadoPermisos(int IdUsuario, bool Permisos)
        {
            return DNegocio.GetInstance().EstadoPermisos(IdUsuario, Permisos);
        }

    }
}
