using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using CapaNegocio;
using System.Web.Services;

namespace CapaPresentacion
{
	public partial class PageProductos : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<EProducto>> ObtenerProductosporNegocio(int IdNegocio)
        {
            try
            {
                Respuesta<List<EProducto>> Lista = NProducto.GetInstance().ObtenerProductosporNegocio(IdNegocio);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productos: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<string> Guardar(EProducto oProducto)
        {
            try
            {
                // Registrar el producto
                Respuesta<string> respuesta = NProducto.GetInstance().RegistrarProducto(oProducto);
                return respuesta;
            }
            catch (Exception)
            {
                // Manejar otras excepciones
                return new Respuesta<string>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error intente mas tarde"
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Editar(EProducto oProducto)
        {
            try
            {
                if (oProducto == null || oProducto.IdProducto <= 0)
                {
                    return new Respuesta<bool>()
                    {
                        Estado = false,
                        Mensaje = "Intente acnualizar mas tarde"
                    };
                }

                // Pasar el objeto transformado a la capa de negocio
                Respuesta<bool> respuesta = NProducto.GetInstance().ActualizarProducto(oProducto);

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