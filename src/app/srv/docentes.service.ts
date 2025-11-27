import { Injectable } from '@angular/core';

declare const $:any;

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  constructor() { }

  // MISMO CÓDIGO del profe, pero con TU URL

/**
 *   async conectarAPI() {
    let datos = null;
    $.ajax({
      url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/endpoint.php', 
      method: 'get',
      dataType: 'json',
      success: (response:any) => {
        datos = response;
        console.log("Respuesta desde PHP:", response);
      },
      error: (error:any) => {
        console.log("Error desde PHP:", error);
      }
    });

  }

}
 */


async conectarAPI() {
    const datos = await new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/endpoint.php',
            method: 'GET',
            dataType: 'json',
            success: (res: any) => resolve(res),
            error: (err: any) => reject(err)
        });
    });

    return datos;
}

agregarDocente(docente:any){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/insert_docente.php',
      type: 'POST',
      data: docente,
      success: (response:any) => {
        console.log("Insert PHP:", response);
        alert("Docente agregado correctamente");
        resolve(response);           
      },
      error: (err:any) => {
        console.error("ERROR desde PHP:", err);
        reject(err);                 
      }
    });
  });
}

async getResumenDocentes() {
    const datos = await new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/cintaDocente.php',
            method: 'GET',
            dataType: 'json',
            success: (res: any) => resolve(res),
            error: (err: any) => reject(err)
        });
    });

    return datos;
}

async getDistDocentes() {
    const datos = await new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/distDocente.php',
            method: 'GET',
             dataType: 'json',
            success: (res: any) => resolve(res),
            error: (err: any) => reject(err)
        });
    });

    return datos;
}

async getsniDistribution() {
    const datos = await new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/sniDistribution.php',
            method: 'GET',
             dataType: 'json',
            success: (res: any) => resolve(res),
            error: (err: any) => reject(err)
        });
    });

    return datos;
}
async getIdiomaDistribution() {
  const datos = await new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/idiomaDistribution.php',
      method: 'GET',
      dataType: 'json',
      success: (res: any) => resolve(res),
      error: (err: any) => reject(err)
    });
  });

  return datos;
}


agregarTicket(ticket:any){
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/insert_ticket.php',
      type: 'POST',
      data: ticket,
      success: (response:any) => {
        console.log("Insert PHP:", response);
        alert("Docente agregado correctamente");
        resolve(response);           
      },
      error: (err:any) => {
        console.error("ERROR desde PHP:", err);
        reject(err);                 
      }
    });
  });
}
async conectarAPI2() {
    const datos = await new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/getTickets.php',
            method: 'GET',
            dataType: 'json',
            success: (res: any) => resolve(res),
            error: (err: any) => reject(err)
        });
    });

    return datos;
}

async getCintaTickets() {
    const datos = await new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://localhost/web/Proyecto-Final-Gestion-Academica/public/api/cintaTickets.php',
            method: 'GET',
            dataType: 'json',
            success: (res: any) => resolve(res),
            error: (err: any) => reject(err)
        });
    });

    return datos;
}
}


