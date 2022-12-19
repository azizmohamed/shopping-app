using System.Collections.Generic;
using ShoppingApp.Domain;

namespace ShoppingApp.Repositories
{
    public interface IOrderRepository
    {
        decimal CalculateAmount(IEnumerable<OrderProduct> orderProducts);
        Order PlaceOrder(IEnumerable<OrderProduct> orderProducts);
    }
}