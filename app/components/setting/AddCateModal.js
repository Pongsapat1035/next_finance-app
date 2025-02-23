"use client"
import ModalBox from "../ModalBox"
export default function AddCateModal({ modalState, closeModal }) {
    return (
        <ModalBox state={modalState} closeModal={closeModal} header="Create category">
            add modal
        </ModalBox>
    )
}