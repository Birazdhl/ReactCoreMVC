using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;

namespace Model.Configuration
{
    public class ConfigurationConnection
    {
        public static string connectionString = "Data Source=localhost\\MSSQLSERVER02;Initial Catalog=Test;Integrated Security=True";
    }
}
