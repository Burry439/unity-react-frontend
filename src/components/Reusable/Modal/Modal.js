import React, { useContext,useEffect,useState} from 'react';
import {ModalContext} from '../../../contexts/modalContext';
import Modal from "react-modal";
import { useTranslation } from 'react-i18next';
import "./modal.scss"

Modal.setAppElement('#root')
const CModal = () => {
    const {modal, closeModal} = useContext(ModalContext)     
    const { i18n } = useTranslation();
    const direction = i18n.language == "en" ? "ltr" : "rtl"
    return ( 
        <div>      
             
            <Modal 
            style={{overlay :{borderColor: "grey"},content : {
                direction : direction,
                height:"fit-content",
                width: "fit-content",
                position : "fixed",
                margin: "auto",
                left: "0",
                right: "0",
                padding : "15px",
                zIndex: "99999"

             } 
            }} 
            isOpen={modal.isShowModal}
            onRequestClose={() => closeModal() }
            >
                <div className="close-button-container">
                 <div className="close-button" onClick={() => closeModal()}>X</div>
                </div>
                <React.Fragment>
             {modal.component != "" ? <modal.component/> : <></>}
              </React.Fragment>
               
            </Modal>
        </div> 
     ) 
}
 
export default CModal;