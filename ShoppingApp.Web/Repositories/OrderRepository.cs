using System.Collections.Generic;
using ShoppingApp.Data;
using ShoppingApp.Domain;
using System.Linq;

namespace ShoppingApp.Repositories
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

        public Order PlaceOrder(IEnumerable<OrderProduct> orderProducts)
        {
            var order = new Order(){
                OrderProducts = orderProducts.ToList(),
                OrderPlaced = true
            };
            _dbContext.Order.Add(order);
            _dbContext.SaveChanges();
            return order;
        }
    }
}