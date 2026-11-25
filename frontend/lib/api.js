import { pegarToken } from "@/lib/sessao";
 
const URL_API = process.env.NEXT_PUBLIC_API_URL;
 
export async function chamarApi(caminho, opcoes = {}) {
  const token = pegarToken();
  const resposta = await fetch(URL_API + caminho, {
    method: opcoes.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: opcoes.body ? JSON.stringify(opcoes.body) : undefined,
  });
 
  if (resposta.status === 204) return null;
 
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Algo deu errado. Tente de novo.");
  }
  return dados;
}