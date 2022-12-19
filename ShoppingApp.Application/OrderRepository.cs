using System.Collections.Generic;
using ShoppingApp.Persistence;
using ShoppingApp.Domain;
using System.Linq;

namespace ShoppingApp.Application
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ShoppingAppDbContext _dbContext;
        public OrderRepository(ShoppingAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public decimal CalculateAmount(IEnumerable<OrderProduct> orderProducts)
        {
            return orderProducts.Sum(op => op.Quantity * _dbContext.Product.First(p => p.Id == op.ProductId).Price);
        }

        public async Task<Order> PlaceOrderAsync(IEnumerable<OrderProduct> orderProducts)
        {
            var order = new Order(){
                OrderProducts = orderProducts.ToList(),
                OrderPlaced = true
            };
            await _dbContext.Order.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }
    }
}