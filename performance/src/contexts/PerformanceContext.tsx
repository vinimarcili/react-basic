import React, { createContext, useContext, useRef, useCallback, useState } from 'react'

/**
 * Interface que define a estrutura de um log de performance
 */
export interface PerformanceLog {
  timestamp: number
  type: 'render' | 'calculation' | 'callback'
  component: string
  duration?: number
  details?: string
}

/**
 * Interface do contexto de performance
 */
interface PerformanceContextType {
  logRender: (component: string, details?: string) => void
  logCalculation: (component: string, duration: number, details?: string) => void
  logCallback: (component: string, details?: string) => void
  measureCalculation: <T>(component: string, fn: () => T, description: string) => T
  getLogs: () => PerformanceLog[]
  getStats: () => {
    totalLogs: number
    totalRenders: number
    totalCalculations: number
    totalCalculationTime: number
    avgCalculationTime: number
    componentCounts: Record<string, number>
    topComponents: [string, number][]
    renderCount: number
  }
  clearLogs: () => void
  getRenderCount: () => number
}

const PerformanceContext = createContext<PerformanceContextType | null>(null)

/**
 * Provider do contexto de performance
 */
export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const logs = useRef<PerformanceLog[]>([])
  const renderCount = useRef(0)
  const [, setUpdateTrigger] = useState(0) // Para forçar re-renders apenas quando necessário

  const triggerUpdate = useCallback(() => {
    // Só força update a cada 5 logs para reduzir re-renders
    if (logs.current.length % 5 === 0) {
      setUpdateTrigger(prev => prev + 1)
    }
  }, [])

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
    // Não força update a cada log para evitar loops infinitos
  }, [])

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
    triggerUpdate() // Só atualiza para cálculos (mais importantes)
  }, [triggerUpdate])

  const logCallback = useCallback((component: string, details?: string) => {
    const log: PerformanceLog = {
      timestamp: Date.now(),
      type: 'callback',
      component,
      details
    }
    logs.current.push(log)
    console.log(`🔄 CALLBACK: ${component} - ${details}`)
    // Não força update para callbacks para evitar loops
  }, [])

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

  const getLogs = useCallback(() => [...logs.current], [])

  const getStats = useCallback(() => {
    const allLogs = logs.current

    const renderLogs = allLogs.filter(log => log.type === 'render')
    const calculationLogs = allLogs.filter(log => log.type === 'calculation')

    const componentCounts = allLogs.reduce((acc, log) => {
      acc[log.component] = (acc[log.component] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const totalCalculationTime = calculationLogs.reduce((sum, log) =>
      sum + (log.duration || 0), 0
    )

    const avgCalculationTime = calculationLogs.length > 0
      ? totalCalculationTime / calculationLogs.length
      : 0

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

  const clearLogs = useCallback(() => {
    logs.current = []
    renderCount.current = 0
    setUpdateTrigger(prev => prev + 1) // Força update apenas quando limpa
  }, [])

  const getRenderCount = useCallback(() => renderCount.current, [])

  const value = {
    logRender,
    logCalculation,
    logCallback,
    measureCalculation,
    getLogs,
    getStats,
    clearLogs,
    getRenderCount
  }

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  )
}

/**
 * Hook para usar o contexto de performance
 */
export function usePerformanceLogger() {
  const context = useContext(PerformanceContext)
  if (!context) {
    throw new Error('usePerformanceLogger deve ser usado dentro de um PerformanceProvider')
  }
  return context
}
