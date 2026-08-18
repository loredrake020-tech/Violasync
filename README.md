# ViolaSync - React Native App

Un'applicazione mobile completa costruita con **React Native**, con backend **Node.js/Express** e gestione della memoria con **Python**.

## 📱 Struttura del Progetto

```
violasync/
├── App.js                    # Main app component
├── package.json              # Frontend dependencies
├── frontend/
│   ├── screens/              # Screen components
│   │   ├── HomeScreen.js
│   │   ├── SettingsScreen.js
│   │   └── ProfileScreen.js
│   ├── redux/                # Redux state management
│   │   ├── store.js
│   │   └── reducers/
│   │       └── userReducer.js
│   └── services/             # API services
│       └── api.js
├── backend/
│   ├── server.js             # Express server
│   ├── package.json
│   └── routes/               # API routes
│       ├── userRoutes.js
│       └── dataRoutes.js
├── memory/
│   ├── memory.py             # Python memory management
│   └── requirements.txt
├── .env.example              # Environment variables template
├── .gitignore
└── README.md
```

## 🚀 Installazione

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
python -c "from memory import memory; print(memory.export_memory())"
```

## 🔧 Configurazione

1. Copia `.env.example` in `.env`
2. Modifica le variabili d'ambiente secondo le tue necessità
3. Avvia il backend prima del frontend

## 📚 Features

- ✅ Navigation con React Navigation
- ✅ State management con Redux
- ✅ API REST con Express.js
- ✅ Memory management con Python
- ✅ Multi-schermata (Home, Settings, Profile)
- ✅ Gestione utenti
- ✅ Persistenza dati

## 🛠️ Tecnologie

- **Frontend**: React Native, Redux, Axios
- **Backend**: Express.js, Node.js
- **Memory**: Python
- **State**: Redux + Redux Thunk

## 📖 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user

### Data
- `GET /api/data` - Get all data
- `GET /api/data/:id` - Get data by ID
- `POST /api/data` - Create data

## 🔐 Best Practices

- Usa Redux per lo state globale
- Implementa error handling in tutti gli API calls
- Valida i dati in input
- Usa variabili d'ambiente per le configurazioni sensibili
- Aggiungi logging per il debugging

## 📝 License

MIT

## 👨‍💻 Author

ViolaSync Team