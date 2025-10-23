using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion.MasterAdmin
{
	public partial class UsuariosPage : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EUsuario>> ListaUsuarios()
        {
            try
            {
                Respuesta<List<EUsuario>> Lista = NNegocio.GetInstance().ListaUsuarios();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los usuarios: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(EUsuario oUsuario)
        {
            try
            {
                string userUni = Guid.NewGuid().ToString();
                oUsuario.UserSis = userUni;
                // Registrar
                Respuesta<bool> respuesta = NNegocio.GetInstance().RegistrarUsuarios(oUsuario);
                return respuesta;
            }
            catch (Exception)
            {
                // Manejar otras excepciones
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error intente mas tarde"
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EUsuario oUsuario)
        {
            try
            {
                if (oUsuario == null || oUsuario.IdUsuario <= 0)
                {
                    return new Respuesta<bool>()
                    {
                        Estado = false,
                        Mensaje = "Intente acnualizar mas tarde"
                    };
                }

                // Pasar el objeto transformado a la capa de negocio
                Respuesta<bool> respuesta = NNegocio.GetInstance().Editarusuarios(oUsuario);

                return respuesta;
            }
            catch (Exception)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error intente mas tarde"
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EstadoPermisos(int IdUsuario, bool Permisos)
        {
            try
            {
                Respuesta<bool> respuesta = NNegocio.GetInstance().EstadoPermisos(IdUsuario, Permisos);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}