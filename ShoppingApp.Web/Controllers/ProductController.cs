using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShoppingApp.ViewModel;
using ShoppingApp.Application;
using AutoMapper;

namespace ShoppingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductController(IProductRepository productRepository,
                                 IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> Get([FromQuery] int page, [FromQuery]int count)
        {
            var products = _productRepository.GetProducts(page, count);
            return Ok(_mapper.Map<IEnumerable<Product>>(products));
        }
    }
}
