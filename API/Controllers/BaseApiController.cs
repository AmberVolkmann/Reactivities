using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    // This is the name that you're going to be using for all paths since they reference this file
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}