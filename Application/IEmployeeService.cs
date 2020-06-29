using Domain;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployeesList();

        Task<Employee> GetEmployeeById(Guid id);
        Task<AccountResult> CreateEmployee(Employee Employee);
        Task<AccountResult> EditEmployee(Employee Employee);
        Task<AccountResult> DeleteEmployee(Guid id);
    }
}
