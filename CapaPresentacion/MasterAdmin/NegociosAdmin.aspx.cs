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
	public partial class NegociosAdmin : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<ENegocio>> ListaNegocios()
        {
            try
            {
                Respuesta<List<ENegocio>> Lista = NNegocio.GetInstance().ListaNegocios();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ENegocio>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productores: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ENegocio oNegocio)
        {
            try
            {
                // Registrar
                Respuesta<bool> respuesta = NNegocio.GetInstance().RegistrarNegocio(oNegocio);
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
        public static Respuesta<bool> Editar(ENegocio oNegocio)
        {
            try
            {
                if (oNegocio == null || oNegocio.IdNegocio <= 0)
                {
                    return new Respuesta<bool>()
                    {
                        Estado = false,
                        Mensaje = "Intente acnualizar mas tarde"
                    };
                }

                // Pasar el objeto transformado a la capa de negocio
                Respuesta<bool> respuesta = NNegocio.GetInstance().EditarNegocio(oNegocio);

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

    }
}