using System;
using System.Collections.Generic;

namespace ShoppingApp.Model
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; }
        public string Thumbnail { get; set; }
    }
}

