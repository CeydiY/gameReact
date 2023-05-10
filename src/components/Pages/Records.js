import '../../css/records.css';
import React, {useEffect, useState} from "react";

export const Records = () => {
    const requestOptions = { method: 'Get', headers: {'Content-Type': 'application/json'} };
    let [records,setRecords]=useState([]);

    const callToApi = async() => {
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
    useEffect(()=>callToApi);
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
      </div>
  );
};
