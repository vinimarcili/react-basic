import { useState, useMemo, useCallback, useEffect, memo } from 'react'
import { usePerformanceLogger } from '../contexts/PerformanceContext'

/**
 * Função que simula um processamento pesado e complexo
 * Filtra itens por texto e ordena por ordem alfabética
 * @param items - Array de strings para processar
 * @param filter - Texto para filtrar os itens
 * @param sortOrder - Ordem de classificação ('asc' ou 'desc')
 * @returns Array filtrado e ordenado
 */
function processItems(items: string[], filter: string, sortOrder: 'asc' | 'desc'): string[] {
  console.log('🔄 Processando lista...')
  
  // Simula processamento pesado com loop desnecessário
  // Em aplicações reais, isso seria cálculos complexos, transformações de dados, etc.
  for (let i = 0; i < 100000; i++) {
    Math.random()
  }
  
  // Filtra itens que contêm o texto de busca (case-insensitive)
  const filtered = items.filter(item => 
    item.toLowerCase().includes(filter.toLowerCase())
  )
  
  // Ordena os itens filtrados de acordo com a ordem especificada
  return filtered.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.localeCompare(b)
    } else {
      return b.localeCompare(a)
    }
  })
}

// Lista de exemplo com frutas para demonstração
const SAMPLE_ITEMS = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape',
  'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Papaya', 'Quince',
  'Raspberry', 'Strawberry', 'Tangerine', 'Watermelon', 'Blueberry',
  'Pineapple', 'Avocado', 'Coconut', 'Dragonfruit', 'Guava'
]

/**
 * Componente de item individual da lista
 * Usa React.memo para evitar re-renders desnecessários
 * Só re-renderiza se as props (item, onRemove, index) mudarem
 */
const ListItem = memo(function ListItem({ 
  item, 
  onRemove,
  index 
}: { 
  item: string
  onRemove: (index: number) => void
  index: number 
}) {
  const { logRender } = usePerformanceLogger()
  
  // Log apenas quando o componente monta ou suas props mudam
  useEffect(() => {
    logRender('ListItem', `${item} - ${index}`)
  }, [logRender, item, index])

  return (
    <div style={{ 
      padding: '0.5rem', 
      margin: '0.25rem', 
      border: '1px solid #333',
      borderRadius: '4px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{item}</span>
      <button 
        onClick={() => onRemove(index)} 
        className="button"
        style={{ fontSize: '0.8em', padding: '0.25rem 0.5rem' }}
      >
        ❌
      </button>
    </div>
  )
})

/**
 * Componente SEM otimizações de performance
 * Demonstra os problemas de performance quando não usamos useMemo e useCallback
 */
function UnoptimizedComponent() {
  // Estados do componente
  const [items, setItems] = useState([...SAMPLE_ITEMS])
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [counter, setCounter] = useState(0) // Estado que não deveria afetar a lista
  const { logRender, measureCalculation } = usePerformanceLogger()

  // Log apenas quando o estado muda, não a cada render
  useEffect(() => {
    logRender('UnoptimizedComponent', `filter: ${filter}, sort: ${sortOrder}, counter: ${counter}`)
  }, [logRender, filter, sortOrder, counter])

  // ❌ PROBLEMA: Processa a lista a cada render, mesmo quando counter muda
  // Isso acontece porque não estamos usando useMemo
  const processedItems = measureCalculation(
    'UnoptimizedComponent',
    () => processItems(items, filter, sortOrder),
    'Processando lista sem useMemo'
  )

  // ❌ PROBLEMA: Função é recriada a cada render
  // Isso causa re-renders desnecessários nos componentes ListItem (mesmo com memo)
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="comparison-item unoptimized">
      <h3>❌ SEM Otimizações</h3>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Filtrar frutas..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input"
        />
        <button 
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="button"
        >
          Ordem: {sortOrder === 'asc' ? '⬆️' : '⬇️'}
        </button>
        {/* Este botão muda um estado que NÃO deveria afetar a lista */}
        <button 
          onClick={() => setCounter(c => c + 1)}
          className="button"
        >
          Counter: {counter}
        </button>
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {processedItems.map((item, index) => (
          <ListItem 
            key={`${item}-${index}`}
            item={item} 
            onRemove={removeItem} // Função é recriada a cada render
            index={index}
          />
        ))}
      </div>

      <div className="stats">
        <div>Items: {processedItems.length}</div>
        <div>⚠️ Lista processada a cada render</div>
        <div>⚠️ Função removeItem recriada sempre</div>
      </div>
    </div>
  )
}

/**
 * Componente COM otimizações de performance
 * Demonstra como usar useMemo e useCallback corretamente
 */
function OptimizedComponent() {
  // Estados do componente (idênticos ao componente não otimizado)
  const [items, setItems] = useState([...SAMPLE_ITEMS])
  const [filter, setFilter] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [counter, setCounter] = useState(0) // Estado que não deveria afetar a lista
  const { logRender, measureCalculation } = usePerformanceLogger()

  // Log apenas quando o estado muda, não a cada render
  useEffect(() => {
    logRender('OptimizedComponent', `filter: ${filter}, sort: ${sortOrder}, counter: ${counter}`)
  }, [logRender, filter, sortOrder, counter])

  // ✅ SOLUÇÃO: useMemo para otimizar o processamento da lista
  // Só recalcula quando items, filter ou sortOrder mudam
  // Quando counter muda, a lista não é reprocessada!
  const processedItems = useMemo(() => {
    return measureCalculation(
      'OptimizedComponent',
      () => processItems(items, filter, sortOrder),
      'Processando lista com useMemo'
    )
  }, [items, filter, sortOrder]) // Removida measureCalculation das dependências

  // ✅ SOLUÇÃO: useCallback para manter a função estável
  // A função só é recriada se suas dependências mudarem (neste caso, nunca)
  // Isso permite que React.memo funcione corretamente nos componentes ListItem
  const removeItem = useCallback((index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }, []) // Array vazio = função nunca muda

  return (
    <div className="comparison-item optimized">
      <h3>✅ COM useMemo + useCallback</h3>
      
      <div className="controls">
        <input
          type="text"
          placeholder="Filtrar frutas..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input"
        />
        <button 
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="button"
        >
          Ordem: {sortOrder === 'asc' ? '⬆️' : '⬇️'}
        </button>
        {/* Este botão muda um estado que NÃO afeta a lista (graças ao useMemo) */}
        <button 
          onClick={() => setCounter(c => c + 1)}
          className="button"
        >
          Counter: {counter}
        </button>
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {processedItems.map((item, index) => (
          <ListItem 
            key={`${item}-${index}`}
            item={item} 
            onRemove={removeItem} // Função estável graças ao useCallback
            index={index}
          />
        ))}
      </div>

      <div className="stats">
        <div>Items: {processedItems.length}</div>
        <div>✅ useMemo evita reprocessamento</div>
        <div>✅ useCallback mantém função estável</div>
      </div>
    </div>
  )
}

/**
 * Componente que exibe os logs de performance
 * Mostra estatísticas resumidas e os últimos logs detalhados
 */
function CombinedPerformanceLogs() {
  const { getLogs, getStats, clearLogs } = usePerformanceLogger()
  const [, forceUpdate] = useState(0)
  
  // Obtém dados atualizados diretamente do contexto
  const recentLogs = getLogs().slice(-15)
  const stats = getStats()
  
  const refreshLogs = () => {
    forceUpdate(prev => prev + 1)
  }
  
  return (
    <div className="performance-log">
      <h4>📊 Logs de Performance - Resumo Executivo</h4>
      
      {/* Estatísticas em destaque */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        padding: '1rem',
        background: '#0a0a0a',
        borderRadius: '8px',
        border: '1px solid #333'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#00ff00' }}>
            {stats.totalRenders}
          </div>
          <div style={{ fontSize: '0.9em', color: '#ccc' }}>Total Re-renders</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ff6b6b' }}>
            {stats.totalCalculations}
          </div>
          <div style={{ fontSize: '0.9em', color: '#ccc' }}>Cálculos Pesados</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#ffa500' }}>
            {stats.totalCalculationTime}ms
          </div>
          <div style={{ fontSize: '0.9em', color: '#ccc' }}>Tempo Total</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#646cff' }}>
            {stats.avgCalculationTime}ms
          </div>
          <div style={{ fontSize: '0.9em', color: '#ccc' }}>Média por Cálculo</div>
        </div>
      </div>

      {/* Ranking de componentes */}
      <div style={{ marginBottom: '1rem' }}>
        <h5 style={{ margin: '0 0 0.5rem 0', color: '#646cff' }}>
          🏆 Componentes Mais Ativos: (Total: {stats.totalLogs} eventos)
        </h5>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {stats.topComponents.length > 0 ? stats.topComponents.map(([component, count], index) => (
            <span key={component} style={{
              padding: '0.25rem 0.5rem',
              background: index === 0 ? '#ffa500' : '#333',
              color: index === 0 ? '#000' : '#fff',
              borderRadius: '4px',
              fontSize: '0.8em',
              fontWeight: 'bold'
            }}>
              {component}: {count}x
            </span>
          )) : (
            <span style={{ color: '#888', fontSize: '0.9em' }}>
              Nenhuma atividade registrada ainda
            </span>
          )}
        </div>
      </div>

      <button 
        onClick={refreshLogs}
        className="button" 
        style={{ marginRight: '0.5rem', marginBottom: '1rem' }}
      >
        🔄 Atualizar Logs
      </button>
      <button 
        onClick={clearLogs}
        className="button" 
        style={{ marginBottom: '1rem' }}
      >
        🗑️ Limpar Logs ({stats.totalLogs} eventos)
      </button>
      
      {/* Logs detalhados */}
      <div style={{ marginTop: '1rem' }}>
        <h5 style={{ margin: '0 0 0.5rem 0', color: '#646cff' }}>
          📋 Últimos 15 Eventos:
        </h5>
        <pre style={{ 
          fontSize: '0.8em', 
          maxHeight: '200px', 
          overflow: 'auto',
          background: '#000',
          padding: '0.5rem',
          borderRadius: '4px'
        }}>
          {recentLogs.length > 0 ? recentLogs.map((log) => (
            `${new Date(log.timestamp).toLocaleTimeString()} - ${log.component}: ${log.details}\n`
          )).join('') : '📝 Nenhum evento registrado ainda. Interaja com os componentes!'}
        </pre>
      </div>
    </div>
  )
}

/**
 * Componente principal da demonstração
 * Combina useMemo e useCallback em um exemplo prático
 */
export default function CombinedDemo() {
  return (
    <div className="demo-section">
      <h2>🚀 Demonstração Combinada: useMemo + useCallback</h2>
      <p>
        Exemplo real combinando useMemo para otimizar processamento de listas e 
        useCallback para manter funções estáveis. Compare a performance entre 
        as duas implementações.
      </p>
      
      {/* Comparação lado a lado dos componentes */}
      <div className="comparison">
        <UnoptimizedComponent />
        <OptimizedComponent />
      </div>

      {/* Logs de performance */}
      <CombinedPerformanceLogs />

      {/* Instruções e explicações */}
      <div className="card">
        <h3>🎓 Como Interpretar as Estatísticas:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>
            <strong>📊 Total Re-renders:</strong> Número total de vezes que componentes re-renderizaram. 
            Valores altos podem indicar problemas de performance.
          </li>
          <li>
            <strong>🔥 Cálculos Pesados:</strong> Quantas vezes processamentos complexos foram executados. 
            Compare entre as versões otimizada e não otimizada.
          </li>
          <li>
            <strong>⏱️ Tempo Total:</strong> Tempo acumulado gasto em cálculos pesados. 
            Versão otimizada deve ter menor tempo total.
          </li>
          <li>
            <strong>📈 Média por Cálculo:</strong> Tempo médio de cada processamento. 
            Ajuda a identificar operações mais lentas.
          </li>
          <li>
            <strong>🏆 Componentes Mais Ativos:</strong> Ranking de componentes que mais re-renderizam. 
            Primeiro lugar indica possível otimização necessária.
          </li>
        </ul>

        <h3>🧪 Experimentos Recomendados:</h3>
        <ul style={{ textAlign: 'left' }}>
          <li>
            <strong>Teste o Counter:</strong> Clique várias vezes e observe como os "Cálculos Pesados" 
            aumentam apenas no lado esquerdo (sem otimização)
          </li>
          <li>
            <strong>Filtre e Ordenhe:</strong> Ambos os lados devem ter números similares, 
            já que estas operações são necessárias
          </li>
          <li>
            <strong>Remova Itens:</strong> Compare o "Total Re-renders" - lado direito 
            deve ter menos re-renders dos ListItem
          </li>
          <li>
            <strong>Verifique o Ranking:</strong> Componentes não otimizados aparecerão 
            mais frequentemente no topo da lista
          </li>
        </ul>
        
        <h4>🔧 Hooks de Performance Utilizados:</h4>
        <ul style={{ textAlign: 'left' }}>
          <li>
            <strong>useMemo:</strong> Cacheia o resultado do processamento da lista, 
            evitando recálculos quando estados não relacionados mudam
          </li>
          <li>
            <strong>useCallback:</strong> Mantém a função removeItem estável, 
            permitindo que React.memo funcione corretamente
          </li>
          <li>
            <strong>React.memo:</strong> Evita re-renders desnecessários dos 
            componentes ListItem quando suas props não mudam
          </li>
        </ul>

        <h4>🎯 Conceitos Importantes:</h4>
        <ul style={{ textAlign: 'left' }}>
          <li>
            <strong>Dependências:</strong> useMemo e useCallback só executam quando 
            suas dependências mudam
          </li>
          <li>
            <strong>Referencial Equality:</strong> React compara props por referência, 
            não por valor
          </li>
          <li>
            <strong>Otimização Prematura:</strong> Nem sempre é necessário usar esses hooks, 
            meça primeiro!
          </li>
        </ul>
      </div>
    </div>
  )
}
