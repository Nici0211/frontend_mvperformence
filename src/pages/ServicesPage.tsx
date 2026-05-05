import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function ServicesPage() {
  // Alle Leistungen der Werkstatt (Oelwechsel, Reifenwechsel, Bremsservice, Begutachtung, etc.)
    const navigate = useNavigate();


  return <>
      <div>
          <h1>KFZ-Technik GDG - <br></br> Ihre Werkstatt <br></br> in Leibnitz</h1>
          <p>Die Autowerkstatt, die Leibnitz vertraut.</p>
          <Button variant="contained" onClick={() => navigate("/termin")}>
              Termin anfragen
          </Button>
      </div>

      <div>
          <p>Was wir anbieten</p>
          <h2>Unsere Leistungen</h2>
          <p>Professionelle KFZ-Arbeiten - schnell, transparent und zu fairen Preisen.</p>
      </div>

      <div>

      </div>
  </>;
}
