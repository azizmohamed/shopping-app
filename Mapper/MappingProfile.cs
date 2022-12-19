using AutoMapper;

namespace ShoppingApp.Mapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Model.Product, ViewModel.Product>().ReverseMap();
            CreateMap<Model.OrderProduct, ViewModel.OrderProduct>().ReverseMap();
            CreateMap<Model.Order, ViewModel.Order>().ReverseMap();
        }
    }
}