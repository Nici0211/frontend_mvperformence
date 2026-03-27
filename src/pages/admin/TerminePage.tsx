import {useState} from "react";

/*
JAN HARKAMP
27.03.2026
 */

export default function TerminePage() {
  // Termine verwalten: Liste mit Status (Neu, Ausstehend, Bestaetigt, Abgelehnt), Bestaetigen/Ablehnen Buttons
    const [anfragenCounter, setAnfragenCounter] = useState(0);
    const [termineHeute, setTermineHeute] = useState(0)
    const [bewertungenCunter, setBewertungenCunter] = useState(0)
    
  return <>
      <div>
          <div>
              <h2>KFZ-Technik GDG</h2>
              <p>Übersicht</p>
              <p>Dashboard</p>
              <p>Verwaltung</p>
              <p>Termine</p>
              <p>Angebote</p>
              <p>Leistungen</p>
              <p>Kunden</p>
              <p>System</p>
              <p>Einstellungen</p>
          </div>

          <div>
              <h2>Dashboard</h2>

              <div>
                  <div>
                      <p>NEUE ANFRAGEN</p>
                      <p>{anfragenCounter}</p>
                  </div>

                  <div>
                      <p>TERMINE HEUTE</p>
                      <p>{termineHeute}</p>
                  </div>

                  <div>
                      <p>BEWERTUNGEN HEUTE</p>
                      <p>{bewertungenCunter}</p>
                  </div>
              </div>

              <div>
                  <h2>Offene Terminabfragen</h2>
                  <p>Alle Ansehen</p>
              </div>

              <table>
                  <tr>
                      <th>Kunde</th>
                      <th>Leistung</th>
                      <th>Fahrzeuge</th>
                      <th>Wunschtermin</th>
                      <th>Status</th>
                      <th>Aktionen</th>
                  </tr>

              </table>

              <div>
                  <h2>Aktuelle Angebote</h2>
                  <p>Verwaltung -></p>
              </div>

              <div>
                  Grid für ANgebote
              </div>
          </div>
      </div>


  </>;
}
