using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Cupon
{
    public int Id { get; set; }

    public double Desconto { get; set; }

    public string Cupom { get; set; }
}
