using System;
using System.Collections.Generic;

namespace Back.Model;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nome { get; set; }

    public string Senha { get; set; }

    public string Salt { get; set; }

    public bool Adm { get; set; }

    public int? ImagemId { get; set; }

    public virtual Imagem Imagem { get; set; }
}
