import React from 'react';
import ReactModal from 'react-modal';

import style from './style';

const Modal = ({ title, children, isOpen, onAfterOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onClose}
      style={style.modal}
    >
      <div style={style.root}>
        <div style={style.title}>{title} <button style={style.closeBtn} onClick={onClose}>x</button></div>
        {children}
      </div>
    </ReactModal>
  );
};

const setAppElement = appElementId => ReactModal.setAppElement(`#${appElementId}`);

export { setAppElement };
export default Modal;
