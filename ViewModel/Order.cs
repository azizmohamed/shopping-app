using System;
using System.Collections.Generic;

namespace ShoppingApp.ViewModel
{
    public class Order
    {
        public Guid Id { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
    }
}