using AngularPostGet.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularPostGet.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        NorthwindEntities1 db = new NorthwindEntities1();
        public ActionResult Index()
        {
            return View();
        }

        //employees tablosuna veri eklemek istiyorum.

        //employees tablosundaki tüm insanları göstermek istiyorum.


        //angularjs ile cagıracagım ıcın jsonresult kullandım.
        public JsonResult GetAll()
        {
            var employeeList = db.Employees.Select(x => new
            {
                x.EmployeeID,
                x.FirstName,
                x.LastName

            }).ToList();
            return Json(employeeList, JsonRequestBehavior.AllowGet);
        }


        //edit butonuna bastığımda bana id ile verileri çekecek bir methoda ihtiyacım var.
        //buradan gelne bilgileri değiştirip yukarıdaki update employee methodun yollamam gerekiyor.
        public JsonResult getByID(string EmpID)
        {
            var emp = db.Employees.Find(EmpID);
            return Json(emp, JsonRequestBehavior.AllowGet);
        }

        //update işlemi için bana verileri kaydedecek methoda ihtiyacım var.

        public JsonResult UpdateEmployee(Employees Emp)
        {
            try
            {
                var employee = db.Employees.Where(x => x.EmployeeID == Emp.EmployeeID).FirstOrDefault();
                employee.FirstName = Emp.FirstName;
                employee.LastName = Emp.LastName;
                db.SaveChanges();
                return Json(employee, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {

                throw ex;
            }
            
            
        }

        //ekleme metodu

        public JsonResult Ekle(Employees emp)
        {
            var a = db.Employees.Add(emp);
            db.SaveChanges();
            return Json(a, JsonRequestBehavior.AllowGet);

        }

        //silme işlemi
        public JsonResult DeleteEmp (Employees emp)
        {
            int no = Convert.ToInt32(emp.EmployeeID);
            var emplist = db.Employees.Where(x => x.EmployeeID == no).FirstOrDefault();
            db.Employees.Remove(emplist);
            db.SaveChanges();
                return Json(emplist, JsonRequestBehavior.AllowGet);
        }
    }
}