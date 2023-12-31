﻿using System;
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

    public virtual DbSet<Cupom> Cupoms { get; set; }

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
        modelBuilder.Entity<Cupom>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cupom__3214EC2724CC2739");

            entity.ToTable("Cupom");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Codigo)
                .IsRequired()
                .HasMaxLength(6)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Imagem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Imagem__3214EC2799ECEA9A");

            entity.ToTable("Imagem");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Foto).IsRequired();
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Pedido__3214EC274CE65663");

            entity.ToTable("Pedido");

            entity.Property(e => e.Id).HasColumnName("ID");
        });

        modelBuilder.Entity<Produto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Produto__3214EC27BD15B854");

            entity.ToTable("Produto");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Descricao).IsUnicode(false);
            entity.Property(e => e.ImagemId).HasColumnName("ImagemID");
            entity.Property(e => e.Nome)
                .IsRequired()
                .HasMaxLength(50)
                .IsUnicode(false);
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
            entity.HasKey(e => e.Id).HasName("PK__Produtos__3214EC27163D05A3");

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
            entity.HasKey(e => e.Id).HasName("PK__Promocao__3214EC2773A4BE75");

            entity.ToTable("Promocao");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ProdutoId).HasColumnName("ProdutoID");

            entity.HasOne(d => d.Produto).WithMany(p => p.Promocaos)
                .HasForeignKey(d => d.ProdutoId)
                .HasConstraintName("FK__Promocao__Produt__412EB0B6");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC2759EB6307");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ImagemId).HasColumnName("ImagemID");
            entity.Property(e => e.Salt)
                .IsRequired()
                .HasMaxLength(200)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .IsRequired()
                .IsUnicode(false);
            entity.Property(e => e.Ulogin)
                .IsRequired()
                .HasMaxLength(80)
                .IsUnicode(false)
                .HasColumnName("ULogin");

            entity.HasOne(d => d.Imagem).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.ImagemId)
                .HasConstraintName("FK__Usuario__ImagemI__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
