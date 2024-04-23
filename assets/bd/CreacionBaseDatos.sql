drop database if exists bd_banco;
create database bd_banco;
use bd_banco;

drop table if exists cuentas;
create table cuentas(
		c_num_cta int zerofill auto_increment primary key,
		c_nif varchar(9) not null,
		c_titular varchar(50) not null,
		c_fecha_creacion date not null,
		c_saldo decimal(10,2)
);

drop table if exists movimientos;
create table movimientos(
		m_id int auto_increment primary key,
		m_c_num_cta int zerofill not null, 
		m_fecha datetime not null,
		m_importe decimal(10,2),
		m_concepto varchar(50),
	foreign key (m_c_num_cta) references cuentas(c_num_cta)
);

insert into cuentas values (null, "1234", "Gonzalo", curdate(), 0);
insert into cuentas values (null, "123s4", "Lucia", curdate(), 0);
insert into movimientos values (null, 1, now(), 10.2, "Sandias");
insert into movimientos values (null, 1, now(), 10.2, "Melones");
insert into movimientos values (null, 2, now(), 10.2, "Pepinos");
