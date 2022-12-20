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
            builder.UseInMemoryDatabase(databaseName: "ProductRepositoryTestsDb");

            var dbContextOptions = builder.Options;
            shoppingDbContext = new ShoppingAppDbContext(dbContextOptions);
            shoppingDbContext.Database.EnsureDeleted();
        }


        [Fact]
        public void ProductRepository_GetProducts_RetrieveExistingProducts()
        {

            shoppingDbContext.Product.AddRange(new List<Product> { new Product { 
                Id = new Guid(), 
                Name = "Product 1",
                Description = "Product 1 description",
                Price = 15.5M,
                Thumbnail = ""
            
            } });

            shoppingDbContext.SaveChanges();

            var productRepository = new ProductRepository(shoppingDbContext);
            var products = productRepository.GetProducts(0, 10);
            products.Count().ShouldBe(1);
        }

        [Fact]
        public void ProductRepository_GetProducts_NoErrorsWhenEmptyProductsList()
        {
            var productRepository = new ProductRepository(shoppingDbContext);
            var products = productRepository.GetProducts(0, 10);
            products.Count().ShouldBe(0);
        }
    }
}