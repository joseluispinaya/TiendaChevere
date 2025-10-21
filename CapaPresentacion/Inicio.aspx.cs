using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CapaEntidad;
using System.Web.Services;

namespace CapaPresentacion
{
	public partial class Inicio : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod]
        public static Respuesta<bool> CerrarSesion()
        {
            //Configuracion.Ousuario = null;
            HttpContext.Current.Session["adminUs"] = null;
            HttpContext.Current.Session.Abandon();

            return new Respuesta<bool>() { Estado = true };

        }
    }
}