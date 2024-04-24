
function fMostrarCuentas(){ // MUESTRA TODAS LAS CUENTAS 

    let sql = "select * from cuentas"
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          
            console.log(data)
            
            let html = "";
            html += `
            <div id="acciones_cuentas">
                <div id="acciones_cuentas_insertar" onclick="fPrepararFormulario('i','c')">(+)</div>
            </div>`; // INSERT CTA

            data.datos.forEach(item => {

                html += `<div class="cuenta">`;
                html += `<div class="datos_cuenta">`;
                html += `<div class="cuenta_nombre">${item.c_titular}</div>`;
                html += `<div class="cuenta_num">${item.c_num_cta}</div>`;
                html += `<div class="cuenta_nif">${item.c_nif}</div>`;
                html += `<div class="cuenta_fcha_crea">${item.c_fecha_creacion}</div>`;
                html += `<div class="cuenta_saldo">SALDO: <p class="cantidad_saldo">${item.c_saldo}</p></div></div>`
                html += `<div class="accion_cuenta"><i class="fas fa-edit" title="MOD ${item.c_num_cta}" onclick="fPrepararFormulario('m','c')">` // MOD CTA
                html += `</i><i class="fas fa-trash" onclick="fEjecutarCRUDcuenta('d', '${item.c_num_cta}')"></i></div></div>` // FALTA ELIMINAR CUENTA
  
            });

            document.querySelector("section").innerHTML = html; //  TODO LO GUARDADO EN LA VARIABLE HTML, LO PONEMOS EN EL SECTION

        })
}



function fMostrarMovimientos(){ // MUESTRA TODOS LOS MOVIMIENTOS
    
    let sql = "select * from movimientos"
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          
            console.log(data)
            
            let html = "";
            html += `
            <div id="acciones_movimiento">
                <div id="acciones_movimiento_insertar" title="INSERTAR MOVIMIENTO" onclick="fPrepararFormulario('i','m')">(+)</div>
            </div>`;

            data.datos.forEach(item => {

                html += `<div class="movimiento">`;
                html += `<div class="datos_movimiento">`
                html += `<div class="movimiento_cta_num">${item.m_c_num_cta}</div>`;
                html += `<div class="movimiento_id">${item.m_id}</div>`;
                html += `<div class="movimiento_concepto">${item.m_concepto}</div>`;
                html += `<div class="movimiento_fcha">${item.m_fecha}</div>`;
                html += `<div class="movimiento_importe">IMPORTE: <p class="importe">${item.m_importe}</p></div></div>`
                html += `<div class="accion_movimiento"><i class="fas fa-edit" title="MOD ${item.m_id}" onclick="fPrepararFormulario('m','m')">`
                html += `</i><i class="fas fa-trash" onclick="fEjecutarCRUDMovimiento('d', '${item.m_id}')" title="ELIMINAR ${item.m_id}" ></i></div></div>`
  
            });

            document.querySelector("section").innerHTML = html;

        })

}

function fAbrirFormulario(formulario){ // RECIBIMOS EL FORMULARIO QUE QUEREMOS ABRIR

    // OCULTAMOS TODOS LOS FORMULARIOS

    let todos_formularios = document.querySelectorAll("#div_modal > div");
    todos_formularios.forEach(item =>{
        item.style.display = "none";
    });

    // MOSTAMOS EL FORMULARIO QUE NOS HAN PASADO -> TIENE QUE PASARLO CON ("#id_formulario")

    document.querySelector(formulario).style.display = "block";

    // POR ULTIMO MOSTRAMOS EL MODAL

    document.querySelector("#div_modal").style.display = "flex";
}

function fPrepararFormulario(para, formulario){ // RECIBIMOS UN PARAMETRO PARA SABER SI ES PARA INSERTAR O MODIFICAR

    if (para == "i"){ // I -> INSERTAR, M -> MODIFICAR

        // CURSOS

        document.querySelector("#cta_add").style.display = "block";
        document.querySelector("#cta_mod").style.display = "none";

        // MOVIMIENTOS

        document.querySelector("#m_add").style.display = "block";
        document.querySelector("#m_mod").style.display = "none";
    }

    if (para == "m"){ // I -> INSERTAR, M -> MODIFICAR

        // CURSOS

        document.querySelector("#cta_add").style.display = "none";
        document.querySelector("#cta_mod").style.display = "block";
        document.querySelector("#cta_id").type = "text";

        
        // MOVIMIENTOS

        document.querySelector("#m_add").style.display = "none";
        document.querySelector("#m_mod").style.display = "block";
        document.querySelector("#m_id").type = "text";

    }

    if(formulario == "c"){ // NOS ESTAN PASANDO LOS DATOS DESDE CUENTA

        document.querySelector("#cta_error").innerHTML = "&nbsp;"
        fAbrirFormulario("#formulario_cuenta");

    }


    if(formulario == "m"){ // NOS ESTAN PASANDO LOS DATOS DESDE MOVIMIENTOS
        
        document.querySelector("#m_error").innerHTML = "&nbsp;"
        fAbrirFormulario("#formulario_movimiento");

    }
    
}

function fEjecutarCRUDcuenta(operacion, idcuenta){

    let sql = ""; // GUARDAEMOS EL SQL EN ESTA VARIABLE PARA LUEGO ENVIARLO EN EL PHP
    let id = idcuenta;
    let nif = document.querySelector("#cta_nif").value;
    let titular = document.querySelector("#cta_titular").value;
    console.log(id)
    
    if (operacion == "i") { // INSERTAR

        // cta_insertar(in _nif varchar(9), in _titular varchar(50)) -> LO QUE RECIBE LA PROCEDURE

        sql = `call cta_insertar('${nif}', '${titular}')`;

    }

    if (operacion == "d") { // INSERTAR

        // cta_borrar( in _id int) -> LO QUE RECIBE LA PROCEDURE

        sql = `call cta_borrar('${id}')`;

    }

    if (operacion == "m") { // MODIFICAR

        // ( in _id int, in _nif varchar(9), in _titular varchar(50)) -> LO QUE RECIBE LA PROCEDURE

        id = document.querySelector("#cta_id").value;

        sql = `call cta_modificar('${id}', '${nif}', '${titular}')`;

    }

    const URL = "assets/php/servidor.php?peticion=EjecutarInsertUpdateDelete&sql=" + sql;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("ID CREADO", data);
           
        })
    
    .finally (()=> {


        fMostrarCuentas();
        fOcultarModal();
    
        });




}

function fOcultarModal(){
    document.querySelector("#div_modal").style.display = "none";
}

function fEjecutarCRUDMovimiento(operacion, idmov){

    let sql = ""; // GUARDAEMOS EL SQL EN ESTA VARIABLE PARA LUEGO ENVIARLO EN EL PHP
    let idmovimiento = idmov;
    let idcuenta = document.querySelector("#m_idc").value;;
    let m_concepto = document.querySelector("#m_concepto").value;
    let importe = document.querySelector("#m_importe").value;
    console.log(idmov)
    
    if (operacion == "i") { // INSERTAR

        //  m_insertar(in _idcuenta int, in _importe decimal(10,2), in _concepto varchar(50))

        sql = `call m_insertar('${idcuenta}', '${importe}', '${m_concepto}')`;

    }

    if (operacion == "d") { // INSERTAR

        // cta_borrar( in _id int) -> LO QUE RECIBE LA PROCEDURE

        sql = `call m_borrar('${idmovimiento}')`;

    }

    if (operacion == "m") { // MODIFICAR



        // m_modificar(in _id int, in _importe decimal(10,2), in _concepto varchar(50))

        idmovimiento = document.querySelector("#m_id").value;

        sql = `call m_modificar('${idmovimiento}', '${importe}', '${m_concepto}')`;

    }

    const URL = "assets/php/servidor.php?peticion=EjecutarInsertUpdateDelete&sql=" + sql;

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("ID CREADO", data);
           
        })
    
    .finally (()=> {


        fMostrarMovimientos();
        fOcultarModal();
    
        });




}

function fOcultarModal(){
    document.querySelector("#div_modal").style.display = "none";
}


function fRellenaCombo() {
    let sql = "SELECT * FROM cuentas ORDER BY c_num_cta";
    const URL = "assets/php/servidor.php?peticion=EjecutarSelect&sql=" + sql;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("CURSOS CARGAR", data);
            
            let html = `<select id='${como_se_llama}' class='input'>`
            html += "<option></option>"
            data.datos.forEach(item => {
                html += `<option value="${item.cur_id}">${item.cur_nombre}</option>`
            });
            html += "</select>"
            document.querySelector(donde_lo_dejo).innerHTML = html


        })
}