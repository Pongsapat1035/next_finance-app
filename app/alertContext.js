"use client"
import { createContext, useContext, useState } from "react";
import AlertBadge from "./components/Alert";

const AlertContext = createContext()

export function AlertProvider({ children }) {
    const [showAlert, setShowAlert] = useState(false)

    const [alertConfig, setAlertConfig] = useState({
        type: '',
        message: ''
    })

    const handleAlert = (type, message) => {
        setShowAlert(true)
        setAlertConfig((prevState) => ({
            ...prevState,
            type,
            message
        }))
        setTimeout(() => {
            setShowAlert(false)
        }, 3000);
    }

    return (
        <AlertContext.Provider value={{ handleAlert }}>
            {children}
            {showAlert !== false ? <AlertBadge data={alertConfig} handleFunction={() => setShowAlert(false)}></AlertBadge> : ''}
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext)