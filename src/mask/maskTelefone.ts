function aplicarMascaraTelefone(telefone: string) {
  // Remove qualquer caractere não numérico
  telefone = telefone.replace(/\D/g, "");

  // Aplica a máscara (XX) XXXX-XXXX para números de telefone com 10 ou 11 dígitos
  if (telefone.length <= 10) {
    telefone = telefone.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  } else {
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }

  return telefone;
}

export default aplicarMascaraTelefone;
