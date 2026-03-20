# 🔧 MVPerformance — Frontend

> Weboberfläche für die **MVPerformance KFZ-Werkstatt** — gebaut mit React, TypeScript und Vite.

---

## 📋 Projektübersicht

Die Autowerkstatt verfügt aktuell über keine digitale Plattform. Kunden müssen Termine telefonisch oder vor Ort vereinbaren, was zeitaufwendig ist und zu organisatorischen Problemen führen kann. Ziel ist es, eine moderne Website zu entwickeln, die Kunden eine einfache Terminbuchung ermöglicht und einen Admin-Bereich zur Verwaltung bereitstellt.

**Auftraggeber:** Devrim Gül

---

## 👥 Team

| Name | Aufgabe |
|------|---------|
| **Jan** | Frontend — Design & Logik der Benutzeroberfläche |
| **Nicolas** | Verbindung zwischen Frontend und Backend |

---

## 🎯 Projektziele

- Entwicklung einer modernen Website für die Autowerkstatt
- Terminbuchung für Kunden über die Website
- Admin-Bereich zur Verwaltung von Terminen, Kunden und Angeboten

---

## 🛠️ Tech Stack

| Technologie | Zweck |
|-------------|-------|
| [React](https://react.dev/) | UI Framework |
| TypeScript | Typsicherheit |
| [Vite](https://vite.dev/) | Build Tool & Dev Server |

---

## 🗂️ Projektstruktur

```
src/
├── assets/          # Bilder, Icons
├── components/      # Wiederverwendbare UI-Komponenten
├── pages/           # Einzelne Seiten der Website
├── services/        # API-Kommunikation mit dem Backend (Nicolas)
├── App.tsx          # Haupt-Komponente & Routing
└── main.tsx         # Einstiegspunkt
```

---

## 📄 Geplante Seiten

| Seite | Beschreibung |
|-------|-------------|
| **Startseite** | Präsentation der Werkstatt, Leistungen, Google-Bewertungen |
| **Terminbuchung** | Leistung wählen, Fahrzeugdaten eingeben, Datum & Uhrzeit wählen |
| **Login / Registrierung** | Kundenkonto anlegen oder einloggen |
| **Admin-Dashboard** | Übersicht offener Termine, Angebote verwalten, Kunden einsehen |

---

## 🚀 Setup & Lokale Entwicklung

### Voraussetzungen

- **Node.js** ≥ 18.x
- Das **Backend** läuft lokal auf `http://localhost:8080`

### Installation & Start

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter `http://localhost:5173` erreichbar.

```bash
# Build für Produktion
npm run build
```

---

## 🔌 Backend-Verbindung (Nicolas)

Die Kommunikation mit dem Spring Boot Backend erfolgt über REST. Authentifizierung läuft via **JWT-Token**.

Die API-Calls werden in `src/services/` gekapselt, damit Komponenten nichts von der HTTP-Logik wissen müssen.

---

## 🔗 Verwandte Repositories

- **Backend:** [`backend_MVPerformance`](../backend_MVPerformance) — Spring Boot REST API

---

*HTL Kaindorf — Schulprojekt 2025/26*
