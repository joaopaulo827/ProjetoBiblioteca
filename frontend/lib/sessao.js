"use client";

import { useSyncExternalStore } from "react";

const CHAVE = "sessao";
const EVENTO = "sessao-mudou";

export function entrar(token, nome) {
  localStorage.setItem(CHAVE, JSON.stringify({ token, nome }));
  window.dispatchEvent(new Event(EVENTO));
}

export function sair() {
  localStorage.removeItem(CHAVE);
  window.dispatchEvent(new Event(EVENTO));
}

export function pegarToken() {
  const texto = localStorage.getItem(CHAVE);
  return texto ? JSON.parse(texto).token : null;
}

function assinar(avisar) {
  window.addEventListener(EVENTO, avisar);
  window.addEventListener("storage", avisar);
  return () => {
    window.removeEventListener(EVENTO, avisar);
    window.removeEventListener("storage", avisar);
  };
}

export function useSessao() {
  const texto = useSyncExternalStore(
    assinar,
    () => localStorage.getItem(CHAVE),
    () => undefined,
  );
  if (texto === undefined) return { carregando: true, usuario: null };
  return { carregando: false, usuario: texto ? JSON.parse(texto) : null };
}