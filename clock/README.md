# Relógio Digital em React

Este é um projeto simples de um relógio digital desenvolvido com React, TypeScript e Vite.

## Funcionalidades

- Exibe a hora atual, atualizando a cada segundo.
- Um botão para pausar e retomar o relógio.
- Design responsivo com suporte a dark mode.

## Como Executar

1.  Clone o repositório.
2.  Instale as dependências com `npm install`.
3.  Execute o projeto com `npm run dev`.

## Solução Implementada

O projeto foi estruturado com os seguintes componentes:

- **`Clock`**: O componente principal que contém a lógica do relógio.
  - Utiliza `useState` para armazenar a hora atual e o estado de "pausado".
  - Utiliza `useEffect` para atualizar a hora a cada segundo, limpando o intervalo quando o componente é desmontado ou pausado.
- **`Button`**: Um componente de botão reutilizável para a ação de pausar/retomar.

Os estilos foram criados em arquivos `.css` separados para cada componente, e o dark mode é suportado utilizando a media query `prefers-color-scheme`.