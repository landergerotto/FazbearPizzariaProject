using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Back.Model;

public partial class FreddyFazbearDbContext : DbContext
{
    public FreddyFazbearDbContext()
    {
    }

    public FreddyFazbearDbContext(DbContextOptions<FreddyFazbearDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Imagem> Imagems { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Produto> Produtos { get; set; }

    public virtual DbSet<ProdutosPedido> ProdutosPedidos { get; set; }

    public virtual DbSet<Promocao> Promocaos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=CGS-C-0001L\\SQLEXPRESS;Initial Catalog=FreddyFazbearDB;Integrated Security=True;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Imagem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Imagem__3214EC27480117BD");

            entity.ToTable("Imagem");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Foto).IsRequired();
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Pedido__3214EC276844351C");

            entity.ToTable("Pedido");

            entity.Property(e => e.Id).HasColumnName("ID");
        });

        modelBuilder.Entity<Produto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Produto__3214EC27117D979D");

            entity.ToTable("Produto");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Descricao).IsUnicode(false);
            entity.Property(e => e.ImagemId).HasColumnName("ImagemID");
            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Preco).HasColumnType("decimal(5, 2)");
            entity.Property(e => e.Tipo)
                .IsRequired()
                .HasMaxLength(25)
                .IsUnicode(false);

            entity.HasOne(d => d.Imagem).WithMany(p => p.Produtos)
                .HasForeignKey(d => d.ImagemId)
                .HasConstraintName("FK__Produto__ImagemI__3C69FB99");
        });

        modelBuilder.Entity<ProdutosPedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Produtos__3214EC27A7F58F13");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.PedidoId).HasColumnName("PedidoID");
            entity.Property(e => e.ProdutoId).HasColumnName("ProdutoID");
            entity.Property(e => e.PromocaoId).HasColumnName("PromocaoID");

            entity.HasOne(d => d.Pedido).WithMany(p => p.ProdutosPedidos)
                .HasForeignKey(d => d.PedidoId)
                .HasConstraintName("FK__ProdutosP__Pedid__44FF419A");

            entity.HasOne(d => d.Produto).WithMany(p => p.ProdutosPedidos)
                .HasForeignKey(d => d.ProdutoId)
                .HasConstraintName("FK__ProdutosP__Produ__440B1D61");

            entity.HasOne(d => d.Promocao).WithMany(p => p.ProdutosPedidos)
                .HasForeignKey(d => d.PromocaoId)
                .HasConstraintName("FK__ProdutosP__Promo__45F365D3");
        });

        modelBuilder.Entity<Promocao>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Promocao__3214EC27F5122860");

            entity.ToTable("Promocao");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ProdutoId).HasColumnName("ProdutoID");

            entity.HasOne(d => d.Produto).WithMany(p => p.Promocaos)
                .HasForeignKey(d => d.ProdutoId)
                .HasConstraintName("FK__Promocao__Produt__412EB0B6");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC27493EE96A");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ImagemId).HasColumnName("ImagemID");
            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(80)
                .IsUnicode(false);
            entity.Property(e => e.Salt)
                .IsRequired()
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .IsRequired()
                .IsUnicode(false);

            entity.HasOne(d => d.Imagem).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.ImagemId)
                .HasConstraintName("FK__Usuario__ImagemI__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
