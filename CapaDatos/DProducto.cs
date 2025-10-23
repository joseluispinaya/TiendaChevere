using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using CapaEntidad;

namespace CapaDatos
{
    public class DProducto
    {
        #region "PATRON SINGLETON"
        public static DProducto _instancia = null;

        private DProducto()
        {

        }

        public static DProducto GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DProducto();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<string> RegistrarProducto(EProducto producto)
        {
            try
            {
                var respt = string.Empty;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@PrecioCompra", producto.PrecioCompra);
                        cmd.Parameters.AddWithValue("@PrecioVenta", producto.PrecioVenta);
                        cmd.Parameters.AddWithValue("@Cantidad", producto.Cantidad);
                        cmd.Parameters.AddWithValue("@IdNegocio", producto.IdNegocio);

                        SqlParameter outputParam = new SqlParameter("@Codigo", SqlDbType.VarChar, 20)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respt = outputParam.Value.ToString();
                    }
                }

                bool encontrado = !string.IsNullOrEmpty(respt);

                return new Respuesta<string>
                {
                    Estado = encontrado,
                    Valor = encontrado ? respt : "",
                    Mensaje = encontrado ? "Registrado correctamente" : "Ocurrio un error intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<string>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Valor = ""
                };
            }
        }

        public Respuesta<bool> ActualizarProducto(EProducto producto)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdProducto", producto.IdProducto);
                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@PrecioCompra", producto.PrecioCompra);
                        cmd.Parameters.AddWithValue("@PrecioVenta", producto.PrecioVenta);
                        cmd.Parameters.AddWithValue("@Cantidad", producto.Cantidad);
                        //cmd.Parameters.AddWithValue("@Estado", producto.Estado);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se Actualizo correctamente" : "Error al Actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EProducto>> ObtenerProductosporNegocio(int IdNegocio)
        {
            try
            {
                List<EProducto> rptLista = new List<EProducto>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ProductosPorNegocio", con))
                    {
                        comando.Parameters.AddWithValue("@IdNegocio", IdNegocio);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EProducto()
                                {
                                    IdProducto = Convert.ToInt32(dr["IdProducto"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Nombre = dr["Nombre"].ToString(),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    PrecioCompra = Convert.ToDecimal(dr["PrecioCompra"]),
                                    PrecioVenta = Convert.ToDecimal(dr["PrecioVenta"]),
                                    Cantidad = Convert.ToInt32(dr["Cantidad"]),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    VFechaRegistro = Convert.ToDateTime(dr["FechaRegistro"].ToString())
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EProducto>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "productos obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EProducto>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ECaja>> ListaCajaMes()
        {
            try
            {
                List<ECaja> rptLista = new List<ECaja>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarCierreCajaMesActual", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECaja()
                                {
                                    IdCaja = Convert.ToInt32(dr["IdCaja"]),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    MontoTotal = Convert.ToDecimal(dr["MontoTotal"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy")
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECaja>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Informacion obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECaja>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ECaja>> ListaCajaMesNue(int IdNegocio)
        {
            try
            {
                List<ECaja> rptLista = new List<ECaja>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListarCierreCajaMeB", con))
                    {
                        comando.Parameters.AddWithValue("@IdNegocio", IdNegocio);
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ECaja()
                                {
                                    IdCaja = Convert.ToInt32(dr["IdCaja"]),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    MontoTotal = Convert.ToDecimal(dr["MontoTotal"]),
                                    Comentario = dr["Comentario"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy")
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ECaja>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Informacion obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ECaja>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarCaja(ECaja oNegocio)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarCierreCaja", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdNegocio", oNegocio.IdNegocio);
                        cmd.Parameters.AddWithValue("@MontoTotal", oNegocio.MontoTotal);
                        cmd.Parameters.AddWithValue("@Comentario", oNegocio.Comentario);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}
