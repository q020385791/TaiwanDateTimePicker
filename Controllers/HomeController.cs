using System.Diagnostics;
using DateTimePickerROC.Models;
using Microsoft.AspNetCore.Mvc;

namespace DateTimePickerROC.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Demo()
        {
            ExampleViewModel model=new ExampleViewModel();
            model.ExampleDate = DateTime.Now;
            model.ExampleDateWithTime = DateTime.Now;
            return View(model);
        }
        [HttpPost]
        public IActionResult DemoSubmit(ExampleViewModel model)
        {//下中斷點觀察拿到的值

            return View(model);
        }


        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
