using System.Collections.Generic;
using ShoppingApp.Domain;

namespace ShoppingApp.Application
{
    public interface IOrderRepository
    {
        decimal CalculateAmount(IEnumerable<OrderProduct> orderProducts);
        Task<Order> PlaceOrderAsync(IEnumerable<OrderProduct> orderProducts);
    }
}