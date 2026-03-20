# ⚙️ MVPerformance — Backend

> REST API für die **MVPerformance KFZ-Werkstatt** — gebaut mit Spring Boot, Java und PostgreSQL.

---

## 📋 Projektübersicht

Die Autowerkstatt verfügt aktuell über keine digitale Plattform. Ziel ist es, eine moderne Website zu entwickeln, die Kunden eine einfache Terminbuchung ermöglicht und einen Admin-Bereich zur Verwaltung bereitstellt. Dieses Repository stellt die REST API bereit, auf die das React-Frontend zugreift.

**Auftraggeber:** Devrim Gül

---

## 👥 Team

| Name | Aufgabe |
|------|---------|
| **Dominik** | Backend — Entwicklung der gesamten API, Datenbank, Security |
| **Nicolas** | Verbindung zwischen Frontend und Backend |

---

## 🎯 Projektziele

- Datenbank zur Verwaltung von Terminen, Kundenkonten und Angeboten
- Login-System mit Spring Security und JWT
- Admin-Bereich zur Verwaltung von Inhalten

---

## 🛠️ Tech Stack

| Technologie | Zweck |
|-------------|-------|
| Spring Boot | Haupt-Framework |
| Java 25 | Programmiersprache |
| Spring Data JPA | Datenbankzugriff |
| PostgreSQL | Datenbank |
| Spring Security + JWT | Login & Authentifizierung |
| Lombok | Weniger Boilerplate |
| MapStruct | Entity ↔ DTO Mapping |
| Springdoc / Swagger | API-Dokumentation |

---

## 🗂️ Projektstruktur

```
src/main/java/at/htlkaindorf/backend_mwperformence/
├── entity/        # Datenbank-Entities (JPA)
├── dto/           # Request & Response Objekte
├── repository/    # Datenbankzugriff (Spring Data)
├── service/       # Business-Logik
├── controller/    # REST Endpunkte
└── security/      # JWT, Spring Security Konfiguration

src/main/resources/
└── application.properties
```

---

## 🚀 Setup & Lokale Entwicklung

### Voraussetzungen

- **Java 25**
- **PostgreSQL** lokal installiert und gestartet
- Das **Frontend** läuft unter `http://localhost:5173`

### Datenbank einrichten

```sql
CREATE DATABASE mw_performance;
CREATE USER mw_user WITH PASSWORD 'deinPasswort';
GRANT ALL PRIVILEGES ON DATABASE mw_performance TO mw_user;
```

### `application.properties` befüllen

```properties
spring.application.name=backend_MWPerformence

# Datenbank
spring.datasource.url=jdbc:postgresql://localhost:5432/mw_performance
spring.datasource.username=mw_user
spring.datasource.password=deinPasswort

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT
jwt.secret=deinGeheimSchluessel
jwt.expiration=86400000
```

> ⚠️ Keine echten Passwörter oder Secrets ins Repository committen!

### Anwendung starten

```bash
./mvnw spring-boot:run
```

Die API läuft dann auf `http://localhost:8080`.

> 📖 Swagger UI: `http://localhost:8080/swagger-ui.html`

---

## 🔐 Login-System (Dominik)

Authentifizierung läuft über **Spring Security** mit **JWT**. Nach dem Login erhält der Client einen Token, den er bei jedem Request mitsenden muss.

```
POST /api/auth/login  →  gibt JWT-Token zurück
Authorization: Bearer <token>
```

**Rollen:** `ROLE_ADMIN` (Verwaltung) und `ROLE_KUNDE` (Terminbuchung)

---

## 🔗 Verwandte Repositories

- **Frontend:** [`frontend_MVPerformance`](../frontend_MVPerformance) — React + TypeScript + Vite

---

*HTL Kaindorf — Schulprojekt 2025/26*
