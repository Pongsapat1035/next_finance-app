"use client"

import ModalBox from "../ModalBox"

export default function EditCategoryModal ({ modalState, closeModal }){
    return (
        <ModalBox state={modalState} closeModal={closeModal}>
            Hello
        </ModalBox>
    )
}
