# FILTRADO M_TODOS_FILTRADO
# -----------------------------------------------------------------
drop procedure if exists m_todos_filtrado; 
delimiter $$ 
create procedure m_todos_filtrado(in _filtro varchar(50))
begin
select * from movimientos where
m_id like concat("%", _filtro, "%") OR
m_c_num_cta like concat("%", _filtro, "%")  OR
m_importe like  concat("%", _filtro, "%") OR
m_concepto like  concat("%", _filtro, "%");
end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO M_TODOS_POR_CUENTA
# -----------------------------------------------------------------
drop procedure if exists m_todos_por_cuenta;
delimiter $$ 
create procedure m_todos_por_cuenta(in _cta int)
begin
select * from movimientos where m_c_num_cta = _cta;
end $$
delimiter ;
# -----------------------------------------------------------------


# FILTRADO M_INSERTAR
# -----------------------------------------------------------------
drop procedure if exists m_insertar;
delimiter $$ 
create procedure m_insertar(in _idcuenta int, in _importe decimal(10,2), in _concepto varchar(50))
begin
insert into movimientos values (null, _idcuenta, now(), _importe, _concepto);
select last_insert_id() as ID;
end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO M_MODIFICAR
# -----------------------------------------------------------------
drop procedure if exists m_modificar;
delimiter $$ 
create procedure m_modificar(in _id int, in _importe decimal(10,2), in _concepto varchar(50))
begin
update movimientos set m_importe = _importe, m_concepto = _concepto where m_id = _id;
end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO M_BORRAR
# -----------------------------------------------------------------
drop procedure if exists cta_borrar;
delimiter $$ 
create procedure m_borrar( in _id int)
begin
delete from movimientos where m_id = _id;
end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO M_MAYOR
# -----------------------------------------------------------------
drop procedure if exists m_mayor;
delimiter $$ 
create procedure m_mayor( in _filtrosaldo decimal)
begin
select * from movimientos where m_importe >= _filtrosaldo;
end $$
delimiter ;
# -----------------------------------------------------------------

# FILTRADO M_MVTOS_ENTRE_FECHAS
# -----------------------------------------------------------------
drop procedure if exists m_mvtos_entre_fechas;
delimiter $$ 
create procedure m_mvtos_entre_fechas( in _cuenta varchar(9), in _desde_fecha date, in _hasta_fecha date )
begin
	if _cuenta is null then
		select * from movimientos;
	else
		select * from movimientos where 
			m_c_num_cta = _cuenta and 
            m_fecha >= _desde_fecha and 
            m_fecha <= _hasta_fecha;
	end if;
end $$
delimiter ;
# -----------------------------------------------------------------

















