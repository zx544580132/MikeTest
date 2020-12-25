using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC_AJAX.Models;
using Newtonsoft.Json;

namespace MVC_AJAX.Controllers
{
    public class HomeController : Controller
    {
        Northwind db = new Northwind();
        // GET: Home

        //ViewModel Method
        //public JsonResult GetList()
        //{
        //    List<CustomersViewModel> customers = db.Customers.Select(x => new CustomersViewModel
        //    { 
        //        CustomerID = x.CustomerID,
        //        CompanyName = x.CompanyName,
        //        ContactName = x.ContactName,
        //        Phone = x.Phone
        //    }).ToList();

        //    return Json(customers, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetList(int? page, string searchID, string searchComp)
        {
            int lastPage;
            var query = db.Customers.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchID))
            {
                query = query.Where(s => s.CustomerID.Contains(searchID));
            }

            if (!string.IsNullOrWhiteSpace(searchComp))
            {
                query = query.Where(s => s.CompanyName.Contains(searchComp));
            }

            if (page == null)
            {
                page = 1;
            }

            var dataSum = query.Count();

            if (dataSum % 5 == 0)
            {
                lastPage = dataSum / 5;
            }
            else
            {
                lastPage = (dataSum / 5) + 1;
            }

            var dataList = query.OrderBy(p => p.CustomerID).Skip((int)(page - 1) * 5).Take(5).Select(c => new
            {
                CustomerID = c.CustomerID,
                CompanyName = c.CompanyName,
                ContactName = c.ContactName,
                Phone = c.Phone

            }).ToList();

            return Json( new { dataList, page, lastPage }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Create(Customers cudObj)
        {
            Customers customers = new Customers();
            customers.CustomerID = cudObj.CustomerID;
            customers.CompanyName = cudObj.CompanyName;
            customers.ContactName = cudObj.ContactName;
            customers.Phone = cudObj.Phone;
            db.Customers.Add(customers);
            db.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Update(Customers cudObj)
        {
            var editData = db.Customers.Where(e => e.CustomerID == cudObj.CustomerID).FirstOrDefault();
            editData.CustomerID = cudObj.CustomerID;
            editData.CompanyName = cudObj.CompanyName;
            editData.ContactName = cudObj.ContactName;
            editData.Phone = cudObj.Phone;

            db.SaveChanges();

            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Delete(string customerID)
        {
            var del = db.Customers.Find(customerID);
            db.Customers.Remove(del);
            db.SaveChanges();

            return RedirectToAction("Index");
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing && db != null)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}