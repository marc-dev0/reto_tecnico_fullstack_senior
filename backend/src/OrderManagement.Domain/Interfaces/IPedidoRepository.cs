using OrderManagement.Domain.Entities;

namespace OrderManagement.Domain.Interfaces;

public interface IPedidoRepository
{
    Task<IEnumerable<Pedido>> GetAllAsync();
    Task<Pedido?> GetByIdAsync(int id);
    Task<Pedido> CreateAsync(Pedido pedido);
    Task UpdateAsync(Pedido pedido);
    Task<bool> ExistsAsync(string numeroPedido);
}
