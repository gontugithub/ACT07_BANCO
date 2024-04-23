// MUESTRA TODAS LAS CUENTAS 
function fMostrarCuentas(){
    let sql = "select * from cuentas"
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          
            console.log(data)
            
            let html = "";
            html

            data.datos.forEach(item => {

                html += `<div class="cuenta">`;
                html += `<div class="cuenta_nombre">${item.c_titular}</div>`;
                html += `<div class="cuenta_num">${item.c_num_cta}</div>`;
                html += `<div class="cuenta_nif">${item.c_nif}</div>`;
                html += `<div class="cuenta_fcha_crea">${item.c_fecha_creacion}</div>`;
                html += `<div class="cuenta_saldo">SALDO: <p class="cantidad_saldo">${item.c_saldo}</p></div></div>`
                html += `<div class="accion_cuenta"><i class="fas fa-edit"></i><i class="fas fa-trash"></i></div></div>`
  
            });

            document.querySelector("section").innerHTML = html;

        })
}