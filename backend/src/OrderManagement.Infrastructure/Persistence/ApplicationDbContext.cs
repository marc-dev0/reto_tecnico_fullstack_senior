using Microsoft.EntityFrameworkCore;
using OrderManagement.Domain.Entities;

namespace OrderManagement.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Pedido> Pedidos => Set<Pedido>();
    public DbSet<Usuario> Usuarios => Set<Usuario>();


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.NumeroPedido).IsUnique();
            entity.Property(e => e.NumeroPedido).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Cliente).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Total).HasPrecision(18, 2);
            entity.HasQueryFilter(e => !e.IsDeleted);
        });
    }
}
