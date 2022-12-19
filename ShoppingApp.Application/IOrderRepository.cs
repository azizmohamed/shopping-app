using System.Collections.Generic;
using ShoppingApp.Domain;

namespace ShoppingApp.Application
{
    public interface IOrderRepository
    {
        decimal CalculateAmount(IEnumerable<OrderProduct> orderProducts);
        Order PlaceOrder(IEnumerable<OrderProduct> orderProducts);
    }
}