"use client"
import { createContext, useContext, useState } from "react";
import AlertBadge from "./components/Alert";

const AlertContext = createContext()

export function AlertProvider({ children }) {
    const [showAlert, setShowAlert] = useState(false)

    const [alertConfig, setAlertConfig] = useState({
        type: '',
        message: ''
    }
    )

    const handleAlert = (type, message) => {
        console.log(type, message)
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
    console.log(showAlert)
    const closeAlert = () => setShowAlert(false)

    return (
        <AlertContext.Provider value={{ handleAlert }}>
            {children}
            {
                showAlert !== false ? <AlertBadge data={alertConfig} handleFunction={closeAlert}></AlertBadge> : ''
            }
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext)