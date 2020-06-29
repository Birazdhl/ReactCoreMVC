using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Employees.Any())
            {
                var activities = new List<Employee>
               {
                    new Employee
                    {
                        FirstName = "Biraz",
                        LastName = "Dahal",
                        Address = "Biratnagar",
                        Organization = "drinks"
                    }
               };

                context.Employees.AddRange(activities);
                context.SaveChanges();

            }
        }
    }
}
