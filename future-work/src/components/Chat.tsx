import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface IUser {
  id?: number;
  nome?: string;
  foto?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  usuario?: IUser | null;
}

export default function Chat({ isOpen, onClose, usuario }: Props) {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const storageKey = (u?: IUser | null) => `chat_messages_${u?.id ?? 'global'}`;

  const loadMessages = (u?: IUser | null) => {
    try {
      const raw = localStorage.getItem(storageKey(u));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as { sender: "user" | "bot"; text: string }[];
      return null;
    } catch (err) {
      console.error('Failed to load chat messages', err);
      return null;
    }
  };

  const saveMessages = (u: IUser | null | undefined, msgs: { sender: "user" | "bot"; text: string }[]) => {
    try {
      localStorage.setItem(storageKey(u), JSON.stringify(msgs));
    } catch (err) {
      console.error('Failed to save chat messages', err);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    // load stored messages for this usuario
    const stored = loadMessages(usuario);
    if (stored && stored.length > 0) {
      setMessages(stored);
    } else {
      const greet = { sender: "bot" as const, text: `Olá, eu sou o ${usuario?.nome ? " " + usuario.nome.split(" ")[0] : ""}! Como você vai hoje?` };
        setMessages([greet]);
        saveMessages(usuario, [greet]);
    }
  }, [isOpen, usuario]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg = { sender: "user", text } as const;
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput("");
    saveMessages(usuario, newMsgs);

    setTimeout(() => {
      let reply = "Desculpe, não entendi. Pode elaborar?";
      const t = text.toLowerCase();
      if (t.includes("oi") || t.includes("olá") || t.includes("ola")) reply = "Oi! Em que posso ajudar?";
      else if (t.includes("projeto") || t.includes("curriculo") || t.includes("vaga")) reply = "Posso ajudar a revisar seu projeto ou dar sugestões de vagas. Quer que eu analise algo específico?";
      else if (t.includes("html") || t.includes("react") || t.includes("typescript")) reply = "Posso explicar conceitos ou sugerir melhorias no código. Quer enviar um trecho?";
      else if (t.includes("obrigad") || t.includes("valeu")) reply = "De nada! Estou à disposição.";

      const botMsg = { sender: "bot", text: reply } as const;
      const withBot = [...newMsgs, botMsg];
      setMessages(withBot);
      saveMessages(usuario, withBot);
    }, 700);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4">
      <div className="bg-white dark:bg-[#1F2226] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img src={usuario?.foto || "https://via.placeholder.com/40"} alt={usuario?.nome} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-bold text-gray-900 dark:text-white">{usuario?.nome || "Chat"}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Assistente</div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-white/5">
            <X size={18} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`${m.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white"} p-3 rounded-lg max-w-[80%]`}>{m.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1F2226]">
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escreva uma mensagem..." className="flex-1 h-10 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#101214] text-gray-900 dark:text-white focus:outline-none" />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
