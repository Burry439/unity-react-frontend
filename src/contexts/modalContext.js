import React, {createContext, useState} from 'react';


export const ModalContext = createContext();


const initialState = {isShowModal : false, component:""};

const ModalContextProvider = (props) => {
    const [modal, setModal] = useState(initialState)
    
    const openModal = (component) =>{
        setModal({
            isShowModal : true,
            component :  component
        })
    }

    const closeModal = () =>{
        setModal({
            isShowModal : false,
            component : ""
        })
    }

    return(
        <ModalContext.Provider value={{modal, openModal,closeModal }}>
            {props.children}
        </ModalContext.Provider>
    )
}

export default ModalContextProvider


