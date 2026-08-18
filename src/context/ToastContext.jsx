import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../Icon';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState('');
  const timer = useRef(null);

  const showToast = useCallback((message) => {
    setToast(message);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 2600);
  }, []);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && <div className="toast"><Icon name="check" size={15} /> {toast}</div>}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}
