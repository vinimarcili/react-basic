# React Performance Demo - useMemo e useCallback

Este projeto demonstra de forma prática e visual os conceitos de **useMemo** e **useCallback** no React através de uma demonstração combinada com medição de performance para comparar implementações otimizadas e não otimizadas.

## 🎯 Objetivos Didáticos

- Entender quando e como usar `useMemo` para otimizar cálculos pesados
- Compreender como `useCallback` evita recriação desnecessária de funções
- Visualizar o impacto na performance através de logs detalhados
- Comparar componentes otimizados vs não otimizados lado a lado
- Aplicar ambos os hooks em um cenário real e prático

## 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

## 📚 Demonstração Combinada

### **Conceito Principal**
- **Exemplo**: Lista filtrada e ordenável com remoção de itens
- **useMemo**: Otimiza o processamento da lista (filtragem + ordenação)
- **useCallback**: Mantém a função de remoção estável
- **React.memo**: Evita re-renders desnecessários dos itens da lista
- **Comparação**: Implementação completa otimizada vs não otimizada lado a lado

### **O que você verá:**
- Lista de frutas que pode ser filtrada por texto
- Botão para alternar ordenação (crescente/decrescente)  
- Botão "Counter" que muda um estado não relacionado à lista
- Logs detalhados mostrando quando cálculos e renders acontecem
- Performance visual diferente entre os dois lados

## 🔍 Recursos de Performance

### Logs Detalhados
- Medição de tempo de execução dos cálculos
- Contagem de renders dos componentes
- Logs no console e na interface
- Timestamps para análise temporal

### Métricas Visuais
- Comparação lado a lado das implementações
- Indicadores visuais de performance (✅/❌)
- Estatísticas em tempo real
- Interface responsiva

## 🎓 Conceitos Demonstrados

### useMemo - Exemplo Prático
```typescript
// ❌ Sem otimização - processa a lista a cada render
const processedItems = processItems(items, filter, sortOrder)

// ✅ Com useMemo - só processa quando dependências mudam
const processedItems = useMemo(() => 
  processItems(items, filter, sortOrder), 
  [items, filter, sortOrder]
)
```

### useCallback - Exemplo Prático
```typescript
// ❌ Sem otimização - função recriada a cada render
const removeItem = (index) => {
  setItems(prev => prev.filter((_, i) => i !== index))
}

// ✅ Com useCallback - função estável
const removeItem = useCallback((index) => {
  setItems(prev => prev.filter((_, i) => i !== index))
}, [])
```

### React.memo + useCallback
```typescript
// Componente filho memoizado
const ListItem = memo(({ item, onRemove, index }) => {
  // Só re-renderiza se alguma prop mudar
  return (
    <div>
      {item}
      <button onClick={() => onRemove(index)}>❌</button>
    </div>
  )
})

// Componente pai com useCallback
const ParentComponent = () => {
  // Função estável - ListItem não re-renderiza desnecessariamente
  const removeItem = useCallback((index) => {
    // lógica de remoção
  }, [])
  
  return <ListItem onRemove={removeItem} />
}
```

## 🧪 Testes de Performance

### Como Testar a Diferença
1. **Incremente o Counter**: 
   - ❌ Lado esquerdo (sem otimização): Lista é reprocessada desnecessariamente
   - ✅ Lado direito (com otimização): Lista não é reprocessada (useMemo funciona!)

2. **Digite no filtro**:
   - Ambos os lados reprocessam a lista (comportamento correto e esperado)

3. **Mude a ordenação**:
   - Ambos os lados reprocessam a lista (comportamento correto e esperado)

4. **Remova itens**:
   - ❌ Lado esquerdo: Mais re-renders nos itens da lista
   - ✅ Lado direito: Menos re-renders graças ao useCallback + React.memo

### Métricas Importantes
- **Console do navegador**: Logs em tempo real dos cálculos
- **Logs na interface**: Histórico dos últimos 20 eventos
- **Tempo de processamento**: Medido em milissegundos
- **Contagem de renders**: Visível nos logs de cada componente

## 📊 Análise de Performance

### Console do Navegador
Abra o DevTools (F12) e verifique os logs:
- 🔄 RENDER: Quando componentes re-renderizam
- ⚡ CALCULATION: Quando cálculos pesados executam
- 🔄 CALLBACK: Quando callbacks são criados

### React DevTools Profiler
Use o React DevTools Profiler para análise avançada:
1. Instale a extensão React DevTools
2. Vá para a aba "Profiler"
3. Grave uma sessão enquanto interage com a aplicação
4. Compare os componentes otimizados vs não otimizados

## 🤔 Quando Usar

### useMemo
- ✅ Cálculos pesados (loops complexos, processamento de arrays grandes)
- ✅ Criação de objetos/arrays que são props para componentes memoizados
- ❌ Cálculos simples (operações matemáticas básicas)
- ❌ Valores que mudam frequentemente

### useCallback
- ✅ Funções passadas para componentes filhos memoizados
- ✅ Funções que são dependências de outros hooks
- ✅ Event handlers em listas grandes
- ❌ Funções que mudam frequentemente
- ❌ Funções simples sem otimização necessária

## 🎨 Tecnologias Utilizadas

- **React 18** com hooks modernos
- **TypeScript** para tipagem
- **Vite** como build tool
- **CSS customizado** para estilização
- **Performance API** para medições precisas

## 📝 Exercícios Sugeridos

1. **Modifique as dependências** dos hooks e observe o comportamento
2. **Adicione mais estados** e veja como afeta a performance
3. **Remova os hooks de otimização** e compare os logs
4. **Crie seus próprios exemplos** baseados nos padrões mostrados

## 🔗 Recursos Adicionais

- [Documentação React - useMemo](https://react.dev/reference/react/useMemo)
- [Documentação React - useCallback](https://react.dev/reference/react/useCallback)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools#profiler)
- [Performance Patterns](https://react.dev/learn/render-and-commit)

---

**💡 Dica**: Execute este projeto e experimente com diferentes cenários para entender profundamente como essas otimizações funcionam na prática!
