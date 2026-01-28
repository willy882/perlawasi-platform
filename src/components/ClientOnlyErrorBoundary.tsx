'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
}

class ClientOnlyErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            // Fallback UI si hay error
            return (
                this.props.fallback || (
                    <div className="flex items-center justify-center w-full h-full relative p-4">
                        {/* Fallback silencioso: Imagen estática del polo si falla el 3D */}
                        <img
                            src="/images/polo_fallback.png"
                            alt="Polo Mockup"
                            className="w-full h-full object-contain drop-shadow-xl opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>
                )
            )
        }

        return this.props.children
    }
}

export default ClientOnlyErrorBoundary
