using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ENegocio
    {
        public int IdNegocio { get; set; }
        public string NombreNegocio { get; set; }
        public string Direccion { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
    }
}
