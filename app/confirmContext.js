"use client"
import { createContext, useContext, useState } from "react";
import ConfirmModal from "./components/ConfirmModal";

const ConfirmContext = createContext()

export function ConfirmProvider({ children }) {
    const [confirmModalState, setConfirmModalState] = useState(false)

    const [modalData, setModalData] = useState({
        header: "",
        description: "",
        action: () => { }
    })

    const handleConfirm = (header, description, action) => {
        setConfirmModalState(true)
        setModalData((prev) => ({
            ...prev,
            header,
            description,
            action
        }))
    }

    return (
        <ConfirmContext.Provider value={{ handleConfirm }}>
            {children}
            <ConfirmModal
                state={confirmModalState}
                closeState={() => setConfirmModalState(false)}
                header={modalData.header}
                description={modalData.description}
                action={modalData.action}></ConfirmModal>
        </ConfirmContext.Provider>
    )
}

export const useConfirm = () => useContext(ConfirmContext)