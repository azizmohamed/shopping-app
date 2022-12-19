using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using ShoppingApp.Persistence;
using ShoppingApp.Domain;

namespace ShoppingApp.Application
{
    public class ProductRepository : IProductRepository
    {
        private readonly ShoppingAppDbContext _dbContext;
        public ProductRepository(ShoppingAppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public IEnumerable<Product> GetProducts(int page, int count)
        {
            return _dbContext.Product.Skip(page).Take(count);
        }
    }
}