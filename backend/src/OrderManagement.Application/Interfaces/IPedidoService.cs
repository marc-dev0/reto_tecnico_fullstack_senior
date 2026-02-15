using OrderManagement.Application.DTOs;

namespace OrderManagement.Application.Interfaces;

public interface IPedidoService
{
    Task<IEnumerable<PedidoDto>> GetAllAsync();
    Task<PedidoDto?> GetByIdAsync(int id);
    Task<PedidoDto> CreateAsync(CreatePedidoDto dto);
    Task<bool> UpdateAsync(int id, UpdatePedidoDto dto);
    Task<bool> DeleteAsync(int id);
}
