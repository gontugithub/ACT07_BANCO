CREATE TRIGGER `trigger_mvto_aI` AFTER INSERT ON `movimientos`
 FOR EACH ROW UPDATE cuentas SET c_saldo = new.m_importe + c_saldo WHERE c_num_cta = new.m_c_num_cta;

CREATE TRIGGER `trigger_mvto_bd` BEFORE DELETE ON `movimientos`
 FOR EACH ROW UPDATE cuentas SET c_saldo = c_saldo - old.m_importe WHERE c_num_cta = old.m_c_num_cta;

CREATE TRIGGER `trigger_mvto_bu` BEFORE UPDATE ON `movimientos`
 FOR EACH ROW UPDATE cuentas SET c_saldo = (c_saldo - old.m_importe) + new.m_importe WHERE c_num_cta = old.m_c_num_cta;







