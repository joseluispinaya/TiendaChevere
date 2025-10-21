using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class EUsuario
    {
        public int IdUsuario { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Correo { get; set; }
        public string UserSis { get; set; }
        public string Clave { get; set; }
        public string Celular { get; set; }
        public int IdNegocio { get; set; }
        public bool Permisos { get; set; }
        public bool Estado { get; set; }
        public string FechaRegistro { get; set; }
        public ENegocio RefNegocio { get; set; }
        public string FullNombre => $"{Nombres} {Apellidos}";
    }
}
