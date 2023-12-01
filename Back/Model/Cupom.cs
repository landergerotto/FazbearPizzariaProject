using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Cupom
{
    public int Id { get; set; }

    public double Desconto { get; set; }

    public string Codigo { get; set; }
}
