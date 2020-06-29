using Dapper;
using Domain;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Model.Configuration;
using Persistence;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Model
{
    public class EmployeeService : IEmployeeService
    {
        public readonly DataContext _context;
        public IDbConnection db = new SqlConnection(ConfigurationConnection.connectionString);

        public EmployeeService(DataContext context)
        {
            _context = context;
        }
        public async Task<List<Employee>> GetEmployeesList()
        {
            //var result = await _context.Employees.ToListAsync();
            //return result;

            List<Employee> EmployeeList = new List<Employee>();
            EmployeeList = db.Query<Employee>("Select * From Employees").ToList();
            return EmployeeList;
        }

        public async Task<Employee> GetEmployeeById(Guid id)
        {
            var acitvity = await _context.Employees.FindAsync(id);
            return acitvity;

        }

        public async Task<AccountResult> CreateEmployee(Employee Employee)
        {
            var resultMessage = new AccountResult();
            _context.Employees.Add(Employee);
            await _context.SaveChangesAsync();
            //var success =  _context.SaveChanges() > 0;

            //if (success)
            //    return success;

            return resultMessage;

            throw new Exception("Problem Saving Changes");

        }

        public async Task<AccountResult> DeleteEmployee(Guid id)
        {
            var resultMessage = new AccountResult();

            var Employee = await _context.Employees.FindAsync(id);
            _context.Remove(Employee);

            var success = _context.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");
        }

        public async Task<AccountResult> EditEmployee(Employee employee)
        {
            var resultMessage = new AccountResult();

            var oldEmployee = await _context.Employees.FindAsync(employee.Id);
            if (oldEmployee.Id != null)
            {
                oldEmployee.FirstName = employee.FirstName ?? oldEmployee.FirstName;
                oldEmployee.LastName = employee.LastName ?? oldEmployee.LastName;
                oldEmployee.Address = employee.Address ?? oldEmployee.Address;
                oldEmployee.Organization = employee.Organization ?? oldEmployee.Organization;
            }
            var success = _context.SaveChanges() > 0;

            if (success)
                return resultMessage;

            throw new Exception("Problem Saving Changes");


        }
    }
}
