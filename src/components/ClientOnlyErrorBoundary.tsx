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
                    <div className="flex items-center justify-center w-full h-full min-h-[300px] bg-gray-50 rounded-3xl p-8 text-center">
                        <div className="text-gray-400">
                            <span className="text-4xl block mb-2">👕</span>
                            <p className="text-sm">Vista 3D no disponible temporalmente</p>
                        </div>
                    </div>
                )
            )
        }

        return this.props.children
    }
}

export default ClientOnlyErrorBoundary
