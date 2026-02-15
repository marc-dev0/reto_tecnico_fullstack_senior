using OrderManagement.Application.DTOs;
using OrderManagement.Application.Interfaces;
using OrderManagement.Domain.Entities;
using OrderManagement.Domain.Interfaces;
using OrderManagement.Domain.Exceptions;

namespace OrderManagement.Application.Services;

public class PedidoService : IPedidoService
{
    private readonly IPedidoRepository _repository;

    public PedidoService(IPedidoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<PedidoDto>> GetAllAsync()
    {
        var pedidos = await _repository.GetAllAsync();
        return pedidos.Select(p => new PedidoDto
        {
            Id = p.Id,
            NumeroPedido = p.NumeroPedido,
            Cliente = p.Cliente,
            Fecha = p.Fecha,
            Total = p.Total,
            Estado = p.Estado
        });
    }

    public async Task<PedidoDto?> GetByIdAsync(int id)
    {
        var p = await _repository.GetByIdAsync(id);
        if (p == null) return null;

        return new PedidoDto
        {
            Id = p.Id,
            NumeroPedido = p.NumeroPedido,
            Cliente = p.Cliente,
            Fecha = p.Fecha,
            Total = p.Total,
            Estado = p.Estado
        };
    }

    public async Task<PedidoDto> CreateAsync(CreatePedidoDto dto)
    {
        if (dto.Total <= 0) 
            throw new DomainException("El total del pedido debe ser mayor a cero.");
        
        if (await _repository.ExistsAsync(dto.NumeroPedido))
            throw new DomainException($"El número de pedido '{dto.NumeroPedido}' ya se encuentra registrado en el sistema.");

        var pedido = new Pedido
        {
            NumeroPedido = dto.NumeroPedido,
            Cliente = dto.Cliente,
            Total = dto.Total,
            Fecha = DateTime.UtcNow,
            Estado = "Registrado"
        };

        await _repository.CreateAsync(pedido);

        return new PedidoDto
        {
            Id = pedido.Id,
            NumeroPedido = pedido.NumeroPedido,
            Cliente = pedido.Cliente,
            Fecha = pedido.Fecha,
            Total = pedido.Total,
            Estado = pedido.Estado
        };
    }

    public async Task<bool> UpdateAsync(int id, UpdatePedidoDto dto)
    {
        var pedido = await _repository.GetByIdAsync(id);
        if (pedido == null) return false;

        pedido.Cliente = dto.Cliente;
        pedido.Total = dto.Total;
        pedido.Estado = dto.Estado;

        await _repository.UpdateAsync(pedido);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var pedido = await _repository.GetByIdAsync(id);
        if (pedido == null) return false;

        pedido.IsDeleted = true;
        await _repository.UpdateAsync(pedido);
        return true;
    }
}
