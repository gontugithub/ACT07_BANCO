# FILTRADO CTA_TODAS_FILTRADO
# -----------------------------------------------------------------
drop procedure if exists cta_todas_filtrado;
delimiter $$ 
create procedure cta_todas_filtrado(in _filtro varchar(50))
begin

select * from cuentas where
c_num_cta like concat("%", _filtro, "%") OR
c_nif like concat("%", _filtro, "%")  OR
c_fecha_creacion like  concat("%", _filtro, "%") OR
c_titular like  concat("%", _filtro, "%");

end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO CTA_POR_CTA
# -----------------------------------------------------------------
drop procedure if exists cta_por_cta;
delimiter $$ 
create procedure cta_por_cta(in _cta int)
begin

select * from cuentas where c_num_cta = _cta;

end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO CTA_INSERTAR
# -----------------------------------------------------------------
drop procedure if exists cta_insertar;
delimiter $$ 
create procedure cta_insertar(in _nif varchar(9), in _titular varchar(50))
begin

insert into cuentas values (null, _nif, _titular, curdate(), 0);
select last_insert_id() as ID;

end $$
delimiter ;
# -----------------------------------------------------------------


# FILTRADO CTA_MODIFICAR
# -----------------------------------------------------------------
drop procedure if exists cta_modificar;
delimiter $$ 
create procedure cta_modificar( in _id int, in _nif varchar(9), in _titular varchar(50))
begin

update cuentas set c_nif = _nif, c_titular = _titular  where c_num_cta = _id;

end $$
delimiter ;
# -----------------------------------------------------------------


# FILTRADO CTA_BORRAR
# -----------------------------------------------------------------
drop procedure if exists cta_borrar;
delimiter $$ 
create procedure cta_borrar( in _id int)
begin

delete from cuentas where c_num_cta = _id;

end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO CTA_SALDOS_MENOR
# -----------------------------------------------------------------
drop procedure if exists cta_saldos_menor;
delimiter $$ 
create procedure cta_saldos_menor( in _filtrosaldo decimal)
begin

select * from cuentas where c_saldo <= _filtrosaldo;

end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO CTA_SALDOS_MENOR
# -----------------------------------------------------------------
drop procedure if exists cta_saldos_mayor;
delimiter $$ 
create procedure cta_saldos_mayor( in _filtrosaldo decimal)
begin

select * from cuentas where c_saldo >= _filtrosaldo;

end $$
delimiter ;
# -----------------------------------------------------------------







