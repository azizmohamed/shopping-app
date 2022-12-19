using System;
using System.Collections.Generic;

namespace ShoppingApp.Model
{
    public class Order
    {
        public Guid Id { get; set; }
        public bool OrderPlaced { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
    }
}