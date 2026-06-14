# -*- coding: utf-8 -*-
"""
Sistema Basico de Hamburgueria - Interface Caractere (terminal)
Briefing de Produto de Software - Versao 01

Entidade: Alimento
    Registro  (String) - Chave primaria
    Nome      (String)
    Categoria (String)
    Preco     (Float)

Funcionalidades:
    1 - Registrar o alimento
    2 - Consultar cardapio
    3 - Atualizar informacoes de alimento
    4 - Remover alimento
    5 - Sair

Armazenamento: arquivo de texto (cardapio.txt)
Formato de cada linha: Registro|Nome|Categoria|Preco
"""

ARQUIVO = "cardapio.txt"


# ----------------------------------------------------------------------
# Funcoes de acesso ao arquivo (persistencia)
# ----------------------------------------------------------------------
def carregar_alimentos():
    """Le o arquivo TXT e devolve uma lista de dicionarios."""
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
        # Na primeira execucao o arquivo ainda nao existe.
        pass
    return alimentos


def salvar_alimentos(alimentos):
    """Grava a lista de alimentos no arquivo TXT."""
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        for a in alimentos:
            f.write(f"{a['registro']}|{a['nome']}|{a['categoria']}|{a['preco']:.2f}\n")


def buscar_por_registro(alimentos, registro):
    """Retorna o alimento com o registro informado, ou None."""
    for a in alimentos:
        if a["registro"] == registro:
            return a
    return None


# ----------------------------------------------------------------------
# Funcoes de entrada de dados (validacao basica)
# ----------------------------------------------------------------------
def ler_preco(mensagem):
    """Le um numero de ponto flutuante, repetindo ate ser valido."""
    while True:
        valor = input(mensagem).replace(",", ".").strip()
        try:
            return float(valor)
        except ValueError:
            print("Valor invalido. Digite um numero (ex: 30.00).")


# ----------------------------------------------------------------------
# Funcionalidades principais
# ----------------------------------------------------------------------
def registrar_alimento(alimentos):
    print("\n--- REGISTRAR ALIMENTO ---")
    registro = input("Registro (codigo): ").strip()

    if not registro:
        print("Registro nao pode ser vazio.")
        return
    if buscar_por_registro(alimentos, registro):
        print("Ja existe um alimento com esse registro.")
        return

    nome = input("Nome: ").strip()
    categoria = input("Categoria: ").strip()
    preco = ler_preco("Preco: ")

    alimentos.append({
        "registro": registro,
        "nome": nome,
        "categoria": categoria,
        "preco": preco,
    })
    salvar_alimentos(alimentos)
    print("Alimento registrado com sucesso.")


def consultar_cardapio(alimentos):
    print("\n=============================")
    print("RELATORIO DO CARDAPIO - HAMBURGUERIA")
    print("----------------------------------------------------")
    print(f"{'Registro':<10}| {'Nome':<15}| {'Categoria':<12}| {'Preco'}")

    if not alimentos:
        print("Nenhum alimento cadastrado.")
    else:
        for a in alimentos:
            print(f"{a['registro']:<10}| {a['nome']:<15}| {a['categoria']:<12}| {a['preco']:.2f}")

    print("----------------------------------------------------")
    print(f"Total de alimentos {len(alimentos)}")
    print("=============================")


def atualizar_alimento(alimentos):
    print("\n--- ATUALIZAR ALIMENTO ---")
    registro = input("Informe o registro do alimento: ").strip()
    alimento = buscar_por_registro(alimentos, registro)

    if not alimento:
        print("Alimento nao encontrado.")
        return

    print("Deixe em branco para manter o valor atual.")

    novo_nome = input(f"Nome [{alimento['nome']}]: ").strip()
    if novo_nome:
        alimento["nome"] = novo_nome

    nova_categoria = input(f"Categoria [{alimento['categoria']}]: ").strip()
    if nova_categoria:
        alimento["categoria"] = nova_categoria

    novo_preco = input(f"Preco [{alimento['preco']:.2f}]: ").replace(",", ".").strip()
    if novo_preco:
        try:
            alimento["preco"] = float(novo_preco)
        except ValueError:
            print("Preco invalido. Mantido o valor anterior.")

    salvar_alimentos(alimentos)
    print("Alimento atualizado com sucesso.")


def remover_alimento(alimentos):
    print("\n--- REMOVER ALIMENTO ---")
    registro = input("Informe o registro do alimento: ").strip()
    alimento = buscar_por_registro(alimentos, registro)

    if not alimento:
        print("Alimento nao encontrado.")
        return

    confirmacao = input(f"Remover '{alimento['nome']}'? (s/n): ").strip().lower()
    if confirmacao == "s":
        alimentos.remove(alimento)
        salvar_alimentos(alimentos)
        print("Alimento removido com sucesso.")
    else:
        print("Operacao cancelada.")


# ----------------------------------------------------------------------
# Menu principal
# ----------------------------------------------------------------------
def exibir_menu():
    print("\n=========================================")
    print(" SISTEMA DE HAMBURGUERIA - PYTHON")
    print("=========================================")
    print("1 - Registrar o alimento")
    print("2 - Consultar cardapio")
    print("3 - Atualizar informacoes de alimento")
    print("4 - Remover alimento")
    print("5 - Sair")
    print("=========================================")


def main():
    alimentos = carregar_alimentos()

    while True:
        exibir_menu()
        opcao = input("Escolha uma opcao: ").strip()

        if opcao == "1":
            registrar_alimento(alimentos)
        elif opcao == "2":
            consultar_cardapio(alimentos)
        elif opcao == "3":
            atualizar_alimento(alimentos)
        elif opcao == "4":
            remover_alimento(alimentos)
        elif opcao == "5":
            print("Encerrando o sistema. Ate logo.")
            break
        else:
            print("Opcao invalida. Tente novamente.")


if __name__ == "__main__":
    main()
