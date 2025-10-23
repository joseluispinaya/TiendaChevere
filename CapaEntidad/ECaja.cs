using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ECaja
    {
        public int IdCaja { get; set; }
        public int IdNegocio { get; set; }
        public decimal MontoTotal { get; set; }
        public string Comentario { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        public string MontoTotalStr => MontoTotal.ToString("0.00") + " /BS";

    }
}
