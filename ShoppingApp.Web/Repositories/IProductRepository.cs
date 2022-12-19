using System.Collections.Generic;
using System.Threading.Tasks;
using ShoppingApp.Domain;

namespace ShoppingApp.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetProducts(int page, int count);
    }
}