using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ShoppingApp.ViewModel;
using System.Linq;
using ShoppingApp.Application;
using AutoMapper;
using System.Threading.Tasks;

namespace ShoppingApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController:ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        public OrderController(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository  = orderRepository;
            _mapper = mapper;
        }
        [HttpPost("calculate")]
        public ActionResult<OrderAmount> CalculateAmount([FromBody] IEnumerable<OrderProduct> orderProducts)
        {
            var amount = _orderRepository.CalculateAmount(_mapper.Map<IEnumerable<Domain.OrderProduct>>(orderProducts));
            var shipping = amount > 50 ? 20 : 10;
            return Ok(new OrderAmount(){
                Amount = amount,
                Shipping = shipping,
                Total = amount + shipping
            });
        }


        [HttpPost("place")]
        public async Task<ActionResult<Order>> PlaceOrder([FromBody] IEnumerable<OrderProduct> orderProducts)
        {
            var placedOrder = await _orderRepository.PlaceOrderAsync(_mapper.Map<IEnumerable<Domain.OrderProduct>>(orderProducts));
            return Ok(_mapper.Map<Order>(placedOrder));
        }
    }
}