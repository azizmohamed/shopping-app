using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ShoppingApp.ViewModel;
using ShoppingApp.Repositories;
using AutoMapper;

namespace ShoppingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductController(IProductRepository productRepository,
                                 ILogger<ProductController> logger,
                                 IMapper mapper)
        {
            _productRepository = productRepository;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<Product> Get([FromQuery] int page, [FromQuery]int count)
        {
            var products = _productRepository.GetProducts(page, count);
            return _mapper.Map<IEnumerable<Product>>(products);
        }
    }
}
