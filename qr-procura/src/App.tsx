import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, {
  DrawType,
  TypeNumber,
  Mode,
  ErrorCorrectionLevel,
  DotType,
  CornerSquareType,
  CornerDotType,
  FileExtension,
  Options
} from 'qr-code-styling';
import { 
  Github, 
  Download, 
  Wifi, 
  Link as LinkIcon, 
  MessageCircle, 
  History, 
  Sparkles, 
  Palette, 
  Trash2,
  Settings2,
  Image as ImageIcon,
  Layers,
  Maximize2,
  RotateCcw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  serverTimestamp,
  User,
  handleFirestoreError,
  OperationType
} from './firebase';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

type ContentType = 'url' | 'wifi' | 'whatsapp';

interface HistoryItem {
  id: string;
  options: Options;
  timestamp: number;
  label: string;
  userId: string;
}

const PRESETS: Record<string, Partial<Options>> = {
  'Cyberpunk': {
    dotsOptions: { color: '#00ff00', type: 'square' },
    backgroundOptions: { color: '#000000' },
    cornersSquareOptions: { color: '#ff00ff', type: 'square' },
    cornersDotOptions: { color: '#00ffff', type: 'square' },
  },
  'Minimal': {
    dotsOptions: { color: '#000000', type: 'rounded' },
    backgroundOptions: { color: '#ffffff' },
    cornersSquareOptions: { color: '#000000', type: 'extra-rounded' },
    cornersDotOptions: { color: '#000000', type: 'dot' },
  },
  'Luxury': {
    dotsOptions: { color: '#b4941f', type: 'classy' },
    backgroundOptions: { color: '#0f172a' },
    cornersSquareOptions: { color: '#b4941f', type: 'square' },
    cornersDotOptions: { color: '#b4941f', type: 'square' },
  },
  'Vibrant': {
    dotsOptions: { color: '#f43f5e', type: 'extra-rounded' },
    backgroundOptions: { color: '#fff1f2' },
    cornersSquareOptions: { color: '#fb7185', type: 'extra-rounded' },
    cornersDotOptions: { color: '#e11d48', type: 'dot' },
  }
};

export default function App() {
  const [options, setOptions] = useState<Options>({
    width: 300,
    height: 300,
    type: 'canvas' as DrawType,
    data: 'https://qr-procura.com',
    image: '',
    margin: 2,
    qrOptions: {
      typeNumber: 0 as TypeNumber,
      mode: 'Byte' as Mode,
      errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 15,
      crossOrigin: 'anonymous',
    },
    dotsOptions: {
      type: 'rounded' as DotType,
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#6366f1' },
          { offset: 1, color: '#a855f7' }
        ]
      }
    },
    backgroundOptions: {
      color: '#ffffff',
    },
    cornersSquareOptions: {
      type: 'extra-rounded' as CornerSquareType,
      gradient: {
        type: 'linear',
        rotation: 45,
        colorStops: [
          { offset: 0, color: '#4f46e5' },
          { offset: 1, color: '#7c3aed' }
        ]
      }
    },
    cornersDotOptions: {
      type: 'dot' as CornerDotType,
      color: '#4f46e5'
    }
  });

  const [contentType, setContentType] = useState<ContentType>('url');
  const [wifi, setWifi] = useState({ ssid: '', password: '', encryption: 'WPA' });
  const [whatsapp, setWhatsapp] = useState({ phone: '', message: '' });
  const [url, setUrl] = useState('https://qr-procura.com');
  
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [fileExt, setFileExt] = useState<FileExtension>('png');
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'ai' | 'history'>('content');
  
  // Auth & Database State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Load Preferences & History from Firestore
  useEffect(() => {
    if (!isAuthReady) return;

    if (user) {
      // Load Preferences
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.lastOptions) setOptions(data.lastOptions);
        } else {
          // Initialize user doc
          setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            updatedAt: serverTimestamp()
          }).catch(err => handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`));
        }
      }).catch(err => handleFirestoreError(err, OperationType.GET, `users/${user.uid}`));

      // Load History (Real-time)
      const historyQuery = query(
        collection(db, 'users', user.uid, 'history'),
        orderBy('timestamp', 'desc'),
        limit(20)
      );

      const unsubscribeHistory = onSnapshot(historyQuery, (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as HistoryItem[];
        setHistory(items);
      }, (err) => handleFirestoreError(err, OperationType.LIST, `users/${user.uid}/history`));

      return () => unsubscribeHistory();
    } else {
      // Guest Mode: Load from LocalStorage
      const savedHistory = localStorage.getItem('qr_procura_history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    }
  }, [user, isAuthReady]);

  // Sync Preferences to Firestore (Debounced)
  useEffect(() => {
    if (user && isAuthReady) {
      const timeoutId = setTimeout(() => {
        setDoc(doc(db, 'users', user.uid), {
          lastOptions: options,
          updatedAt: serverTimestamp()
        }, { merge: true }).catch(err => handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`));
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [options, user, isAuthReady]);

  useEffect(() => {
    if (!qrCode.current) qrCode.current = new QRCodeStyling(options);
    if (qrRef.current && qrRef.current.childNodes.length === 0) qrCode.current.append(qrRef.current);
  }, []);

  useEffect(() => {
    if (qrCode.current) {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qrCode.current.append(qrRef.current);
      }
      qrCode.current.update(options);
    }
  }, [options]);

  useEffect(() => {
    let data = '';
    if (contentType === 'url') data = url;
    else if (contentType === 'wifi') data = `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};;`;
    else if (contentType === 'whatsapp') {
      const cleanPhone = whatsapp.phone.replace(/\D/g, '');
      data = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsapp.message)}`;
    }
    setOptions(prev => ({ ...prev, data }));
  }, [contentType, url, wifi, whatsapp]);

  const onOptionChange = (key: keyof Options, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetName: string) => {
    setOptions(prev => ({ ...prev, ...PRESETS[presetName] }));
  };

  const saveToHistory = async () => {
    const newItemData = {
      options: { ...options },
      timestamp: Date.now(),
      label: options.data?.substring(0, 20) || 'Sem título'
    };

    if (user) {
      try {
        await addDoc(collection(db, 'users', user.uid, 'history'), {
          ...newItemData,
          id: Date.now().toString(), // For consistency with local type
          userId: user.uid
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/history`);
      }
    } else {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        ...newItemData,
        userId: 'guest'
      };
      const newHistory = [newItem, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem('qr_procura_history', JSON.stringify(newHistory));
    }
  };

  const loadFromHistory = (item: HistoryItem) => {
    setOptions(item.options);
  };

  const deleteHistoryItem = async (id: string) => {
    if (user) {
      try {
        await deleteDoc(doc(db, 'users', user.uid, 'history', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/history/${id}`);
      }
    } else {
      const newHistory = history.filter(item => item.id !== id);
      setHistory(newHistory);
      localStorage.setItem('qr_procura_history', JSON.stringify(newHistory));
    }
  };

  const generateAiStyle = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    try {
      const prompt = `Você é um designer de QR Codes. O usuário quer um estilo baseado em: "${aiPrompt}". 
      Retorne APENAS um objeto JSON válido com as seguintes chaves: 
      dotsColor (hex), dotsType (rounded, dots, classy, classy-rounded, square, extra-rounded), 
      bgColor (hex), cornersSquareColor (hex), cornersSquareType (dot, square, extra-rounded), 
      cornersDotColor (hex), cornersDotType (dot, square).`;
      
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      const jsonMatch = response.text.match(/\{.*\}/s);
      if (jsonMatch) {
        const style = JSON.parse(jsonMatch[0]);
        setOptions(prev => ({
          ...prev,
          dotsOptions: { ...prev.dotsOptions, color: style.dotsColor, type: style.dotsType },
          backgroundOptions: { ...prev.backgroundOptions, color: style.bgColor },
          cornersSquareOptions: { ...prev.cornersSquareOptions, color: style.cornersSquareColor, type: style.cornersSquareType },
          cornersDotOptions: { ...prev.cornersDotOptions, color: style.cornersDotColor, type: style.cornersDotType }
        }));
      }
    } catch (error) {
      console.error("Erro ao gerar estilo IA:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setHistory([]); // Clear local state on logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const download = () => {
    if (qrCode.current) {
      qrCode.current.download({ name: 'qr-procura', extension: fileExt });
      saveToHistory();
    }
  };

  return (
    <div className="h-screen bg-[#020617] text-slate-200 font-sans flex overflow-hidden selection:bg-indigo-500/30">
      {/* Left Sidebar: Navigation */}
      <aside className="w-20 bg-slate-950 border-r border-slate-800/50 flex flex-col items-center py-6 gap-8 z-50">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4">
          <span className="text-2xl font-black text-white">Q</span>
        </div>
        
        <nav className="flex flex-col gap-4 flex-1">
          <NavIcon active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={<LinkIcon size={22} />} label="Dados" />
          <NavIcon active={activeTab === 'design'} onClick={() => setActiveTab('design')} icon={<Palette size={22} />} label="Design" />
          <NavIcon active={activeTab === 'ai'} onClick={() => setActiveTab('ai')} icon={<Sparkles size={22} />} label="IA" />
          <NavIcon active={activeTab === 'history'} onClick={() => setActiveTab('history')} icon={<History size={22} />} label="Histórico" />
        </nav>

        <div className="flex flex-col gap-4 mt-auto">
          {user ? (
            <button onClick={logout} className="group relative flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full border-2 border-slate-800 overflow-hidden hover:border-indigo-500 transition-all">
                <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">Sair</span>
            </button>
          ) : (
            <button onClick={login} className="p-3 text-slate-500 hover:text-white transition-colors flex flex-col items-center gap-1 group">
              <Settings2 size={22} />
              <span className="text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Login</span>
            </button>
          )}
          <a href="https://github.com" className="p-3 text-slate-500 hover:text-white transition-colors">
            <Github size={22} />
          </a>
        </div>
      </aside>

      {/* Middle Panel: Contextual Controls */}
      <aside className="w-[380px] bg-slate-950/50 backdrop-blur-xl border-r border-slate-800/50 flex flex-col overflow-y-auto scrollbar-hide">
        <div className="p-8">
          <header className="mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight capitalize">{activeTab === 'content' ? 'Conteúdo' : activeTab === 'ai' ? 'IA Studio' : activeTab}</h2>
            <p className="text-xs text-slate-500 font-bold tracking-widest mt-1 uppercase">Configurações do Projeto</p>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === 'content' && (
              <motion.div key="content" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
                  <button onClick={() => setContentType('url')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${contentType === 'url' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>URL</button>
                  <button onClick={() => setContentType('wifi')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${contentType === 'wifi' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>Wi-Fi</button>
                  <button onClick={() => setContentType('whatsapp')} className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${contentType === 'whatsapp' ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}>WhatsApp</button>
                </div>

                <div className="space-y-6">
                  {contentType === 'url' && (
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Link do Destino</label>
                      <textarea value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" rows={3} />
                    </div>
                  )}
                  {contentType === 'wifi' && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nome da Rede</label>
                        <input value={wifi.ssid} onChange={(e) => setWifi({...wifi, ssid: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Senha</label>
                        <input type="password" value={wifi.password} onChange={(e) => setWifi({...wifi, password: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                    </div>
                  )}
                  {contentType === 'whatsapp' && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Telefone</label>
                        <input value={whatsapp.phone} onChange={(e) => setWhatsapp({...whatsapp, phone: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mensagem</label>
                        <textarea value={whatsapp.message} onChange={(e) => setWhatsapp({...whatsapp, message: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none" rows={3} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-800/50">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 block">Presets de Estilo</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(PRESETS).map(name => (
                      <button key={name} onClick={() => applyPreset(name)} className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-500/50 hover:text-indigo-400 transition-all">{name}</button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'design' && (
              <motion.div key="design" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-8">
                <DesignSection title="Pontos e Formas" icon={<Layers size={16} />}>
                  <SelectInput label="Tipo de Ponto" value={options.dotsOptions?.type || 'rounded'} onChange={(val) => onOptionChange('dotsOptions', { ...options.dotsOptions, type: val })} options={['rounded', 'dots', 'classy', 'square', 'extra-rounded']} />
                  <GradientControl 
                    label="Cor dos Pontos" 
                    options={options.dotsOptions} 
                    onChange={(newDots) => onOptionChange('dotsOptions', newDots)} 
                  />
                </DesignSection>

                <DesignSection title="Cantos" icon={<Maximize2 size={16} />}>
                  <SelectInput label="Formato do Canto" value={options.cornersSquareOptions?.type || 'square'} onChange={(val) => onOptionChange('cornersSquareOptions', { ...options.cornersSquareOptions, type: val })} options={['square', 'dot', 'extra-rounded']} />
                  <GradientControl 
                    label="Cor dos Cantos" 
                    options={options.cornersSquareOptions} 
                    onChange={(newCorners) => onOptionChange('cornersSquareOptions', newCorners)} 
                  />
                </DesignSection>

                <DesignSection title="Identidade Visual" icon={<ImageIcon size={16} />}>
                  <div className="relative group">
                    <input type="file" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => onOptionChange('image', ev.target?.result);
                        reader.readAsDataURL(file);
                      }
                    }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="w-full py-6 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 bg-slate-900/50 group-hover:border-indigo-500/50 transition-colors">
                      <ImageIcon className="text-slate-600 group-hover:text-indigo-400" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-indigo-400">Upload Logo</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <span>Escala da Logo</span>
                      <span>{Math.round((options.imageOptions?.imageSize || 0.4) * 100)}%</span>
                    </div>
                    <input type="range" min="0.1" max="0.5" step="0.05" value={options.imageOptions?.imageSize} onChange={(e) => onOptionChange('imageOptions', { ...options.imageOptions, imageSize: parseFloat(e.target.value) })} className="w-full accent-indigo-500" />
                  </div>
                </DesignSection>

                <DesignSection title="Canvas" icon={<Settings2 size={16} />}>
                  <ColorInput label="Cor de Fundo" value={options.backgroundOptions?.color || '#fff'} onChange={(val) => onOptionChange('backgroundOptions', { ...options.backgroundOptions, color: val })} />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Margem</label>
                      <input type="number" value={options.margin} onChange={(e) => onOptionChange('margin', parseInt(e.target.value))} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Render</label>
                      <select value={options.type} onChange={(e) => onOptionChange('type', e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm">
                        <option value="canvas">Canvas</option>
                        <option value="svg">SVG</option>
                      </select>
                    </div>
                  </div>
                </DesignSection>
              </motion.div>
            )}

            {activeTab === 'ai' && (
              <motion.div key="ai" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6">
                  <p className="text-sm text-indigo-200 leading-relaxed mb-6">Descreva o conceito da sua marca e a IA criará uma identidade visual única para o seu QR Code.</p>
                  <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Ex: Estilo futurista neon para uma agência de tecnologia..." className="w-full bg-slate-950 border border-indigo-500/20 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all mb-4" rows={5} />
                  <button onClick={generateAiStyle} disabled={isAiLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-[0.2em] py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 transition-all">
                    {isAiLoading ? <RotateCcw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    {isAiLoading ? 'Processando...' : 'Gerar Design'}
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div key="history" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                {history.length === 0 ? (
                  <div className="py-20 text-center">
                    <History size={48} className="mx-auto text-slate-800 mb-4" />
                    <p className="text-sm text-slate-600">Nenhum projeto salvo ainda.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {history.map(item => (
                      <div key={item.id} className="group bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between hover:border-indigo-500/50 transition-all cursor-pointer" onClick={() => loadFromHistory(item)}>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-white truncate max-w-[180px]">{item.label}</span>
                          <span className="text-[10px] text-slate-500 mt-1">{new Date(item.timestamp).toLocaleDateString()}</span>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); deleteHistoryItem(item.id); }} className="p-2 text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Main Area: The Stage */}
      <main className="flex-1 bg-[#020617] relative flex items-center justify-center p-12 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
          <div className="relative group">
            {/* Dynamic Glow */}
            <div 
              className="absolute inset-0 blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 rounded-full"
              style={{ 
                background: options.dotsOptions?.gradient 
                  ? `linear-gradient(${options.dotsOptions.gradient.rotation}deg, ${options.dotsOptions.gradient.colorStops[0].color}, ${options.dotsOptions.gradient.colorStops[1].color})`
                  : options.dotsOptions?.color || '#6366f1'
              }}
            ></div>
            
            <div className="bg-white p-4 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative">
              <div className="absolute inset-0 border-4 border-white/10 rounded-[40px] pointer-events-none"></div>
              <div className="relative bg-white p-2 rounded-[32px]">
                <div ref={qrRef} className="transition-transform duration-700 group-hover:scale-[1.02]" />
              </div>
            </div>
          </div>

          <div className="mt-16 w-full flex flex-col items-center gap-8">
            <div className="flex items-center gap-4 p-2 bg-slate-900/50 backdrop-blur-md rounded-[32px] border border-slate-800/50 shadow-2xl">
              <select value={fileExt} onChange={(e) => setFileExt(e.target.value as FileExtension)} className="bg-transparent text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest outline-none cursor-pointer hover:text-indigo-400 transition-colors">
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="svg">SVG</option>
                <option value="webp">WEBP</option>
              </select>
              <div className="w-px h-8 bg-slate-800"></div>
              <button onClick={download} className="bg-white text-slate-950 hover:bg-indigo-50 px-10 py-4 rounded-[24px] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all active:scale-[0.97] shadow-xl shadow-black/20">
                <Download size={18} /> Exportar Projeto
              </button>
            </div>
            
            <div className="flex items-center gap-6 opacity-40">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Render: {options.type}</span>
              <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">ECC: {options.qrOptions?.errorCorrectionLevel}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavIcon({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className="group relative flex flex-col items-center gap-1">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:bg-slate-900 hover:text-slate-300'}`}>
        {icon}
      </div>
      <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity duration-300 ${active ? 'opacity-100 text-indigo-400' : 'opacity-0 group-hover:opacity-100 text-slate-500'}`}>{label}</span>
      {active && <motion.div layoutId="nav-indicator" className="absolute -left-6 w-1 h-8 bg-indigo-500 rounded-r-full" />}
    </button>
  );
}

function DesignSection({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-slate-500">
        {icon}
        <h4 className="text-[10px] font-black uppercase tracking-widest">{title}</h4>
      </div>
      <div className="bg-slate-900/40 border border-slate-800/50 rounded-3xl p-6 space-y-6">
        {children}
      </div>
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</label>
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-xl border border-slate-800 overflow-hidden relative shadow-inner">
          <input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer" />
        </div>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 text-xs font-mono text-slate-400 uppercase" />
      </div>
    </div>
  );
}

function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (val: any) => void; options: string[] }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-bold text-slate-400 uppercase outline-none focus:border-indigo-500/50 transition-colors">
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function GradientControl({ label, options, onChange }: { label: string; options: any; onChange: (val: any) => void }) {
  const isGradient = !!options.gradient;
  
  const toggleGradient = () => {
    if (isGradient) {
      onChange({ ...options, gradient: undefined, color: options.gradient.colorStops[0].color });
    } else {
      onChange({ 
        ...options, 
        color: undefined,
        gradient: {
          type: 'linear',
          rotation: 45,
          colorStops: [
            { offset: 0, color: options.color || '#6366f1' },
            { offset: 1, color: '#a855f7' }
          ]
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{label}</label>
        <button 
          onClick={toggleGradient}
          className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md border transition-all ${isGradient ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-800 text-slate-500'}`}
        >
          {isGradient ? 'Gradiente Ativo' : 'Usar Gradiente'}
        </button>
      </div>

      {!isGradient ? (
        <ColorInput label="Cor Sólida" value={options.color || '#000'} onChange={(val) => onChange({ ...options, color: val })} />
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ColorInput label="Cor Inicial" value={options.gradient.colorStops[0].color} onChange={(val) => {
              const newStops = [...options.gradient.colorStops];
              newStops[0] = { ...newStops[0], color: val };
              onChange({ ...options, gradient: { ...options.gradient, colorStops: newStops } });
            }} />
            <ColorInput label="Cor Final" value={options.gradient.colorStops[1].color} onChange={(val) => {
              const newStops = [...options.gradient.colorStops];
              newStops[1] = { ...newStops[1], color: val };
              onChange({ ...options, gradient: { ...options.gradient, colorStops: newStops } });
            }} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              <span>Rotação</span>
              <span>{options.gradient.rotation}°</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={options.gradient.rotation} 
              onChange={(e) => onChange({ ...options, gradient: { ...options.gradient, rotation: parseInt(e.target.value) } })}
              className="w-full accent-indigo-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}
