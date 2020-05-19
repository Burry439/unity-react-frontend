import React, { useContext,useEffect,useState} from 'react';
import {ModalContext} from '../../contexts/modalContext';
import Modal from "react-modal";
import Login from "../Login/login" 

Modal.setAppElement('#root')
const CModal = () => {
    const {modal, closeModal} = useContext(ModalContext)     
    return ( 
        <div>      
            <Modal w
            style={{overlay :{borderColor: "grey"},content : {maxWidth : "100%", top: '50px',
            left: '50px',
            right: '50px',
            bottom: '50px',} }} 
            isOpen={modal.isShowModal}
            onRequestClose={() => closeModal() }
            >
                <React.Fragment>
             {modal.component != "" ? <modal.component/> : <></>}
              </React.Fragment>
                <button onClick={() => closeModal()}></button>
            </Modal>
        </div> 
     ) 
}
 
export default CModal;