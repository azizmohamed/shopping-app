using Microsoft.EntityFrameworkCore;
using ShoppingApp.Application;
using ShoppingApp.Domain;
using ShoppingApp.Persistence;
using Shouldly;

namespace ShoppingApp.Tests.Application.Tests
{
    public class ProductRepositoryTests
    {
        private readonly ShoppingAppDbContext shoppingDbContext;
        
        public ProductRepositoryTests()
        {
            var builder = new DbContextOptionsBuilder<ShoppingAppDbContext>();
            builder.UseInMemoryDatabase(databaseName: "ProductsDb");

            var dbContextOptions = builder.Options;
            shoppingDbContext = new ShoppingAppDbContext(dbContextOptions);
        }

        [Fact]
        public void ProductRepository_GetProducts_RetrieveExistingProducts()
        {
            var productRepository = new ProductRepository(shoppingDbContext);
            var products = productRepository.GetProducts(0, 10);
            products.Count().ShouldBe(10);
        }
    }
}