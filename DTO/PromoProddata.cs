namespace DTO;

public class PromoProdData
{
    public int Id { get; set; }
    public int PromoId { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public string Tipo { get; set; }
    public double? Preco { get; set; }
    public int Quantidade { get; set; }
}