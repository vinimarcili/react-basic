import { useRef, useCallback } from 'react'

/**
 * Interface que define a estrutura de um log de performance
 */
export interface PerformanceLog {
  timestamp: number // Quando o evento aconteceu
  type: 'render' | 'calculation' | 'callback' // Tipo do evento
  component: string // Nome do componente
  duration?: number // Duração em milissegundos (para cálculos)
  details?: string // Detalhes adicionais
}

/**
 * Hook customizado para medir e registrar performance de componentes React
 * Útil para identificar gargalos de performance e otimizações
 */
export function usePerformanceLogger() {
  // Array para armazenar todos os logs (persiste entre renders)
  const logs = useRef<PerformanceLog[]>([])
  // Contador de renders (persiste entre renders)
  const renderCount = useRef(0)

  /**
   * Registra quando um componente faz render
   * @param component Nome do componente
   * @param details Detalhes adicionais sobre o render
   */
  const logRender = useCallback((component: string, details?: string) => {
    renderCount.current += 1
    const log: PerformanceLog = {
      timestamp: Date.now(),
      type: 'render',
      component,
      details: `${details} (Render #${renderCount.current})`
    }
    logs.current.push(log)
    console.log(`🔄 RENDER: ${component} - ${log.details}`)
  }, [])

  /**
   * Registra a duração de um cálculo/operação
   * @param component Nome do componente
   * @param duration Duração em milissegundos
   * @param details Detalhes sobre o cálculo
   */
  const logCalculation = useCallback((component: string, duration: number, details?: string) => {
    const log: PerformanceLog = {
      timestamp: Date.now(),
      type: 'calculation',
      component,
      duration,
      details
    }
    logs.current.push(log)
    console.log(`⚡ CALCULATION: ${component} - ${duration.toFixed(2)}ms - ${details}`)
  }, [])

  /**
   * Registra quando um callback é criado/executado
   * @param component Nome do componente  
   * @param details Detalhes sobre o callback
   */
  const logCallback = useCallback((component: string, details?: string) => {
    const log: PerformanceLog = {
      timestamp: Date.now(),
      type: 'callback',
      component,
      details
    }
    logs.current.push(log)
    console.log(`🔄 CALLBACK: ${component} - ${details}`)
  }, [])

  /**
   * Função utilitária para medir o tempo de execução de um cálculo
   * @param component Nome do componente
   * @param fn Função a ser executada e medida
   * @param description Descrição do que está sendo calculado
   * @returns O resultado da função executada
   */
  const measureCalculation = useCallback(<T,>(
    component: string,
    fn: () => T,
    description: string
  ): T => {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    logCalculation(component, end - start, description)
    return result
  }, [logCalculation])

  /**
   * Retorna uma cópia de todos os logs
   */
  const getLogs = useCallback(() => [...logs.current], [])

  /**
   * Retorna estatísticas resumidas dos logs
   */
  const getStats = useCallback(() => {
    const allLogs = logs.current

    // Contadores por tipo
    const renderLogs = allLogs.filter(log => log.type === 'render')
    const calculationLogs = allLogs.filter(log => log.type === 'calculation')

    // Contadores por componente
    const componentCounts = allLogs.reduce((acc, log) => {
      acc[log.component] = (acc[log.component] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Tempo total de cálculos
    const totalCalculationTime = calculationLogs.reduce((sum, log) =>
      sum + (log.duration || 0), 0
    )

    // Média de tempo por cálculo
    const avgCalculationTime = calculationLogs.length > 0
      ? totalCalculationTime / calculationLogs.length
      : 0

    // Componentes mais renderizados
    const topComponents = Object.entries(componentCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)

    return {
      totalLogs: allLogs.length,
      totalRenders: renderLogs.length,
      totalCalculations: calculationLogs.length,
      totalCalculationTime: Math.round(totalCalculationTime * 100) / 100,
      avgCalculationTime: Math.round(avgCalculationTime * 100) / 100,
      componentCounts,
      topComponents,
      renderCount: renderCount.current
    }
  }, [])

  /**
   * Limpa todos os logs e reseta o contador de renders
   */
  const clearLogs = useCallback(() => {
    logs.current = []
    renderCount.current = 0
  }, [])

  /**
   * Retorna o número total de renders registrados
   */
  const getRenderCount = useCallback(() => renderCount.current, [])

  return {
    logRender,
    logCalculation,
    logCallback,
    measureCalculation,
    getLogs,
    getStats,
    clearLogs,
    getRenderCount
  }
}
