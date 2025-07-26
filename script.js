// Mapeia operadores matemáticos infixos (+, -, *, /) às suas funções.
const infixToFunction = {
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "*": (x, y) => x * y,
  "/": (x, y) => x / y,
};

// Avalia e substitui expressões aritméticas simples em uma string usando regex.
const infixEval = (str, regex) =>
  str.replace(regex, (_match, arg1, operator, arg2) =>
    infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
  );

// Garante que multiplicação e divisão sejam resolvidas antes de outras operações.
const highPrecedence = (str) => {
  const regex = /([\d.]+)([*\/])([\d.]+)/;
  const str2 = infixEval(str, regex);
  return str === str2 ? str : highPrecedence(str2); // Função recursiva.
};

// Verifica se um número é par.
const isEven = (num) => num % 2 === 0;
// Soma todos os números em um array.
const sum = (nums) => nums.reduce((acc, el) => acc + el, 0);
// Calcula a média de um array, tratando arrays vazios.
const average = (nums) => sum(nums) / nums.length;

// Calcula a mediana de um array, ordenando-o e tratando comprimentos pares/ímpares.
const median = (nums) => {
  const sorted = nums.slice().sort((a, b) => a - b);
  const length = sorted.length;
  const middle = length / 2 - 1;
  return isEven(length)
    ? average([sorted[middle], sorted[middle + 1]])
    : sorted[Math.ceil(middle)];
};

// Objeto que contém todas as funções customizadas da planilha.
const spreadsheetFunctions = {
  "": (arg) => arg, // Função padrão (identidade) para casos sem função explícita.
  sum,
  average,
  median,
  even: (nums) => nums.filter(isEven), // Filtra números pares.
  someeven: (nums) => nums.some(isEven), // Verifica se há algum número par.
  everyeven: (nums) => nums.every(isEven), // Verifica se todos os números são pares.
  firsttwo: (nums) => nums.slice(0, 2), // Retorna os dois primeiros elementos.
  lasttwo: (nums) => nums.slice(-2), // Retorna os dois últimos elementos.
  has2: (nums) => nums.includes(2), // Verifica se o número 2 está presente.
  increment: (nums) => nums.map((num) => num + 1), // Incrementa cada número em 1.
  random: ([x, y]) => Math.floor(Math.random() * y + x), // Gera um número aleatório entre x (incl.) e x+y (excl.).
  range: (nums) => range(...nums), // Gera um intervalo numérico, usando a função `range` auxiliar.
  nodupes: (nums) => [...new Set(nums).values()], // Remove valores duplicados de um array.
};

// Identifica e avalia chamadas de funções na string da fórmula.
const applyFunction = (str) => {
  const noHigh = highPrecedence(str); // Resolve precedência alta.
  const infix = /([\d.]+)([+-])([\d.]+)/;
  const str2 = infixEval(noHigh, infix); // Resolve precedência baixa.
  const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i; // Regex para chamadas de função.
  const toNumberList = (args) => args.split(",").map(parseFloat); // Converte string de args em array de números.
  const apply = (fn, args) =>
    spreadsheetFunctions[fn.toLowerCase()](toNumberList(args)); // Aplica a função correspondente.
  return str2.replace(functionCall, (match, fn, args) =>
    spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
      ? apply(fn, args)
      : match
  );
};

// Gera um array de números em um intervalo (ex: [1, 2, 3]).
const range = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((element, index) => element + index);
// Gera um array de caracteres em um intervalo (ex: ['A', 'B', 'C']).
const charRange = (start, end) =>
  range(start.charCodeAt(0), end.charCodeAt(0)).map((code) =>
    String.fromCharCode(code)
  );

// Função recursiva principal para avaliar uma fórmula completa.
const evalFormula = (x, cells) => {
  const idToText = (id) => cells.find((cell) => cell.id === id).value; // Obtém valor de uma célula por ID.
  const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi; // Regex para intervalos de células (A1:B5).
  const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2)); // Converte string de números em range.
  const elemValue = (num) => (character) => idToText(character + num); // Retorna valor de célula por linha/coluna.
  const addCharacters = (character1) => (character2) => (num) =>
    charRange(character1, character2).map(elemValue(num)); // Gera IDs de células em um intervalo.
  // 1. Expande intervalos de células (ex: A1:A3 vira A1,A2,A3).
  const rangeExpanded = x.replace(
    rangeRegex,
    (_match, char1, num1, char2, num2) =>
      rangeFromString(num1, num2).map(addCharacters(char1)(char2))
  );
  const cellRegex = /[A-J][1-9][0-9]?/gi; // Regex para referências de células individuais (ex: A1).
  // 2. Substitui referências de células individuais pelos seus valores.
  const cellExpanded = rangeExpanded.replace(cellRegex, (match) =>
    idToText(match.toUpperCase())
  );
  // 3. Aplica as funções da planilha e operações matemáticas.
  const functionExpanded = applyFunction(cellExpanded);
  // Se a fórmula ainda mudou, avalia novamente; senão, retorna o resultado final.
  return functionExpanded === x
    ? functionExpanded
    : evalFormula(functionExpanded, cells);
};

// Executa quando a página é completamente carregada.
window.onload = () => {
  const container = document.getElementById("container"); // Obtém o contêiner da planilha.
  const createLabel = (name) => {
    // Cria um rótulo para colunas/linhas.
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = name;
    container.appendChild(label);
  };
  const letters = charRange("A", "J"); // Rótulos de colunas (A a J).
  letters.forEach(createLabel);
  // Cria rótulos de linhas (1 a 99) e as células de input.
  range(1, 99).forEach((number) => {
    createLabel(number);
    letters.forEach((letter) => {
      const input = document.createElement("input");
      input.type = "text";
      input.id = letter + number; // Define o ID da célula (ex: "A1").
      input.ariaLabel = letter + number;
      input.onchange = update; // Define a função 'update' para quando a célula mudar.
      container.appendChild(input);
    });
  });
};

// Chamada quando o valor de uma célula muda.
const update = (event) => {
  const element = event.target; // A célula que foi alterada.
  const value = element.value.replace(/\s/g, ""); // Remove espaços do valor.
  // Verifica se o valor é uma fórmula (começa com '=') e não se refere a si mesma.
  if (!value.includes(element.id) && value.startsWith("=")) {
    // Avalia a fórmula (removendo o '=') e atualiza o valor da célula.
    element.value = evalFormula(
      value.slice(1),
      Array.from(document.getElementById("container").children) // Passa todas as células como um array.
    );
  }
};