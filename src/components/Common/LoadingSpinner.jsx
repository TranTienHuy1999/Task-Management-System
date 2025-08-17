import React from 'react'
import '../../styles/LoadingSpinner.css';

export default function LoadingSpinner({ size = 'medium' }) {
    return (
        <div className={`loading-spinner ${size}`}></div>
    )
}
