using Microsoft.EntityFrameworkCore;
using ShoppingApp.Application;
using ShoppingApp.Domain;
using ShoppingApp.Persistence;
using Shouldly;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShoppingApp.Tests.Application.Tests
{
    public class OrderRepositoryTests
    {
        private readonly ShoppingAppDbContext shoppingDbContext;
        public OrderRepositoryTests()
        {
            var builder = new DbContextOptionsBuilder<ShoppingAppDbContext>();
            builder.UseInMemoryDatabase(databaseName: "OrderRepositoryTestsDb");

            var dbContextOptions = builder.Options;
            shoppingDbContext = new ShoppingAppDbContext(dbContextOptions);
            shoppingDbContext.Database.EnsureDeleted();

        }

        [Fact]
        public void OrderRepository_should_not_be_null()
        {
            var products = new List<Product> { new Product {
                Id = new Guid(),
                Name = "Product 1",
                Description = "Product 1 description",
                Price = 15.5M,
                Thumbnail = ""

            } ,
             new Product {
                Id = new Guid(),
                Name = "Product 2",
                Description = "Product 2 description",
                Price = 4M,
                Thumbnail = ""

            } ,
             new Product {
                Id = new Guid(),
                Name = "Product 3",
                Description = "Product 3 description",
                Price = 7M,
                Thumbnail = ""

            } ,
             new Product {
                Id = new Guid(),
                Name = "Product 4",
                Description = "Product 4 description",
                Price = 25M,
                Thumbnail = ""

            } };

            shoppingDbContext.Product.AddRange(products);
            shoppingDbContext.SaveChanges();

            var orderRepository = new OrderRepository(shoppingDbContext);

            var calculatedAmount = orderRepository.CalculateAmount(new List<OrderProduct> { 
                new OrderProduct() { 
                    ProductId = products[0].Id,
                    Quantity = 1
                },
                new OrderProduct() {
                    ProductId = products[1].Id,
                    Quantity = 2
                }
            });

            calculatedAmount.ShouldBe(23.5M);
        }
    }
}
