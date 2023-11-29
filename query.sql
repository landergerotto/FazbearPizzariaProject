use master
go

if exists(select * from sys.databases where name = 'FreddyFazbearDB')
	drop database FreddyFazbearDB
go

create database FreddyFazbearDB
go

use FreddyFazbearDB
go

create table Imagem(
	ID int identity primary key,
	Foto varbinary(MAX) not null
);
go

create table Usuario(
	ID int identity primary key,
	ULogin varchar(80) not null,
	Senha varchar(MAX) not null,
	Salt varchar(200) not null,
	Adm bit not null,
	ImagemID int references Imagem(ID)
);
go

create table Produto (
	ID int identity primary key,
	Nome varchar(50) not null,
	Tipo varchar(25) not null,
	Preco float not null,
	Descricao varchar(MAX),
	ImagemID int references Imagem(ID)
)

create table Pedido (
	ID int identity primary key,
	PrecoTotal float,
	Preparado bit not null,
	Entregue bit not null
)
create table Promocao(
	ID int identity primary key,
	ProdutoID int references Produto(ID),
	Preco int not null,
);
go

create table ProdutosPedidos (
	ID int identity primary key,
	ProdutoID int references Produto(ID),
	PedidoID int references Pedido(ID),
	PromocaoID int references Promocao(ID)
)
