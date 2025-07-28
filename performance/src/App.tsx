import CombinedDemo from './components/CombinedDemo'
import { PerformanceProvider } from './contexts/PerformanceContext'

/**
 * Componente principal da aplicação
 * Mostra apenas a demonstração combinada de useMemo e useCallback
 * Envolvido no PerformanceProvider para compartilhar logs entre componentes
 */
function App() {
  return (
    <PerformanceProvider>
      <div>
        <h1>React Performance Demo</h1>
        <p>Demonstração prática de useMemo e useCallback com medição de performance</p>
        
        {/* Renderiza apenas o componente de demonstração combinada */}
        <CombinedDemo />
      </div>
    </PerformanceProvider>
  )
}

export default App
