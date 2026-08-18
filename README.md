# ViolaSync - React Native App

Un'applicazione mobile completa costruita con **React Native**, con backend **Node.js/Express** e gestione della memoria con **Python**.

## 📱 Nuove Features! ✨

🎯 **To-Do List** con Local Storage  
🌤️ **Weather Dashboard** con API Pubblica  
📊 **Redux State Management**  
🎨 **Multi-Screen Navigation con Icone**  

---

## 📂 Struttura del Progetto

```
violasync/
├── App.js                              # Main app con 5 schermate
├── package.json                        # Frontend dependencies
├── frontend/
│   ├── screens/
│   │   ├── HomeScreen.js              # Home screen
│   │   ├── TodoListScreen.js          # To-Do list con local storage ✨
│   │   ├── WeatherDashboardScreen.js  # Weather dashboard ✨
│   │   ├── SettingsScreen.js
│   │   └── ProfileScreen.js
│   ├── redux/
│   │   ├── store.js
│   │   └── reducers/
│   │       └── userReducer.js
│   └── services/
│       ├── api.js
│       ├── todoService.js             # Todo storage service ✨
│       └── weatherService.js          # Weather API service ✨
├── backend/
│   ├── server.js
│   ├── package.json
│   └── routes/
│       ├── userRoutes.js
│       └── dataRoutes.js
├── memory/
│   ├── memory.py
│   └── requirements.txt
└── README.md
```

---

## 🚀 Installazione Veloce

### Frontend (React Native)
```bash
npm install
npm start

# iOS
npm run ios

# Android
npm run android
```

### Backend (Node.js)
```bash
cd backend
npm install
npm run dev
```

### Memory Module (Python)
```bash
cd memory
pip install -r requirements.txt
```

---

## 📱 5 Schermate Principali

### 1️⃣ **Home Screen** 🏠
- Schermata principale
- Info utente da Redux
- Welcome message

### 2️⃣ **To-Do List** ✅ (NUOVO!)
- ✏️ Aggiungi nuovi task
- ✓ Segna come completato
- 🗑️ Elimina task con conferma
- 🔍 Filtra per stato (Tutti, In Sospeso, Completati)
- 📊 Statistiche in tempo reale
- 💾 **Salva automaticamente in Local Storage (AsyncStorage)**
- 📈 Contatori: Total, Completed, Pending

**Features:**
```javascript
- Auto-save in AsyncStorage
- Load automatico all'apertura
- Persiste anche dopo riavvio
- UI modern con card design
```

### 3️⃣ **Weather Dashboard** 🌤️ (NUOVO!)
- 🔍 Ricerca città in tempo reale
- 🌡️ Meteo corrente con temperatura
- 💨 Umidità e velocità vento
- 🎨 Icone animate per condizioni meteo
- 📅 **Previsioni 7 giorni**
- 🌍 **API Pubblica Open-Meteo** (Nessuna chiave richiesta)

**Features:**
```javascript
- Geocoding in tempo reale
- WMO Weather Code interpretation
- Beautiful UI with weather icons
- Daily forecast with min/max temp
- No API key required!
```

### 4️⃣ **Settings** ⚙️
- Toggle notifiche
- Opzioni di personalizzazione
- Switch per abilitare/disabilitare

### 5️⃣ **Profile** 👤
- Info utente
- Avatar placeholder
- Email e nome
- Profilo da Redux store

---

## 🔑 Tecnologie Utilizzate

| Componente | Tecnologia | Scopo |
|-----------|-----------|-------|
| Frontend | React Native | Mobile app cross-platform |
| State | Redux + Redux Thunk | Global state management |
| Storage | AsyncStorage | Local persistence for todos |
| APIs | Axios | HTTP requests |
| Weather API | Open-Meteo | Real-time weather (free) |
| Icons | Ionicons | UI icons |
| Backend | Express.js | REST API |
| Memory | Python 3.9 | Memory management |

---

## 💾 Local Storage (To-Do List)

Usa `@react-native-async-storage/async-storage`:

```javascript
// Struttura dati salvata:
{
  id: "1692374400000",
  title: "Complete project",
  completed: false,
  createdAt: "2023-08-18T10:00:00.000Z"
}

// Auto-save quando:
// - Aggiungi un task
// - Segni come completato
// - Elimini un task

// Auto-load quando:
// - Apri l'app
// - Navighi alla schermata
```

---

## 🌤️ Weather API (Open-Meteo)

**Endpoints:**
```
GET https://geocoding-api.open-meteo.com/v1/search
  - Ricerca città per nome

GET https://api.open-meteo.com/v1/forecast
  - Weather data, forecast, coordinate-based
```

**Dati Forniti:**
- Temperatura attuale
- Codice meteo WMO
- Umidità relativa
- Velocità vento
- Previsioni 7 giorni (min/max temp)
- Timezone automatico

---

## 📡 Backend API

### Users
```
GET /api/users              - Tutti gli utenti
GET /api/users/:id         - Utente specifico
POST /api/users            - Crea utente
PUT /api/users/:id         - Aggiorna utente
```

### Data
```
GET /api/data              - Tutti i dati
GET /api/data/:id          - Dato specifico
POST /api/data             - Crea dato
```

---

## 📊 Redux State

```javascript
// State structure:
{
  user: {
    name: "John Doe",
    email: "john@example.com",
    isLoading: false,
    error: null
  }
}
```

---

## 🎨 UI/UX Design

- **Color Scheme**: iOS-style (Blue #007AFF)
- **Typography**: Clear hierarchy
- **Spacing**: Consistent padding (16px, 20px)
- **Shadows**: Subtle depth effects
- **Icons**: Ionicons for consistency
- **Responsive**: Mobile-first design
- **Dark Elements**: #F2F2F7 background

---

## ✨ Features Highlights

✅ Tab navigation with 5 screens  
✅ Redux state management  
✅ Local storage persistence  
✅ Real-time weather API  
✅ City search with geocoding  
✅ Todo filtering (All/Pending/Completed)  
✅ Beautiful UI with icons  
✅ Auto-save functionality  
✅ Error handling  
✅ Loading states  

---

## 🔐 Best Practices Implementate

- Redux per state globale
- Error handling in tutti gli API calls
- Input validation
- AsyncStorage per persistence
- Loading/Error states
- Environmental variables
- Clean code architecture
- Modular services
- Proper component structure

---

## 📝 Prossimi Sviluppi

- [ ] Autenticazione Firebase
- [ ] Cloud sync per to-do (Firebase/Firestore)
- [ ] Push notifications
- [ ] Theme personalizzato (Light/Dark)
- [ ] Dark mode
- [ ] Offline mode avanzato
- [ ] SQLite local database
- [ ] Share task tra utenti
- [ ] Weather alerts
- [ ] App settings sync

---

## 📖 License

MIT

---

## 👨‍💻 Author

ViolaSync Team

---

## 🤝 Contribuisci

Issues e Pull Requests sono benvenuti!

---

## 🎓 Learning Resources

- [React Native Docs](https://reactnative.dev)
- [Redux Docs](https://redux.js.org)
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage)
- [Open-Meteo API](https://open-meteo.com)
- [Ionicons](https://ionic.io/ionicons)
