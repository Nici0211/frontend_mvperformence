import {useEffect, useState} from "react";
import "../../css/termine.css";
import { MOCK_TERMINE } from "../../mockdata/mock_data";
import { ITermin } from "../../interface/ITermin";
import {fetchAppointments} from "../../api/appointmentApi.ts";

/*
* NAME : JAN HARKAMP
* DATE : 24.03
* */

export default function TerminePage() {
    const [termine, setTermine] = useState<ITermin[]>(MOCK_TERMINE);
    const [filter, setFilter] = useState<string>("ALLE");
    const [page, setPage] = useState<number>(1);

    const itemsPerPage = 5;

    const heute = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const data = await fetchAppointments();
                setTermine(data.content);
            } catch (err) {
                console.log(err);
            }
        }

        getAppointments();
    }, []);

    // Aktionen
    const onAccept = (terminId: number) => {
        setTermine((prev) =>
            prev.map((t) =>
                t.id === terminId
                    ? { ...t, status: "BESTÄTIGT" }
                    : t
            )
        );
    };

    const onDecline = (terminId: number) => {
        setTermine((prev) =>
            prev.map((t) =>
                t.id === terminId
                    ? { ...t, status: "ABGELEHNT" }
                    : t
            )
        );
    };

    // Filter + Sortierung
    const gefiltert = termine
        .filter((t) => {
            if (filter === "ALLE") return true;

            if (filter === "HEUTE") {
                return t.date === heute && t.status !== "ABGELEHNT";
            }

            return t.status === filter;
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime();
        });

    // Pagination
    const totalPages = Math.ceil(gefiltert.length / itemsPerPage);

    const paginated = gefiltert.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // Labels für UI
    const labelMap: Record<string, string> = {
        ALLE: "Alle",
        HEUTE: "Heute",
        NEU: "Neu",
        AUSSTEHEND: "Ausstehend",
        BESTAETIGT: "Bestätigt",
        ABGELEHNT: "Abgelehnt",
    };

    return (
        <div className="main full">
            <h1>Termine</h1>

            {/* Tabs */}
            <div className="tabs">
                {["ALLE", "HEUTE", "NEU", "AUSSTEHEND", "BESTAETIGT", "ABGELEHNT"].map((f) => (
                    <button
                        key={f}
                        className={filter === f ? "tab active" : "tab"}
                        onClick={() => {
                            setFilter(f);
                            setPage(1);
                        }}
                    >
                        {labelMap[f]}
                    </button>
                ))}
            </div>

            {/* Tabelle */}
            <table className="table">
                <thead>
                <tr>
                    <th>Kunde</th>
                    <th>Leistung</th>
                    <th>Fahrzeug</th>
                    <th>Wunschtermin</th>
                    <th>Status</th>
                    <th>Aktionen</th>
                </tr>
                </thead>

                <tbody>
                {paginated.map((t) => (
                    <tr key={t.id}>
                        <td>{t.customerName}</td>
                        <td>{t.serviceType}</td>
                        <td>
                            {t.brand} {t.model}
                        </td>
                        <td>
                            {t.date} · {t.time}
                        </td>

                        {/* Status */}
                        <td>
                <span
                    className={`badge ${
                        t.status === "NEU"
                            ? "blue"
                            : t.status === "AUSSTEHEND"
                                ? "yellow"
                                : t.status === "BESTÄTIGT"
                                    ? "green"
                                    : "red"
                    }`}
                >
                  {labelMap[t.status]}
                </span>
                        </td>

                        {/* Aktionen */}
                        <td>
                            {t.status === "NEU" || t.status === "AUSSTEHEND" ? (
                                <>
                                    <button
                                        className="btn"
                                        onClick={() => onAccept(t.id)}
                                    >
                                        Bestätigen
                                    </button>
                                    <button
                                        className="btn danger"
                                        onClick={() => onDecline(t.id)}
                                    >
                                        Ablehnen
                                    </button>
                                </>
                            ) : t.status === "BESTÄTIGT" ? (
                                <button className="btn">Bearbeiten</button>
                            ) : (
                                <span>-</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                        key={p}
                        className={page === p ? "page active" : "page"}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
}