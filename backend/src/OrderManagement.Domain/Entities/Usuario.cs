namespace OrderManagement.Domain.Entities;

public class Usuario
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Nombre { get; set; } = null!;
    public string Rol { get; set; } = null!;
}
