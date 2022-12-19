using System;
using Microsoft.EntityFrameworkCore;
using ShoppingApp.Domain;

namespace ShoppingApp.Persistence
{
    public class ShoppingAppDbContext : DbContext
    {
        public DbSet<Product> Product { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderProduct> OrderProduct { get; set; }
        public ShoppingAppDbContext(DbContextOptions<ShoppingAppDbContext> options):base(options)
        {
            Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderProduct>()
                .HasKey(op => new { op.ProductId, op.OrderId });
            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Product)
                .WithMany(p => p.OrderProducts)
                .HasForeignKey(op => op.ProductId);
            modelBuilder.Entity<OrderProduct>()
                .HasOne(op => op.Order)
                .WithMany(o => o.OrderProducts)
                .HasForeignKey(op => op.OrderId);

            modelBuilder.Entity<Product>().HasData(
                new Product[]{
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "iPhone 9",
                        Description = "An apple mobile which is nothing like apple",
                        Price = 5M,
                        Thumbnail = "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "iPhone X",
                        Description = "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
                        Price = 8M,
                        Thumbnail = "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "Samsung Universe 9",
                        Description = "Samsung's new variant which goes beyond Galaxy to the Universe",
                        Price = 12M,
                        Thumbnail = "https://i.dummyjson.com/data/products/3/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "OPPOF19",
                        Description = "OPPO F19 is officially announced on April 2021.",
                        Price = 2.5M,
                        Thumbnail = "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "Huawei P30",
                        Description = "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
                        Price = 4.5M,
                        Thumbnail = "https://i.dummyjson.com/data/products/5/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "MacBook Pro",
                        Description = "MacBook Pro 2021 with mini-LED display may launch between September, November",
                        Price = 17M,
                        Thumbnail = "https://i.dummyjson.com/data/products/6/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "Samsung Galaxy Book",
                        Description = "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
                        Price = 15M,
                        Thumbnail = "https://i.dummyjson.com/data/products/7/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "Microsoft Surface Laptop 4",
                        Description = "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
                        Price = 15M,
                        Thumbnail = "https://i.dummyjson.com/data/products/8/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "Infinix INBOOK",
                        Description = "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
                        Price = 11M,
                        Thumbnail = "https://i.dummyjson.com/data/products/9/thumbnail.jpg"
                    },
                    new Product(){
                        Id = Guid.NewGuid(),
                        Name = "HP Pavilion 15-DK1056WM",
                        Description = "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
                        Price = 10.5M,
                        Thumbnail = "https://i.dummyjson.com/data/products/10/thumbnail.jpg"
                    }
                });
        }
    }
}