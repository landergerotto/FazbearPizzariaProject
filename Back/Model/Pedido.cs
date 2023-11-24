using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Pedido
{
    public int Id { get; set; }

    public double? PrecoTotal { get; set; }

    public bool Preparado { get; set; }

    public bool Entregue { get; set; }

    public virtual ICollection<ProdutosPedido> ProdutosPedidos { get; } = new List<ProdutosPedido>();
}
