import React, { Fragment } from 'react';
import { Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import {TOAST} from '../../helper';

export const AlertContainer = () => {
    const toaster = useSelector(state => state.ToastReducer);
    
    return (
        <Fragment>
            <div
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 50,
                    width: 400,
                    zIndex: 100,
                    display: toaster.length > 0 ? '' : 'hidden'
                }}
            >
                {toaster && toaster.map((item) => {
                    return (
                        <Toast key={item.toastId} className={`${TOAST.FAIL === item.toastHeader ? 'text-danger' : ''}`} bg='info'>
                            <Toast.Header closeButton={false}>
                                <i className={TOAST.FAIL === item.toastHeader ? 'fas fa-exclamation-circle' : 'fas fa-check-circle'}></i>
                                <strong className="mr-auto">&nbsp;{item.toastHeader}</strong>
                            </Toast.Header>
                            <Toast.Body>{item.toastMessage}</Toast.Body>
                        </Toast>
                    );
                })
                }
            </div>
        </Fragment>
    );
};