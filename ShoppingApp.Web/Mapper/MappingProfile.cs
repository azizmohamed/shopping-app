using AutoMapper;

namespace ShoppingApp.Mapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Product, ViewModel.Product>().ReverseMap();
            CreateMap<Domain.OrderProduct, ViewModel.OrderProduct>().ReverseMap();
            CreateMap<Domain.Order, ViewModel.Order>().ReverseMap();
        }
    }
}