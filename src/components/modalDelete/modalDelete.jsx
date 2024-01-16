import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "../../config/axios";
import { toast } from 'react-toastify';


const ModalDelete = ({ handleClose, show, id }) => {
    const handleDelete = async () => {
        const res = await axios.delete(`/post/${id}`);
        toast.success(res.data.EM);
        
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete this post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDelete;