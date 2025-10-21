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
    public class DNegocio
    {
        #region "PATRON SINGLETON"
        public static DNegocio _instancia = null;

        private DNegocio()
        {

        }

        public static DNegocio GetInstance()
        {
            if (_instancia == null)
            {
                _instancia = new DNegocio();
            }
            return _instancia;
        }
        #endregion

        public Respuesta<bool> RegistrarNegocio(ENegocio oNegocio)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarNegocios", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@NombreNegocio", oNegocio.NombreNegocio);
                        cmd.Parameters.AddWithValue("@Direccion", oNegocio.Direccion);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar ingrese otro Nro Ci o intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> EditarNegocio(ENegocio oNegocio)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarNegocio", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdNegocio", oNegocio.IdNegocio);
                        cmd.Parameters.AddWithValue("@NombreNegocio", oNegocio.NombreNegocio);
                        cmd.Parameters.AddWithValue("@Direccion", oNegocio.Direccion);
                        cmd.Parameters.AddWithValue("@Estado", oNegocio.Estado);

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
                    Mensaje = respuesta ? "Se actualizo correctamente" : "Error al actualizar ya existe el nro Ci o intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<ENegocio>> ListaNegocios()
        {
            try
            {
                List<ENegocio> rptLista = new List<ENegocio>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerNegocios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ENegocio()
                                {
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    NombreNegocio = dr["NombreNegocio"].ToString(),
                                    Direccion = dr["Direccion"].ToString(),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy")
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ENegocio>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Negocios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ENegocio>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> RegistrarUsuarios(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_RegistrarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        cmd.Parameters.AddWithValue("@UserSis", oUsuario.UserSis);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);
                        cmd.Parameters.AddWithValue("@IdNegocio", oUsuario.IdNegocio);

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
                    Mensaje = respuesta ? "Se registro correctamente" : "Error al registrar el usuario o correo ya existen"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<bool> Editarusuarios(EUsuario oUsuario)
        {
            try
            {
                bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ModificarUsuario", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUsuario", oUsuario.IdUsuario);
                        cmd.Parameters.AddWithValue("@Nombres", oUsuario.Nombres);
                        cmd.Parameters.AddWithValue("@Apellidos", oUsuario.Apellidos);
                        cmd.Parameters.AddWithValue("@Correo", oUsuario.Correo);
                        //cmd.Parameters.AddWithValue("@UserSis", oUsuario.UserSis);
                        cmd.Parameters.AddWithValue("@Clave", oUsuario.Clave);
                        cmd.Parameters.AddWithValue("@Celular", oUsuario.Celular);
                        cmd.Parameters.AddWithValue("@IdNegocio", oUsuario.IdNegocio);
                        cmd.Parameters.AddWithValue("@Estado", oUsuario.Estado);

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
                    Mensaje = respuesta ? "Se actualizo correctamente" : "Error al actualizar usuario o correo ya existen"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        public Respuesta<List<EUsuario>> ListaUsuarios()
        {
            try
            {
                List<EUsuario> rptLista = new List<EUsuario>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerUsuario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EUsuario()
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    UserSis = dr["UserSis"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    Permisos = Convert.ToBoolean(dr["Permisos"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    FechaRegistro = Convert.ToDateTime(dr["FechaRegistro"]).ToString("dd/MM/yyyy"),
                                    RefNegocio = new ENegocio
                                    {
                                        NombreNegocio = dr["NombreNegocio"].ToString()
                                    }
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Usuarios obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuario>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<EUsuario> LoginUsuario(string Correo, string Clave)
        {
            try
            {
                EUsuario obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_LogeoUsuarios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        //comando.CommandTimeout = 30;
                        comando.Parameters.AddWithValue("@Correo", Correo);
                        comando.Parameters.AddWithValue("@Clave", Clave);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EUsuario
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    Nombres = dr["Nombres"].ToString(),
                                    Apellidos = dr["Apellidos"].ToString(),
                                    Correo = dr["Correo"].ToString(),
                                    UserSis = dr["UserSis"].ToString(),
                                    Clave = dr["Clave"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    Permisos = Convert.ToBoolean(dr["Permisos"]),
                                    Estado = Convert.ToBoolean(dr["Estado"]),
                                    RefNegocio = new ENegocio
                                    {
                                        NombreNegocio = dr["NombreNegocio"].ToString()
                                    }
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EUsuario>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Usuario obtenido correctamente" : "Credenciales incorrectas o usuario no encontrado"
                };
            }
            catch (SqlException ex)
            {
                // Manejo de excepciones relacionadas con la base de datos
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Mensaje = "Error en la base de datos: " + ex.Message,
                    Data = null
                };
            }
            catch (Exception ex)
            {
                // Manejo de excepciones generales
                return new Respuesta<EUsuario>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error inesperado: " + ex.Message,
                    Data = null
                };
            }
        }


    }
}
