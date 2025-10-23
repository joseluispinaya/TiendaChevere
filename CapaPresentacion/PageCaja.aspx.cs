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
	public partial class PageCaja : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{

		}

        [WebMethod]
        public static Respuesta<List<ECaja>> ListaCajaMesNue(int IdNegocio)
        {
            try
            {
                Respuesta<List<ECaja>> Lista = NProducto.GetInstance().ListaCajaMesNue(IdNegocio);
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECaja>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productores: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<List<ECaja>> ListaCajaMes()
        {
            try
            {
                Respuesta<List<ECaja>> Lista = NProducto.GetInstance().ListaCajaMes();
                return Lista;
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECaja>>()
                {
                    Estado = false,
                    Mensaje = "Error al obtener los productores: " + ex.Message,
                    Data = null
                };
            }
        }

        [WebMethod]
        public static Respuesta<bool> Guardar(ECaja oCaja)
        {
            try
            {
                if (oCaja == null)
                {
                    return new Respuesta<bool>()
                    {
                        Estado = false,
                        Mensaje = "Intente mas tarde"
                    };
                }

                // Pasar el objeto transformado a la capa de negocio
                Respuesta<bool> respuesta = NProducto.GetInstance().RegistrarCaja(oCaja);

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