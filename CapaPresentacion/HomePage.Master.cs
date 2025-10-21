using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
	public partial class HomePage : System.Web.UI.MasterPage
	{
		protected void Page_Load(object sender, EventArgs e)
		{
            Response.AppendHeader("Cache-Control", "no-store");
            if (!IsPostBack)
            {
                // Validar si hay sesión activa
                if (Session["adminUs"] == null)
                {
                    // No hay usuario en sesión → redirigir al login
                    Response.Redirect("Login.aspx");
                    return;
                }

                // Si existe, puedes recuperar los datos del usuario
                //var user = (EUsuario)Session["adminUs"];
            }
        }
	}
}