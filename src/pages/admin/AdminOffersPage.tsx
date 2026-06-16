import { useEffect, useState } from "react";
import { getOffers, IOffer, updateOffer } from "../../api/offers.ts";
import { getServices, IService } from "../../api/services.ts";
import "../../css/AdminOffers.css";

export default function AdminOffersPage() {
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [services, setServices] = useState<IService[]>([]);

    const [offerToEdit, setOfferToEdit] = useState<IOffer>();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(true);
    const [selectedServices, setSelectedServices] = useState<IService[]>([]);

    useEffect(() => {
        const loadData = async () => {
            setOffers(await getOffers());
            setServices(await getServices());
        };

        loadData();
    }, []);

    const onEditClick = (offer: IOffer) => {
        setOfferToEdit(offer);

        setTitle(offer.title);
        setDescription(offer.description);
        setPrice(offer.price);
        setStatus(offer.active);
        setSelectedServices(offer.services);
    };

    const isSelected = (service: IService) => {
        return selectedServices.some(s => s.id === service.id);
    };

    const onServiceClick = (service: IService) => {
        setSelectedServices(prev =>
            prev.some(s => s.id === service.id)
                ? prev.filter(s => s.id !== service.id)
                : [...prev, service]
        );
    };

    const onCancelClick = () => {
        setOfferToEdit(undefined);
        setTitle("");
        setDescription("");
        setPrice(0);
        setStatus(true);
        setSelectedServices([]);
    };

    const onEditSubmitClick = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!offerToEdit) return;

        const updatedOffer: Omit<IOffer, "id"> = {
            title,
            description,
            price,
            active: status,
            services: selectedServices
        };

        await updateOffer(offerToEdit.id, updatedOffer);

        const refreshed = await getOffers();
        setOffers(refreshed);

        onCancelClick();
    };

    return (
        <>
            {offerToEdit ? (
                <div className="edit-offer-container">
                    <form
                        className="edit-offer-form"
                        onSubmit={onEditSubmitClick}
                    >
                        <h2>{title} bearbeiten</h2>

                        <label>Titel</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <label>Beschreibung</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />

                        <div className="price-status-row">

                            <div className="price-box">
                                <label>Preis (€)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={e =>
                                        setPrice(Number(e.target.value))
                                    }
                                />
                            </div>

                            <div className="status-box">
                                <label>Status</label>

                                <div className="status-container">

                                    <button
                                        type="button"
                                        className={
                                            status
                                                ? "status-btn active"
                                                : "status-btn"
                                        }
                                        onClick={() => setStatus(true)}
                                    >
                                        ● Aktiv
                                    </button>

                                    <button
                                        type="button"
                                        className={
                                            !status
                                                ? "status-btn inactive"
                                                : "status-btn"
                                        }
                                        onClick={() => setStatus(false)}
                                    >
                                        ● Inaktiv
                                    </button>

                                </div>
                            </div>
                        </div>

                        <label>Services zuweisen</label>

                        <div className="services-select">
                            {services.map(service => (
                                <button
                                    key={service.id}
                                    type="button"
                                    className={
                                        isSelected(service)
                                            ? "service-btn selected"
                                            : "service-btn"
                                    }
                                    onClick={() =>
                                        onServiceClick(service)
                                    }
                                >
                                    {service.title}
                                </button>
                            ))}
                        </div>

                        <div className="form-actions">

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={onCancelClick}
                            >
                                Abbrechen
                            </button>

                            <button
                                type="submit"
                                className="save-btn"
                            >
                                Speichern
                            </button>

                        </div>
                    </form>
                </div>
            ) : (
                <div className="offers-page">
                    <div className="offers-header">
                        <h2>Aktuelle Angebote</h2>

                        <button className="new-offer-btn">
                            + Neues Angebot
                        </button>
                    </div>

                    <div className="offers-grid">
                        {offers.map(offer => (
                            <div className="offer-card" key={offer.id}>

                                <h3>{offer.title}</h3>

                                <div className="service-tags">
                                    {offer.services.map(service => (
                                        <span
                                            key={service.id}
                                            className="service-tag"
                                        >
                                            {service.title}
                                        </span>
                                    ))}
                                </div>

                                <div className="offer-price">
                                    € {offer.price}
                                </div>

                                <span
                                    className={
                                        offer.active
                                            ? "status active"
                                            : "status inactive"
                                    }
                                >
                                    ● {offer.active ? "Aktiv" : "Inaktiv"}
                                </span>

                                <div className="offer-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            onEditClick(offer)
                                        }
                                    >
                                        ✏ Bearbeiten
                                    </button>

                                    <button className="delete-btn">
                                        🗑 Löschen
                                    </button>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}