import {
    generos as generosIniciais,
    livros as livrosIniciais,
  } from "@/dados/exemplo";
  
  import { pegarToken } from "@/lib/sessao";
  import { chamarApi } from "@/lib/api";
  
  const CHAVES = {
    generos: "banco-generos",
    livros: "banco-livros",
    usuarios: "banco-usuarios",
  };
  
  function esperar() {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }
  
  function ler(chave, inicial) {
    try {
      const texto = localStorage.getItem(chave);
      return texto ? JSON.parse(texto) : inicial;
    } catch {
      return inicial;
    }
  }
   
  function gravar(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
  }

  function erro(status, mensagem) {
    const e = new Error(mensagem);
    e.status = status;
    return e;
  }
   
  function usuarioLogado() {
    const token = pegarToken();
    const usuario = ler(CHAVES.usuarios, []).find((u) => u.token && u.token === token);
    if (!usuario) throw erro(401, "Faça login para continuar.");
    return usuario;
  }

  export async function listarGeneros() {
    await esperar();
    return ler(CHAVES.generos, generosIniciais);
  }
   
  export async function criarGenero({ nome }) {
    await esperar();
    usuarioLogado();
    if (!nome || nome.trim() === "")
      throw erro(400, "O nome do gênero é obrigatório.");
    const generos = ler(CHAVES.generos, generosIniciais);
    const nova = { id: Date.now(), nome: nome.trim() };
    gravar(CHAVES.generos, [...generos, nova]);
    return nova;
  }  

  export async function listarLivros() {
    await esperar();
    return ler(CHAVES.livros, livrosIniciais);
  }
   
  export async function buscarLivro(id) {
    await esperar();
    const livros = await listarLivros();
  
    const livro = livros.find((r) => r.id === Number(id));
  
    if (!livro) throw erro(404, "Livro não encontrado.");
  
    return livro;
  }
  
  function montarLivro(dados) {
    if (!dados.titulo || dados.titulo.trim() === "")
      throw erro(400, "O título é obrigatório.");
  
    if (!dados.genero_id)
      throw erro(400, "O gênero é obrigatório.");
  
    const genero = ler(CHAVES.generos, generosIniciais).find(
      (c) => c.id === Number(dados.genero_id)
    );
  
    if (!genero)
      throw erro(400, "Gênero inválido.");
  
    return {
      titulo: dados.titulo.trim(),
      autor: dados.autor.trim(),
      ano: Number(dados.ano),
      isbn: dados.isbn.trim(),
      disponivel: Boolean(dados.disponivel),
      genero_id: genero.id,
      genero: genero.genero,
    };
  }

  export async function criarLivro(dados) {
    await esperar();
    const usuario = usuarioLogado(); 
    const nova = { id: Date.now(), ...montarLivro(dados), usuario_id: usuario.id };
    const livros = ler(CHAVES.livros, livrosIniciais);
    gravar(CHAVES.livros, [...livros, nova]);
    return nova;
  }
   
  export async function atualizarLivro(id, dados) {
    await esperar();
    usuarioLogado();
    const livros = ler(CHAVES.livros, livrosIniciais);
    const posicao = livros.findIndex((r) => r.id === Number(id));
    if (posicao === -1) throw erro(404, "Livro não encontrado.");
    const atualizada = { ...livros[posicao], ...montarLivro(dados) };
    gravar(
      CHAVES.livros,
      livros.map((r, i) => (i === posicao ? atualizada : r)),
    );
    return atualizada;
  }
   
  export async function excluirLivro(id) {
    await esperar();
    usuarioLogado();
    const livros = ler(CHAVES.livros, livrosIniciais);
    if (!livros.some((r) => r.id === Number(id)))
      throw erro(404, "Livro não encontrado.");
    gravar(
      CHAVES.livros,
      livros.filter((r) => r.id !== Number(id)),
    );
  }

  export async function cadastrarUsuario({ nome, email, senha }) {
    await esperar();
    if (!nome || !email || !senha) throw erro(400, "Preencha nome, e-mail e senha.");
    const usuarios = ler(CHAVES.usuarios, []);
    const emailLimpo = email.trim().toLowerCase();
    if (usuarios.some((u) => u.email === emailLimpo)) {
      throw erro(409, "Este e-mail já está cadastrado.");
    }
    const novo = {
      id: Date.now(),
      nome: nome.trim(),
      email: emailLimpo,
      senha,
      token: null,
    };
    gravar(CHAVES.usuarios, [...usuarios, novo]);
    return { id: novo.id, nome: novo.nome, email: novo.email };
  }
   
  export async function fazerLogin({ email, senha }) {
    await esperar();
    if (!email || !senha) throw erro(400, "Preencha e-mail e senha.");
    const usuarios = ler(CHAVES.usuarios, []);
    const usuario = usuarios.find((u) => u.email === email.trim().toLowerCase());
    if (!usuario || usuario.senha !== senha)
      throw erro(401, "E-mail ou senha incorretos.");
    const token = `token-${usuario.id}-${Date.now()}`;
    gravar(
      CHAVES.usuarios,
      usuarios.map((u) => (u.id === usuario.id ? { ...u, token } : u)),
    );
    return { token, nome: usuario.nome };
  }
  export const listarCategorias = () => chamarApi("/categorias");
  export const criarCategoria = (dados) =>
    chamarApi("/categorias", { method: "POST", body: dados });
   
  export const listarReceitas = () => chamarApi("/receitas");
  export const buscarReceita = (id) => chamarApi(`/receitas/${id}`);
  export const criarReceita = (dados) =>
    chamarApi("/receitas", { method: "POST", body: dados });
  export const atualizarReceita = (id, dados) =>
    chamarApi(`/receitas/${id}`, { method: "PUT", body: dados });
  export const excluirReceita = (id) => chamarApi(`/receitas/${id}`, { method: "DELETE" });