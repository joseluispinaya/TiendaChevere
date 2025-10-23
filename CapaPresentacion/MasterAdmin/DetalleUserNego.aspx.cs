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
	public partial class DetalleUserNego : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EUsuario>> ListaUsuariosNego(int IdNegocio)
        {
            try
            {
                Respuesta<List<EUsuario>> Lista = NNegocio.GetInstance().ListaUsuariosNego(IdNegocio);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los USUARIOS: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}