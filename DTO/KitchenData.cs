namespace DTO;

public class KitchenData
{
    public int OrderID { get; set; }
    public string[] ProductName { get; set; }
    public int[] Quantity { get; set; }
    public bool Pronto { get; set; }
    public bool Entregue { get; set; }

}