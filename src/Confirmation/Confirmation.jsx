import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosClient from '../api/axiosClient';
import { FAV_URL } from '../api/apiURLs';
import { toast } from 'react-toastify';

export default function Confirmation({


  show,
  title = "Confirmation",
  message = "Are you sure?",
  onConfirm,
  onClose,
}) 


 
{
     return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{message}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

