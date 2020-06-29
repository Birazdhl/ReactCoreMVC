using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace TechTalk.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService; 
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployeeList()
        {
            var result = await _employeeService.GetEmployeesList();
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<Employee>>> GetEmployee(Guid id)
        {
            var result = await _employeeService.GetEmployeeById(id);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> CreateEmployee([FromBody] Employee Employee)
        {
            var result = await _employeeService.CreateEmployee(Employee);
            return Ok(Employee.FirstName);
        }

        [HttpPost]
        public async Task<ActionResult> EditEmployee([FromBody] Employee Employee)
        {
            var result = await _employeeService.EditEmployee(Employee);
            return Ok(Employee.Id);
        }

        [HttpGet]
        public async Task<ActionResult> DeleteEmployee(Guid id)
        {
            await _employeeService.DeleteEmployee(id);
            return Ok();
        }
    }
}