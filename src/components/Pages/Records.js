import '../../css/records.css';
import React, {useEffect, useState} from "react";

export const Records = () => {
    const requestOptions = { method: 'Get', headers: {'Content-Type': 'application/json'} };
    let [records,setRecords]=useState([]);
    let [recordsTama,setRecordsTama]=useState([]);

    const callToApiLagarto = async() => {
        await fetch('/api/lagarto/records', requestOptions)
            .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                    setRecords(data)
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                }
            )
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    useEffect(()=>callToApiLagarto);

    const callToApiTamagotchi = async() => {
        await fetch('/api/tamagotchi/records', requestOptions)
            .then(async response => {
                    const isJson = response.headers.get('content-type')?.includes('application/json');
                    const data = isJson && await response.json();
                setRecordsTama(data)
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                }
            )
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    useEffect(()=>callToApiTamagotchi);

    return (
      <div className="container mt-5" align="center">
          <h3>Lagarto-Spock records</h3>
          <div className="row">
              <div className="col-md-12">
                  <table className="table table-bordered">
                      <thead className="thead-dark">
                      <tr>
                          <th scope="col">Nombre jugador</th>
                          <th scope="col">Fecha de la partida</th>
                          <th scope="col">Resultado</th>
                      </tr>
                      </thead>
                      <tbody>
                      {records.map(item => (
                          <tr key={item.id}>
                              <td>{item.nombreJugador}</td>
                              <td>{item.fechaHoraPartida}</td>
                              <td>{item.resultadoPartida}</td>
                          </tr>
                      )
                      )}
                      </tbody>
                  </table>
              </div>
          </div>
          <h3>Tamagotchi records</h3>
          <div className="row">
          <div className="col-md-12">
              <table className="table table-bordered">
                  <thead className="thead-dark">
                  <tr>
                      <th scope="col">Nombre mascota</th>
                      <th scope="col">Nivel hambre</th>
                      <th scope="col">Nivel energía</th>
                      <th scope="col">Nivel felicidad</th>
                      <th scope="col">Fecha nacimiento</th>
                  </tr>
                  </thead>
                  <tbody>
                  {recordsTama.map(tama => (
                          <tr key={tama.id}>
                              <td>{tama.nombreMascota}</td>
                              <td>{tama.nivelHambre}</td>
                              <td>{tama.nivelEnergia}</td>
                              <td>{tama.nivelFelicidad}</td>
                              <td>{tama.fechaNacimiento}</td>
                          </tr>
                      )
                  )}
                  </tbody>
              </table>
          </div>
      </div>
      </div>
  );
};