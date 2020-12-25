using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MVC_AJAX.Startup))]
namespace MVC_AJAX
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
        }
    }
}
