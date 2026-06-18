<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Mi Álbum Panini 2026</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { margin: 0; padding: 0; background-color: #f3f4f6; }
        /* Animación personalizada para el escáner */
        @keyframes scan {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(300px); }
        }
        .animate-scan { animation: scan 2s ease-in-out infinite; }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect, useRef, useMemo } = React;

        const Camera = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
        const Search = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
        const BookOpen = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
        const ListTodo = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>;
        const CheckCircle2 = ({size=24, className="", strokeWidth=2}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
        const CircleIcon = ({size=24, className="", strokeWidth=2}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>;
        const ChevronLeft = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
        const XIcon = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
        const TypeIcon = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>;
        const AlertCircle = ({size=24, className=""}) => <svg width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

        const TEAMS = [
            { id: 'MEX', name: 'México', group: 'A', colors: ['bg-[#7DB928]', 'bg-[#006341]'], text: 'text-white', flag: '🇲🇽', count: 20 },
            { id: 'RSA', name: 'Sudáfrica', group: 'A', colors: ['bg-[#7DB928]', 'bg-[#007749]'], text: 'text-white', flag: '🇿🇦', count: 20 },
            { id: 'KOR', name: 'Corea del Sur', group: 'A', colors: ['bg-[#7DB928]', 'bg-[#0047a0]'], text: 'text-white', flag: '🇰🇷', count: 20 },
            { id: 'CZE', name: 'Chequia', group: 'A', colors: ['bg-[#7DB928]', 'bg-[#11457e]'], text: 'text-white', flag: '🇨🇿', count: 20 },
            { id: 'CAN', name: 'Canadá', group: 'B', colors: ['bg-[#E32219]', 'bg-[#ff0000]'], text: 'text-white', flag: '🇨🇦', count: 20 },
            { id: 'BIH', name: 'Bosnia y Herzegovina', group: 'B', colors: ['bg-[#E32219]', 'bg-[#002395]'], text: 'text-white', flag: '🇧🇦', count: 20 },
            { id: 'QAT', name: 'Qatar', group: 'B', colors: ['bg-[#E32219]', 'bg-[#8A1538]'], text: 'text-white', flag: '🇶🇦', count: 20 },
            { id: 'SUI', name: 'Suiza', group: 'B', colors: ['bg-[#E32219]', 'bg-[#ff0000]'], text: 'text-white', flag: '🇨🇭', count: 20 },
            { id: 'BRA', name: 'Brasil', group: 'C', colors: ['bg-[#DED714]', 'bg-[#009B3A]'], text: 'text-gray-800', flag: '🇧🇷', count: 20 },
            { id: 'MAR', name: 'Marruecos', group: 'C', colors: ['bg-[#DED714]', 'bg-[#c1272d]'], text: 'text-gray-800', flag: '🇲🇦', count: 20 },
            { id: 'HAI', name: 'Haití', group: 'C', colors: ['bg-[#DED714]', 'bg-[#00205b]'], text: 'text-gray-800', flag: '🇭🇹', count: 20 },
            { id: 'SCO', name: 'Escocia', group: 'C', colors: ['bg-[#DED714]', 'bg-[#0065bf]'], text: 'text-gray-800', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', count: 20 },
            { id: 'USA', name: 'Estados Unidos', group: 'D', colors: ['bg-[#313B8D]', 'bg-[#b31942]'], text: 'text-white', flag: '🇺🇸', count: 20 },
            { id: 'PAR', name: 'Paraguay', group: 'D', colors: ['bg-[#313B8D]', 'bg-[#d52b1e]'], text: 'text-white', flag: '🇵🇾', count: 20 },
            { id: 'AUS', name: 'Australia', group: 'D', colors: ['bg-[#313B8D]', 'bg-[#00008b]'], text: 'text-white', flag: '🇦🇺', count: 20 },
            { id: 'TUR', name: 'Turquía', group: 'D', colors: ['bg-[#313B8D]', 'bg-[#e30a17]'], text: 'text-white', flag: '🇹🇷', count: 20 },
            { id: 'GER', name: 'Alemania', group: 'E', colors: ['bg-[#EB5A24]', 'bg-black'], text: 'text-white', flag: '🇩🇪', count: 20 },
            { id: 'CUW', name: 'Curazao', group: 'E', colors: ['bg-[#EB5A24]', 'bg-[#002776]'], text: 'text-white', flag: '🇨🇼', count: 20 },
            { id: 'CIV', name: 'Costa de Marfil', group: 'E', colors: ['bg-[#EB5A24]', 'bg-[#f77f00]'], text: 'text-white', flag: '🇨🇮', count: 20 },
            { id: 'ECU', name: 'Ecuador', group: 'E', colors: ['bg-[#EB5A24]', 'bg-[#ffdd00]'], text: 'text-white', flag: '🇪🇨', count: 20 },
            { id: 'NED', name: 'Países Bajos', group: 'F', colors: ['bg-[#007A4B]', 'bg-[#21468b]'], text: 'text-white', flag: '🇳🇱', count: 20 },
            { id: 'JPN', name: 'Japón', group: 'F', colors: ['bg-[#007A4B]', 'bg-[#000555]'], text: 'text-white', flag: '🇯🇵', count: 20 },
            { id: 'SWE', name: 'Suecia', group: 'F', colors: ['bg-[#007A4B]', 'bg-[#fecc00]'], text: 'text-white', flag: '🇸🇪', count: 20 },
            { id: 'TUN', name: 'Túnez', group: 'F', colors: ['bg-[#007A4B]', 'bg-[#e70013]'], text: 'text-white', flag: '🇹🇳', count: 20 },
            { id: 'BEL', name: 'Bélgica', group: 'G', colors: ['bg-[#85AEE0]', 'bg-[#ed2939]'], text: 'text-gray-900', flag: '🇧🇪', count: 20 },
            { id: 'EGY', name: 'Egipto', group: 'G', colors: ['bg-[#85AEE0]', 'bg-[#ce1126]'], text: 'text-gray-900', flag: '🇪🇬', count: 20 },
            { id: 'IRN', name: 'Irán', group: 'G', colors: ['bg-[#85AEE0]', 'bg-[#239f40]'], text: 'text-gray-900', flag: '🇮🇷', count: 20 },
            { id: 'NZL', name: 'Nueva Zelanda', group: 'G', colors: ['bg-[#85AEE0]', 'bg-black'], text: 'text-gray-900', flag: '🇳🇿', count: 20 },
            { id: 'ESP', name: 'España', group: 'H', colors: ['bg-[#3BB4A1]', 'bg-[#aa151b]'], text: 'text-white', flag: '🇪🇸', count: 20 },
            { id: 'CPV', name: 'Cabo Verde', group: 'H', colors: ['bg-[#3BB4A1]', 'bg-[#003893]'], text: 'text-white', flag: '🇨🇻', count: 20 },
            { id: 'KSA', name: 'Arabia Saudita', group: 'H', colors: ['bg-[#3BB4A1]', 'bg-[#006c35]'], text: 'text-white', flag: '🇸🇦', count: 20 },
            { id: 'URU', name: 'Uruguay', group: 'H', colors: ['bg-[#3BB4A1]', 'bg-[#0038a8]'], text: 'text-white', flag: '🇺🇾', count: 20 },
            { id: 'FRA', name: 'Francia', group: 'I', colors: ['bg-[#242A68]', 'bg-[#002395]'], text: 'text-white', flag: '🇫🇷', count: 20 },
            { id: 'SEN', name: 'Senegal', group: 'I', colors: ['bg-[#242A68]', 'bg-[#00853f]'], text: 'text-white', flag: '🇸🇳', count: 20 },
            { id: 'IRQ', name: 'Irak', group: 'I', colors: ['bg-[#242A68]', 'bg-[#007a3d]'], text: 'text-white', flag: '🇮🇶', count: 20 },
            { id: 'NOR', name: 'Noruega', group: 'I', colors: ['bg-[#242A68]', 'bg-[#ba0c2f]'], text: 'text-white', flag: '🇳🇴', count: 20 },
            { id: 'ARG', name: 'Argentina', group: 'J', colors: ['bg-[#EE7B9D]', 'bg-[#43A1D5]'], text: 'text-gray-900', flag: '🇦🇷', count: 20 },
            { id: 'ALG', name: 'Argelia', group: 'J', colors: ['bg-[#EE7B9D]', 'bg-[#006233]'], text: 'text-gray-900', flag: '🇩🇿', count: 20 },
            { id: 'AUT', name: 'Austria', group: 'J', colors: ['bg-[#EE7B9D]', 'bg-[#ed2939]'], text: 'text-gray-900', flag: '🇦🇹', count: 20 },
            { id: 'JOR', name: 'Jordania', group: 'J', colors: ['bg-[#EE7B9D]', 'bg-[#ce1126]'], text: 'text-gray-900', flag: '🇯🇴', count: 20 },
            { id: 'POR', name: 'Portugal', group: 'K', colors: ['bg-[#D11E52]', 'bg-[#006600]'], text: 'text-white', flag: '🇵🇹', count: 20 },
            { id: 'COD', name: 'RD Congo', group: 'K', colors: ['bg-[#D11E52]', 'bg-[#007fff]'], text: 'text-white', flag: '🇨🇩', count: 20 },
            { id: 'UZB', name: 'Uzbekistán', group: 'K', colors: ['bg-[#D11E52]', 'bg-[#0099b5]'], text: 'text-white', flag: '🇺🇿', count: 20 },
            { id: 'COL', name: 'Colombia', group: 'K', colors: ['bg-[#D11E52]', 'bg-[#fcd116]'], text: 'text-white', flag: '🇨🇴', count: 20 },
            { id: 'ENG', name: 'Inglaterra', group: 'L', colors: ['bg-[#822433]', 'bg-white'], text: 'text-white', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', count: 20 },
            { id: 'CRO', name: 'Croacia', group: 'L', colors: ['bg-[#822433]', 'bg-[#ff0000]'], text: 'text-white', flag: '🇭🇷', count: 20 },
            { id: 'GHA', name: 'Ghana', group: 'L', colors: ['bg-[#822433]', 'bg-[#006b3f]'], text: 'text-white', flag: '🇬🇭', count: 20 },
            { id: 'PAN', name: 'Panamá', group: 'L', colors: ['bg-[#822433]', 'bg-[#005293]'], text: 'text-white', flag: '🇵🇦', count: 20 },
        ];

        const GROUPS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

        const getStickerDetails = (teamId, number) => {
            if (number === 1) return "ESCUDO OFICIAL";
            if (number === 13) return "EQUIPO COMPLETO";
            if (teamId === 'MEX' && number === 12) return "MARCEL RUIZ";
            return `JUGADOR ${number}`;
        };

        function App() {
            const [collection, setCollection] = useState({});
            const [activeTab, setActiveTab] = useState('album');
            const [selectedCountry, setSelectedCountry] = useState(null);
            const [searchQuery, setSearchQuery] = useState('');

            const totalStickers = 960; 
            const collectedCount = Object.keys(collection || {}).length;
            const progressPercent = Math.min(100, Math.max(0, Math.round((collectedCount / totalStickers) * 100) || 0));

            const toggleSticker = (id) => {
                setCollection((prev) => {
                    const newCollection = { ...prev };
                    if (newCollection[id]) delete newCollection[id];
                    else newCollection[id] = true;
                    return newCollection;
                });
            };

            const renderContent = () => {
                if (selectedCountry && activeTab === 'album') {
                    const team = TEAMS.find(t => t.id === selectedCountry);
                    if (!team) {
                        setSelectedCountry(null);
                        return <HomeView searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelectCountry={setSelectedCountry} collection={collection} progressPercent={progressPercent} collectedCount={collectedCount} totalStickers={totalStickers} />;
                    }
                    return <CountryView team={team} onBack={() => setSelectedCountry(null)} collection={collection} toggleSticker={toggleSticker} />;
                }

                switch (activeTab) {
                    case 'album': return <HomeView searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelectCountry={setSelectedCountry} collection={collection} progressPercent={progressPercent} collectedCount={collectedCount} totalStickers={totalStickers} />;
                    case 'missing': return <MissingView collection={collection} toggleSticker={toggleSticker} />;
                    case 'scanner': return <ScannerView onScanComplete={(id) => { toggleSticker(id); setActiveTab('missing'); }} collection={collection} />;
                    default: return null;
                }
            };

            return (
                <div className="flex flex-col h-screen bg-gray-50 font-sans max-w-md mx-auto shadow-2xl relative overflow-hidden">
                    {!(activeTab === 'album' && !selectedCountry) && (
                        <header className="bg-rose-800 text-white p-4 shadow-md z-10 flex flex-col gap-2 rounded-b-xl">
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg font-bold flex items-center gap-2">Mi Álbum</h1>
                                <div className="text-xs bg-rose-900 px-2 py-1 rounded-full font-semibold border border-rose-700">
                                    {collectedCount} / {totalStickers}
                                </div>
                            </div>
                            <div className="w-full bg-rose-950 rounded-full h-1.5 mt-1 overflow-hidden">
                                <div className="bg-amber-400 h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                        </header>
                    )}

                    <main className="flex-1 overflow-y-auto pb-24 relative bg-gray-100">
                        {renderContent()}
                    </main>

                    <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 pb-6 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
                        <button onClick={() => { setActiveTab('album'); setSelectedCountry(null); }} className={`flex flex-col items-center p-2 w-1/3 rounded-xl transition-colors ${activeTab === 'album' ? 'text-rose-800 bg-rose-50' : 'text-gray-400 hover:text-rose-600'}`}>
                            <BookOpen size={24} />
                            <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Álbum</span>
                        </button>
                        <button onClick={() => setActiveTab('scanner')} className={`flex flex-col items-center p-2 w-1/3 rounded-xl transition-colors ${activeTab === 'scanner' ? 'text-rose-800 bg-rose-50' : 'text-gray-400 hover:text-rose-600'}`}>
                            <div className="bg-rose-800 text-white p-4 rounded-full -mt-10 shadow-xl border-4 border-white"><Camera size={28} /></div>
                            <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Escanear</span>
                        </button>
                        <button onClick={() => setActiveTab('missing')} className={`flex flex-col items-center p-2 w-1/3 rounded-xl transition-colors ${activeTab === 'missing' ? 'text-rose-800 bg-rose-50' : 'text-gray-400 hover:text-rose-600'}`}>
                            <ListTodo size={24} />
                            <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Faltan</span>
                        </button>
                    </nav>
                </div>
            );
        }

        function HomeView({ searchQuery, setSearchQuery, onSelectCountry, collection, progressPercent, collectedCount, totalStickers }) {
            const safeSearch = (searchQuery || '').toLowerCase();
            const filteredTeams = TEAMS.filter(t => t.name.toLowerCase().includes(safeSearch) || t.id.toLowerCase().includes(safeSearch));
            const circleDasharray = `${((progressPercent / 100) * 138).toFixed(1)} 138`;

            return (
                <div className="duration-300 min-h-full bg-gray-50 pb-8">
                    <div className="relative w-full h-72 bg-[#2D338B] overflow-hidden rounded-b-[2.5rem] shadow-xl mb-6">
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#95C11E] rounded-full mix-blend-screen opacity-90"></div>
                        <div className="absolute top-20 -right-12 w-40 h-40 bg-[#E3001B] rounded-full mix-blend-screen opacity-90"></div>
                        <div className="absolute -bottom-16 left-1/4 w-56 h-56 bg-[#00A3E0] rounded-full mix-blend-screen opacity-80"></div>
                        <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#FFCD00] rounded-full mix-blend-screen opacity-90"></div>
                        <div className="absolute bottom-10 -right-10 w-32 h-32 bg-[#7A2B81] rounded-full mix-blend-screen opacity-90"></div>

                        <div className="absolute top-4 w-full text-center z-10">
                            <span className="text-white text-[10px] font-black tracking-[0.2em] opacity-90 drop-shadow-md">OFFICIAL STICKER COLLECTION</span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center z-10 mt-4">
                            <div className="bg-white px-8 py-6 rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl transform scale-105 border-4 border-white/20">
                                <span className="text-[#1A1A1A] font-black text-3xl tracking-tighter leading-none mb-1">FIFA</span>
                                <span className="text-[#1A1A1A] font-black text-xl tracking-tight leading-none text-center">WORLD CUP</span>
                                <span className="text-[#E3001B] font-black text-5xl tracking-tighter mt-1">2026</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 bg-[#FFCD00] border-2 border-[#E3001B] px-3 py-1 flex items-center gap-1.5 z-20 shadow-lg transform -rotate-2">
                            <div className="w-4 h-5 bg-[#E3001B] flex flex-col items-center justify-center text-[6px] text-white leading-none overflow-hidden">
                                <span className="font-bold">2</span><span className="font-bold">6</span>
                            </div>
                            <span className="text-[#E3001B] font-black tracking-widest text-sm uppercase">Panini</span>
                        </div>
                    </div>

                    <div className="px-5 space-y-6">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Progreso Total</p>
                                <p className="text-2xl font-black text-gray-800">{collectedCount} <span className="text-sm text-gray-400 font-medium">/ {totalStickers}</span></p>
                            </div>
                            <div className="w-14 h-14 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                    <circle cx="24" cy="24" r="22" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                                    <circle cx="24" cy="24" r="22" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray={circleDasharray} className="transition-all duration-1000" />
                                </svg>
                                <span className="text-xs font-bold text-gray-700 z-10">{progressPercent}%</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Search size={18} className="text-gray-400" /></div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-3.5 border-none rounded-2xl bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D338B] text-sm font-medium"
                                placeholder="Buscar país o código (ej. MEX)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"><XIcon size={18} /></button>}
                        </div>

                        <div className="space-y-8">
                            {GROUPS.map(groupLetter => {
                                const groupTeams = filteredTeams.filter(t => t.group === groupLetter);
                                if (groupTeams.length === 0) return null;

                                return (
                                    <div key={groupLetter}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-[#2D338B] text-white flex items-center justify-center font-black text-lg shadow-md">{groupLetter}</div>
                                            <h3 className="font-black text-gray-800 tracking-wider">GRUPO {groupLetter}</h3>
                                            <div className="flex-1 h-px bg-gray-200 ml-2"></div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            {groupTeams.map(team => {
                                                let teamCollected = 0;
                                                for(let i=1; i<=team.count; i++) { if(collection[`${team.id}-${i}`]) teamCollected++; }
                                                const isComplete = teamCollected === team.count;
                                                const percent = team.count > 0 ? (teamCollected / team.count) * 100 : 0;

                                                return (
                                                    <button key={team.id} onClick={() => onSelectCountry(team.id)} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col active:scale-95 transition-transform text-left">
                                                        <div className={`h-12 ${team.colors[0]} relative flex items-center justify-center`}>
                                                            <span className="text-3xl relative z-10 drop-shadow-md">{team.flag}</span>
                                                        </div>
                                                        <div className="p-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <h3 className="font-bold text-gray-800 text-sm truncate pr-2">{team.name}</h3>
                                                                <span className="text-[9px] font-black bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{team.id}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center mt-2">
                                                                <span className="text-[10px] text-gray-500 font-bold">{teamCollected} / {team.count}</span>
                                                                {isComplete ? <CheckCircle2 size={14} className="text-[#95C11E]" /> : (
                                                                    <div className="w-12 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                                        <div className="bg-[#00A3E0] h-1.5 rounded-full transition-all" style={{width: `${percent}%`}}></div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                            {filteredTeams.length === 0 && <div className="text-center py-10 text-gray-500 font-medium">No se encontraron resultados</div>}
                        </div>
                    </div>
                </div>
            );
        }

        function CountryView({ team, onBack, collection, toggleSticker }) {
            const stickers = Array.from({ length: team.count }, (_, i) => i + 1);

            return (
                <div className="duration-200 min-h-full bg-gray-50 pb-6">
                    <div className={`p-6 ${team.colors[0]} ${team.text} relative overflow-hidden shadow-md rounded-b-[2rem]`}>
                        <div className={`absolute bottom-0 left-0 w-full h-3 ${team.colors[1]}`}></div>
                        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-black/20 rounded-full hover:bg-black/30 transition-colors backdrop-blur-sm"><ChevronLeft size={24} className="text-white" /></button>
                        <div className="flex flex-col items-center mt-6">
                            <span className="text-6xl mb-2 drop-shadow-lg">{team.flag}</span>
                            <h2 className="text-3xl font-black tracking-wider uppercase drop-shadow-md text-center">{team.name}</h2>
                            <div className="flex gap-2 mt-2">
                                <span className="bg-black/30 px-3 py-1 rounded-full text-xs font-bold tracking-widest">{team.id}</span>
                                <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest border border-white/30">GRUPO {team.group}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 grid grid-cols-3 gap-3">
                        {stickers.map(num => {
                            const stickerId = `${team.id}-${num}`;
                            const isCollected = collection[stickerId];
                            const name = getStickerDetails(team.id, num);

                            return (
                                <button
                                    key={stickerId}
                                    onClick={() => toggleSticker(stickerId)}
                                    className={`relative aspect-[3/4] rounded-xl flex flex-col items-center justify-center p-2 text-center transition-all ${isCollected ? 'bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transform scale-[1.02] z-10' : 'bg-gray-100/50 border-2 border-dashed border-gray-300 text-gray-400 hover:border-[#00A3E0]'}`}
                                >
                                    <span className={`text-[10px] font-black mb-1 opacity-60 tracking-wider ${isCollected ? 'text-[#2D338B]' : ''}`}>{team.id}</span>
                                    <span className={`font-black ${isCollected ? 'text-2xl text-gray-800' : 'text-xl'}`}>{num}</span>
                                    <span className={`text-[8px] leading-tight mt-2 font-bold uppercase px-1 ${isCollected ? 'text-gray-500' : 'text-gray-400'}`}>{name}</span>
                                    
                                    {isCollected && <div className="absolute -top-2 -right-2 bg-[#95C11E] text-white rounded-full p-1 shadow-sm"><CheckCircle2 size={12} strokeWidth={3} /></div>}
                                </button>
                            );
                        })}
                    </div>
                </div>
            );
        }

        function MissingView({ collection, toggleSticker }) {
            const missingByTeam = useMemo(() => {
                const result = [];
                TEAMS.forEach(team => {
                    const missing = [];
                    for(let i = 1; i <= team.count; i++) {
                        if (!collection[`${team.id}-${i}`]) {
                            missing.push({ number: i, name: getStickerDetails(team.id, i) });
                        }
                    }
                    if (missing.length > 0) result.push({ team, missing });
                });
                return result;
            }, [collection]);

            if (missingByTeam.length === 0) {
                return (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                        <div className="bg-[#95C11E]/20 text-[#95C11E] p-6 rounded-full mb-4"><CheckCircle2 size={64} /></div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">¡Álbum Completo!</h2>
                        <p className="text-gray-500 font-medium">No te falta ninguna estampita.</p>
                    </div>
                );
            }

            return (
                <div className="p-4 space-y-4">
                    {missingByTeam.map(({ team, missing }) => (
                        <div key={team.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className={`px-4 py-3 flex items-center gap-3 ${team.colors[0]} ${team.text}`}>
                                <span className="text-2xl">{team.flag}</span>
                                <div className="flex-1">
                                    <h3 className="font-bold leading-tight">{team.name}</h3>
                                    <span className="text-[9px] font-black opacity-70 tracking-widest">GRUPO {team.group}</span>
                                </div>
                                <span className="bg-black/20 px-2.5 py-1 rounded-md text-xs font-black">{team.id}</span>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {missing.map(item => {
                                    const stickerId = `${team.id}-${item.number}`;
                                    const isSpecial = item.number === 1 || item.number === 13;
                                    return (
                                        <div key={stickerId} className="flex items-center justify-between p-3.5 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm ${isSpecial ? 'bg-[#FFCD00]/20 text-[#D4A000]' : 'bg-gray-100 text-gray-600'}`}>
                                                    {item.number}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-400 font-black tracking-widest uppercase">{team.id}</span>
                                                    <span className="text-sm font-bold text-gray-800">{item.name}</span>
                                                </div>
                                            </div>
                                            <button onClick={() => toggleSticker(stickerId)} className="p-2 text-gray-300 hover:text-[#95C11E] hover:bg-[#95C11E]/10 rounded-full transition-colors">
                                                <CircleIcon size={24} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            );
        }

        function ScannerView({ onScanComplete, collection }) {
            const videoRef = useRef(null);
            const scanTimeoutRef = useRef(null);
            const [hasCamera, setHasCamera] = useState(false);
            const [cameraError, setCameraError] = useState(false);
            const [isScanning, setIsScanning] = useState(false);
            const [extractedData, setExtractedData] = useState(null);

            useEffect(() => {
                let stream = null;
                let isMounted = true;

                const startCamera = async () => {
                    try {
                        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                            throw new Error("Cámara no soportada");
                        }
                        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                        if (videoRef.current && isMounted) { 
                            videoRef.current.srcObject = stream; 
                            setHasCamera(true); 
                        }
                    } catch (err) { 
                        if (isMounted) setCameraError(true);
                    }
                };
                
                setTimeout(startCamera, 300);
                
                return () => { 
                    isMounted = false;
                    if (stream) stream.getTracks().forEach(track => track.stop()); 
                    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
                };
            }, []);

            const handleCapture = () => {
                setIsScanning(true);
                if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
                
                scanTimeoutRef.current = setTimeout(() => {
                    setIsScanning(false);
                    const missingStickers = [];
                    TEAMS.forEach(t => {
                        for(let i=1; i<=t.count; i++) {
                            if(!collection[`${t.id}-${i}`]) missingStickers.push({ code: t.id, number: i, name: getStickerDetails(t.id, i) });
                        }
                    });
                    
                    if (missingStickers.length > 0) {
                        const target = missingStickers[Math.floor(Math.random() * missingStickers.length)];
                        setExtractedData(target);
                    }
                }, 2000);
            };

            return (
                <div className="h-full bg-black relative flex flex-col">
                    <div className="relative flex-1 bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
                        {hasCamera ? (
                            <video ref={videoRef} autoPlay playsInline className={`min-h-full min-w-full object-cover transition-opacity duration-300 ${isScanning ? 'opacity-50' : 'opacity-100'}`} />
                        ) : cameraError ? (
                            <div className="text-white text-center p-8 flex flex-col items-center justify-center w-full h-full bg-gray-900">
                                <AlertCircle size={56} className="text-[#FFCD00] mb-4 opacity-90" />
                                <h3 className="font-black text-xl mb-2">Cámara No Disponible</h3>
                                <p className="text-sm text-gray-400 mb-6 text-center">Abre este archivo en tu teléfono para usar la cámara real.</p>
                                <div className="bg-[#2D338B]/30 border border-[#2D338B] p-4 rounded-2xl w-full max-w-xs">
                                    <p className="text-xs text-[#00A3E0] font-bold text-center leading-relaxed">
                                        ¡No te preocupes! El botón rojo funcionará en <span className="text-white">MODO SIMULADO</span>.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-white text-center p-6 flex flex-col items-center">
                                <Camera size={48} className="mb-4 text-gray-500" />
                                <p className="font-medium">Activando cámara...</p>
                            </div>
                        )}

                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <div className="w-[60%] aspect-[3/4] border-2 border-white/30 rounded-2xl relative">
                                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#00A3E0] rounded-tl-2xl"></div>
                                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#00A3E0] rounded-tr-2xl"></div>
                                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#00A3E0] rounded-bl-2xl"></div>
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#00A3E0] rounded-br-2xl"></div>
                            </div>
                            {isScanning && <div className="absolute top-0 left-0 right-0 h-1 bg-[#00A3E0] shadow-[0_0_20px_rgba(0,163,224,1)] animate-scan"></div>}
                        </div>

                        {extractedData && !isScanning && (
                            <div className="absolute inset-0 flex items-end justify-center z-20 pb-4 bg-black/60 backdrop-blur-md">
                                <div className="bg-white p-6 rounded-[2rem] w-[90%] shadow-2xl">
                                    <div className="flex items-center gap-2 text-[#2D338B] mb-5 border-b border-gray-100 pb-4">
                                        <TypeIcon size={20} />
                                        <h3 className="font-black text-xs uppercase tracking-widest">Texto Extraído (OCR)</h3>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100 flex flex-col items-center justify-center gap-1 shadow-inner">
                                        <span className="text-gray-400 font-black tracking-widest text-sm">{extractedData.code}</span>
                                        <span className="text-6xl font-black text-gray-800 tracking-tighter">{extractedData.number}</span>
                                        <span className="text-sm font-bold text-[#00A3E0] mt-2 uppercase tracking-wide text-center">{extractedData.name}</span>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <button onClick={() => setExtractedData(null)} className="flex-1 py-3.5 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
                                            Reintentar
                                        </button>
                                        <button 
                                            onClick={() => onScanComplete(`${extractedData.code}-${extractedData.number}`)} 
                                            className="flex-[2] py-3.5 rounded-xl font-black text-white bg-[#95C11E] hover:bg-[#86ad1b] shadow-lg shadow-[#95C11E]/30 transition-all flex justify-center items-center gap-2"
                                        >
                                            <CheckCircle2 size={20} strokeWidth={3} /> Lo tengo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {!extractedData && (
                        <div className="bg-[#1A1A1A] p-6 flex justify-center pb-10">
                            <button onClick={handleCapture} disabled={isScanning} className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-1 cursor-pointer disabled:opacity-50 active:scale-95 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                <div className="w-full h-full rounded-full border-[3px] border-[#1A1A1A] flex items-center justify-center">
                                    <div className="w-[3.5rem] h-[3.5rem] bg-[#E3001B] rounded-full"></div>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
