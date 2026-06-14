# -*- coding: utf-8 -*-
"""
Sistema Basico de Hamburgueria - Interface Grafica (Tkinter)
Briefing de Produto de Software - Versao 01

Usa o mesmo arquivo de dados da versao caractere: cardapio.txt
Formato de cada linha: Registro|Nome|Categoria|Preco
"""

import tkinter as tk
from tkinter import ttk, messagebox

ARQUIVO = "cardapio.txt"


# ----------------------------------------------------------------------
# Persistencia em arquivo TXT
# ----------------------------------------------------------------------
def carregar_alimentos():
    alimentos = []
    try:
        with open(ARQUIVO, "r", encoding="utf-8") as f:
            for linha in f:
                linha = linha.strip()
                if not linha:
                    continue
                partes = linha.split("|")
                if len(partes) == 4:
                    alimentos.append({
                        "registro": partes[0],
                        "nome": partes[1],
                        "categoria": partes[2],
                        "preco": float(partes[3]),
                    })
    except FileNotFoundError:
        pass
    return alimentos


def salvar_alimentos(alimentos):
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        for a in alimentos:
            f.write(f"{a['registro']}|{a['nome']}|{a['categoria']}|{a['preco']:.2f}\n")


# ----------------------------------------------------------------------
# Aplicacao grafica
# ----------------------------------------------------------------------
class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Sistema de Hamburgueria - Python")
        self.geometry("640x460")
        self.alimentos = carregar_alimentos()

        self._construir_formulario()
        self._construir_botoes()
        self._construir_tabela()
        self.atualizar_tabela()

    # ---- Construcao da interface ----
    def _construir_formulario(self):
        frame = ttk.LabelFrame(self, text="Dados do alimento")
        frame.pack(fill="x", padx=10, pady=10)

        ttk.Label(frame, text="Registro:").grid(row=0, column=0, padx=5, pady=5, sticky="e")
        self.entry_registro = ttk.Entry(frame, width=20)
        self.entry_registro.grid(row=0, column=1, padx=5, pady=5)

        ttk.Label(frame, text="Nome:").grid(row=0, column=2, padx=5, pady=5, sticky="e")
        self.entry_nome = ttk.Entry(frame, width=20)
        self.entry_nome.grid(row=0, column=3, padx=5, pady=5)

        ttk.Label(frame, text="Categoria:").grid(row=1, column=0, padx=5, pady=5, sticky="e")
        self.entry_categoria = ttk.Entry(frame, width=20)
        self.entry_categoria.grid(row=1, column=1, padx=5, pady=5)

        ttk.Label(frame, text="Preco:").grid(row=1, column=2, padx=5, pady=5, sticky="e")
        self.entry_preco = ttk.Entry(frame, width=20)
        self.entry_preco.grid(row=1, column=3, padx=5, pady=5)

    def _construir_botoes(self):
        frame = ttk.Frame(self)
        frame.pack(fill="x", padx=10)

        ttk.Button(frame, text="Registrar", command=self.registrar).pack(side="left", padx=5)
        ttk.Button(frame, text="Atualizar", command=self.atualizar).pack(side="left", padx=5)
        ttk.Button(frame, text="Remover", command=self.remover).pack(side="left", padx=5)
        ttk.Button(frame, text="Limpar campos", command=self.limpar_campos).pack(side="left", padx=5)

    def _construir_tabela(self):
        frame = ttk.LabelFrame(self, text="Cardapio")
        frame.pack(fill="both", expand=True, padx=10, pady=10)

        colunas = ("registro", "nome", "categoria", "preco")
        self.tabela = ttk.Treeview(frame, columns=colunas, show="headings")
        self.tabela.heading("registro", text="Registro")
        self.tabela.heading("nome", text="Nome")
        self.tabela.heading("categoria", text="Categoria")
        self.tabela.heading("preco", text="Preco")
        self.tabela.column("registro", width=80, anchor="center")
        self.tabela.column("preco", width=80, anchor="center")
        self.tabela.pack(fill="both", expand=True, side="left")

        scroll = ttk.Scrollbar(frame, orient="vertical", command=self.tabela.yview)
        self.tabela.configure(yscrollcommand=scroll.set)
        scroll.pack(side="right", fill="y")

        # Ao clicar em uma linha, carrega os dados nos campos.
        self.tabela.bind("<<TreeviewSelect>>", self.selecionar_linha)

    # ---- Apoio ----
    def atualizar_tabela(self):
        for item in self.tabela.get_children():
            self.tabela.delete(item)
        for a in self.alimentos:
            self.tabela.insert(
                "", "end",
                values=(a["registro"], a["nome"], a["categoria"], f"{a['preco']:.2f}")
            )

    def buscar_por_registro(self, registro):
        for a in self.alimentos:
            if a["registro"] == registro:
                return a
        return None

    def ler_campos(self):
        registro = self.entry_registro.get().strip()
        nome = self.entry_nome.get().strip()
        categoria = self.entry_categoria.get().strip()
        preco_txt = self.entry_preco.get().replace(",", ".").strip()

        if not registro or not nome or not categoria or not preco_txt:
            messagebox.showwarning("Atencao", "Preencha todos os campos.")
            return None
        try:
            preco = float(preco_txt)
        except ValueError:
            messagebox.showwarning("Atencao", "Preco invalido. Use numeros (ex: 30.00).")
            return None

        return {"registro": registro, "nome": nome, "categoria": categoria, "preco": preco}

    def limpar_campos(self):
        self.entry_registro.delete(0, "end")
        self.entry_nome.delete(0, "end")
        self.entry_categoria.delete(0, "end")
        self.entry_preco.delete(0, "end")

    def selecionar_linha(self, evento):
        selecionado = self.tabela.selection()
        if not selecionado:
            return
        valores = self.tabela.item(selecionado[0])["values"]
        self.limpar_campos()
        self.entry_registro.insert(0, valores[0])
        self.entry_nome.insert(0, valores[1])
        self.entry_categoria.insert(0, valores[2])
        self.entry_preco.insert(0, valores[3])

    # ---- Funcionalidades principais ----
    def registrar(self):
        dados = self.ler_campos()
        if not dados:
            return
        if self.buscar_por_registro(dados["registro"]):
            messagebox.showerror("Erro", "Ja existe um alimento com esse registro.")
            return
        self.alimentos.append(dados)
        salvar_alimentos(self.alimentos)
        self.atualizar_tabela()
        self.limpar_campos()
        messagebox.showinfo("Sucesso", "Alimento registrado.")

    def atualizar(self):
        dados = self.ler_campos()
        if not dados:
            return
        alimento = self.buscar_por_registro(dados["registro"])
        if not alimento:
            messagebox.showerror("Erro", "Alimento nao encontrado para atualizar.")
            return
        alimento["nome"] = dados["nome"]
        alimento["categoria"] = dados["categoria"]
        alimento["preco"] = dados["preco"]
        salvar_alimentos(self.alimentos)
        self.atualizar_tabela()
        messagebox.showinfo("Sucesso", "Alimento atualizado.")

    def remover(self):
        registro = self.entry_registro.get().strip()
        alimento = self.buscar_por_registro(registro)
        if not alimento:
            messagebox.showerror("Erro", "Informe o registro de um alimento existente.")
            return
        if messagebox.askyesno("Confirmar", f"Remover '{alimento['nome']}'?"):
            self.alimentos.remove(alimento)
            salvar_alimentos(self.alimentos)
            self.atualizar_tabela()
            self.limpar_campos()
            messagebox.showinfo("Sucesso", "Alimento removido.")


if __name__ == "__main__":
    App().mainloop()