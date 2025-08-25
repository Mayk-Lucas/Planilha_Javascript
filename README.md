# Planilha Interativa no Navegador
Este projeto é uma planilha interativa completa desenvolvida em JavaScript, HTML e CSS. Ela funciona diretamente no seu navegador, permitindo que você digite números, textos e fórmulas em células, que são avaliadas em tempo real. É uma ótima ferramenta para entender como funcionam os bastidores de planilhas como o Excel ou Google Sheets, focando na avaliação de expressões e manipulação de dados.

# Funcionalidades Principais
A planilha é equipada com uma série de recursos robustos:

Operações Aritméticas Básicas: Suporta adição (+), subtração (-), multiplicação (*) e divisão (/) com a ordem correta de precedência (multiplicação/divisão antes de adição/subtração) e uso de parênteses.

Referências de Células: Você pode referenciar o valor de outras células pelo ID (ex: A1, B10) em suas fórmulas.

Referências de Intervalos (Ranges): Suporta a seleção de um bloco de células (ex: A1:B5), permitindo que funções operem sobre múltiplos valores.

Funções de Planilha: Uma biblioteca rica de funções pré-definidas para manipulação e análise de dados:

SUM(num1, num2, ...): Soma os valores.

AVERAGE(num1, num2, ...): Calcula a média dos valores.

MEDIAN(num1, num2, ...): Encontra a mediana (valor do meio) dos valores.

EVEN(num1, num2, ...): Filtra e retorna apenas os números pares.

SOMEEVEN(num1, num2, ...): Retorna true se houver pelo menos um número par.

EVERYEVEN(num1, num2, ...): Retorna true se todos os números forem pares.

FIRSTTWO(num1, num2, ...): Retorna os dois primeiros valores de um conjunto.

LASTTWO(num1, num2, ...): Retorna os dois últimos valores de um conjunto.

HAS2(num1, num2, ...): Retorna true se o número 2 estiver presente.

INCREMENT(num1, num2, ...): Adiciona 1 a cada número.

RANDOM(min, delta): Gera um número inteiro aleatório entre min (inclusive) e min + delta (exclusivo).

RANGE(start, end): Gera uma sequência de números de start a end.

NODUPES(num1, num2, ...): Remove valores duplicados, retornando apenas os únicos.

Design Responsivo: A planilha se ajusta para preencher a tela inteira do navegador, com rótulos de linha e coluna que permanecem visíveis ao rolar.

Estilo Limpo e Moderno: Com um esquema de cores em tons de azul claro, linhas de grade escuras e texto em negrito para melhor legibilidade.

# Como Usar
Abra o index.html: Simplesmente abra o arquivo index.html em qualquer navegador web (Chrome, Firefox, Edge, Safari, etc.). Não é necessário nenhum servidor web.

Digite em qualquer Célula: Clique em qualquer célula (os quadrados brancos) e comece a digitar.

Fórmulas: Para que a planilha avalie o que você digitou como uma fórmula, ela DEVE começar com um sinal de igual (=).

Exemplos:

=10+5 (Cálculo simples)

=A1*B2 (Multiplicação de valores de outras células)

=SUM(1,2,3,4) (Soma de números diretos)

=AVERAGE(C1:C5) (Média de um intervalo de células)

=INCREMENT(D1) (Incrementa o valor da célula D1 em 1)

=NODUPES(1,1,2,3,2) (Remove duplicatas, resultando em 1,2,3)

=RANDOM(1,10) (Gera um número aleatório)

Pressione Enter: Após digitar sua fórmula, pressione Enter ou clique fora da célula para que a fórmula seja avaliada e o resultado apareça.

# Estrutura do Projeto
O projeto é composto por três arquivos principais:

index.html: Define a estrutura HTML da planilha, incluindo a grade de células e os rótulos. É o arquivo que você abre no navegador.

script.js: Contém toda a lógica JavaScript, incluindo as funções de avaliação de fórmulas, manipulação de strings, e as implementações de todas as funções da planilha (SUM, AVERAGE, RANDOM, etc.).

style.css: Define a aparência visual da planilha, como cores, espaçamentos, fontes e o layout da grade.

Sinta-se à vontade para explorar o código desta planilha interativa!

Link: https://mayk-lucas.github.io/Planilha_Javascript/
