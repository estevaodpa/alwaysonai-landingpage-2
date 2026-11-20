"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { DiagnosticModal } from "./DiagnosticModal";

type DiagnosticContextValue = {
  open: () => void;
  close: () => void;
};

const DiagnosticContext = createContext<DiagnosticContextValue>({
  open: () => {},
  close: () => {},
});

export function useDiagnostic(): DiagnosticContextValue {
  return useContext(DiagnosticContext);
}

export function DiagnosticProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(0);

  // Cada abertura remonta o modal — estado limpo sem setState dentro de effect.
  const open = useCallback(() => {
    setSession((s) => s + 1);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <DiagnosticContext.Provider value={{ open, close }}>
      {children}
      <DiagnosticModal key={session} isOpen={isOpen} onClose={close} />
    </DiagnosticContext.Provider>
  );
}
