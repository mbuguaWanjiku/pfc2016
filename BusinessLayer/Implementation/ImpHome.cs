﻿using DataLayer.Entities;
using DataLayer.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Implementation
{
    public class ImpHome
    {

        public Users AccessDatabase(string PatientToSearch)
        {
            using (SqlConnection connection = new SqlConnection("Data Source=SQL5025.myASP.NET;Initial Catalog=DB_A0ADFA_HPCareDBContext;User Id=DB_A0ADFA_HPCareDBContext_admin;Password=hpcare2016;"))
            {
                //using(SqlConnection connection = new SqlConnection("Data Source= MÁRCIA\\SQLSERVER ; Initial Catalog =HPCareDBContext;Integrated Security=SSPI")) {

                SqlCommand command = new SqlCommand("select * from Users where user_identification = '" + PatientToSearch + "';", connection);
                command.CommandType = CommandType.Text;
                command.Connection = connection;
                connection.Open();
                DbDataReader dbDataReader = command.ExecuteReader();
                //Users patient;
                int id = 0;
                while (dbDataReader.Read())
                {
                    id = GetIntSafely(dbDataReader, 0);
                }
                dbDataReader.Close();
              
                return new HPCareDBContext().Users.Find(id);
               
            }
        }
        /// <summary>
        /// Get int safely in case the dbReader is null
        /// </summary>
        /// <param name="reader"></param>
        /// <param name="colIndex"></param>
        /// <returns></returns>
            private int GetIntSafely(DbDataReader reader, int colIndex)
        {
            return (reader.IsDBNull(colIndex) ? 0 : reader.GetInt32(colIndex));
        }
    }


    }

