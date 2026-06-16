import {useEffect, useState} from "react";
import {createService, deleteService, getServices, IService, updateService} from "../../api/services.ts";
import "../../css/AdminServicePage.css";

export default function AdminServicesPage() {
    const [services, setServices] = useState<IService[]>([]);
    const [selectedServiceForEditing, setSelectedServiceForEditing] = useState<IService>();
    const [unfiltered, setUnfiltered] = useState<IService[]>([]);
    const [selectedForDeleting, setSelectedForDeleting] = useState<IService>();

    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0)

    const [newServiceClicked, setNewServiceClicked] = useState(false);

    const reloadServices = async () => {
        const serviceData = await getServices();
        setUnfiltered(serviceData);
        setServices(serviceData);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedServiceForEditing || selectedServiceForEditing.id === undefined) return;

        const updatedService: Omit<IService, "id"> = {
            icon,
            title,
            subtitle: description,
            price : price
        };

        await updateService(selectedServiceForEditing.id, updatedService);
        await reloadServices();

        setSelectedServiceForEditing(undefined);
        setIcon("");
        setTitle("");
        setDescription("");
        setPrice(0);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newService: Omit<IService, "id"> = {
            icon,
            title,
            subtitle: description,
            price : price
        };

        await createService(newService);
        await reloadServices();

        setNewServiceClicked(false);
        setIcon("");
        setTitle("");
        setDescription("");
        setPrice(0);
    };

    const onCancel = () => {
        setSelectedServiceForEditing(undefined);
        setIcon("");
        setTitle("");
        setDescription("");
        setPrice(0)
    };

    const onAddCancel = () => {
        setNewServiceClicked(false);
        setIcon("");
        setTitle("");
        setDescription("");
        setPrice(0);
    };

    const updateSearch = (text: string) => {
        if (text === "") {
            setServices(unfiltered);
        } else {
            setServices(
                unfiltered.filter(v =>
                    v.title.toLowerCase().includes(text.toLowerCase())
                )
            );
        }
    };

    const handleNewServiceClick = () => {
        setSelectedServiceForEditing(undefined);
        setNewServiceClicked(true);
        setIcon("");
        setTitle("");
        setDescription("");
        setPrice(0);
    };

    const wantsToDelete = async () => {
        if (!selectedForDeleting?.id) return;

        await deleteService(selectedForDeleting.id);
        await reloadServices();

        setSelectedForDeleting(undefined);
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setIcon((reader.result as string).split(",")[1]);
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const load = async () => {
            const serviceData = await getServices();
            setUnfiltered(serviceData);
            setServices(serviceData);
        };
        load();
    }, []);

    return (
        <div className="admin-services-page">
            <div className="admin-main">
                <div className="admin-header">
                    <h1>Leistungen</h1>

                    <button className="new-service-btn" onClick={handleNewServiceClick}>
                        + Neue Leistung
                    </button>
                </div>

                <div className="search-box">
                    <span>⌕</span>
                    <input
                        placeholder="Leistung suchen..."
                        onChange={e => updateSearch(e.target.value)}
                    />
                </div>

                {selectedForDeleting && (
                    <div className="delete-box">
                        <h2>Leistung löschen?</h2>
                        <p>
                            Willst du "{selectedForDeleting.title}" wirklich löschen?
                            Diese Aktion kann nicht rückgängig gemacht werden.
                        </p>

                        <div className="delete-actions">
                            <button onClick={() => setSelectedForDeleting(undefined)}>
                                Abbrechen
                            </button>

                            <button onClick={wantsToDelete}>
                                Löschen
                            </button>
                        </div>
                    </div>
                )}

                <br></br>

                <div className="table-card">
                    <table className="services-table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Icon</th>
                            <th>Titel</th>
                            <th>Untertitel</th>
                            <th>Preis</th>
                            <th>Aktionen</th>
                        </tr>
                        </thead>

                        <tbody>
                        {(selectedServiceForEditing || newServiceClicked ? services.slice(0, 4) : services).map(value => (
                            <tr key={value.id}>
                                <td>{value.id}</td>
                                <td>
                                    <img src={`data:image/png;base64,${value.icon}`} alt="icon"/>
                                </td>
                                <td>{value.title}</td>
                                <td>{value.subtitle}</td>
                                <td>{value.price} €</td>
                                <td>
                                    <button
                                        className="table-btn"
                                        onClick={() => {
                                            setSelectedServiceForEditing(value);
                                            setNewServiceClicked(false);
                                            setTitle(value.title);
                                            setIcon(value.icon);
                                            setDescription(value.subtitle ?? "");
                                            setPrice(value.price);
                                        }}
                                    >
                                        Bearbeiten
                                    </button>

                                    <button
                                        className="table-btn delete-small-btn"
                                        onClick={() => setSelectedForDeleting(value)}
                                    >
                                        Löschen
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {selectedServiceForEditing ? (
                    <form className="service-form" onSubmit={handleEditSubmit}>
                        <h2>Service bearbeiten</h2>

                        <div className="form-row">
                            <div>
                                <label htmlFor="title">Titel *</label>
                                <input
                                    id="title"
                                    placeholder="z.B. Ölwechsel"
                                    type="text"
                                    value={title}
                                    required
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="icon">Icon</label>

                                <label className="file-upload" htmlFor="icon">
                                    Datei auswählen
                                </label>

                                <input
                                    id="icon"
                                    className="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleIconChange}
                                />
                            </div>
                        </div>

                        <label htmlFor="description">Untertitel</label>
                        <input
                            id="description"
                            placeholder="Kurze Beschreibung"
                            type="text"
                            value={description}
                            required
                            onChange={e => setDescription(e.target.value)}
                        />

                        <label htmlFor="price">Preis *</label>
                        <input
                            id="price"
                            placeholder="100"
                            type="number"
                            value={price}
                            required
                            onChange={e => setPrice(Number(e.target.value))}
                        />

                        <div className="form-actions">
                            <button type="button" onClick={onCancel}>Abbrechen</button>
                            <button type="submit">Speichern</button>
                        </div>
                    </form>
                ) : newServiceClicked ? (
                    <form className="service-form" onSubmit={handleAddSubmit}>
                        <h2>Neue Leistung hinzufügen</h2>

                        <div className="form-row">
                            <div>
                                <label htmlFor="title">Titel *</label>
                                <input
                                    id="title"
                                    placeholder="z.B. Ölwechsel"
                                    type="text"
                                    value={title}
                                    required
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="icon">Icon</label>

                                <label className="file-upload" htmlFor="icon">
                                    Datei auswählen
                                </label>

                                <input
                                    id="icon"
                                    className="file-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleIconChange}
                                />
                            </div>
                        </div>

                        <label htmlFor="description">Untertitel</label>
                        <input
                            id="description"
                            placeholder="Kurze Beschreibung"
                            type="text"
                            value={description}
                            required
                            onChange={e => setDescription(e.target.value)}
                        />

                        <label htmlFor="price">Preis *</label>
                        <input
                            id="price"
                            placeholder="100"
                            type="number"
                            value={price}
                            required
                            onChange={e => setPrice(Number(e.target.value))}
                        />

                        <div className="form-actions">
                            <button type="button" onClick={onAddCancel}>Abbrechen</button>
                            <button type="submit">Speichern</button>
                        </div>
                    </form>
                ) : null}

            </div>
        </div>
    );
}
