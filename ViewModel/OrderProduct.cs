using System;

namespace ShoppingApp.ViewModel
{
    public class OrderProduct
    {
        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }
        public int Quantity { get; set; }
    }
}