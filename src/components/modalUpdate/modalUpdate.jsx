import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "../../config/axios";
import { toast } from 'react-toastify';
import { AuthContext } from "../../context/AuthContext";


const ModalUpdate = ({ handleClose, show }) => {
    const { dispatch ,user} = useContext(AuthContext);
    const [city, setCity] = useState(user.city ? user.city : '');
    const [from, setFrom] = useState(user.from ? user.from : '');
    const [relationship, setRelationship] = useState(user.relationship);

    const handleUpdate = async () => {
        const res = await axios.put(`/user/${user.id}`, { id: user.id, city: city, from: from, relationship: relationship })
        dispatch({ type: "UPDATE_USER", payload: { city: city, from: from, relationship: relationship } });
        
        handleClose();
        toast.success(res.data.EM);
        setCity(user.city ? user.city : '');
        setFrom(user.from ? user.from : '');
        setRelationship(user.relationship);
        console.log(user);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input className="form-control" id="city" onChange={e => setCity(e.target.value)} value={city} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="From" className="form-label">From</label>
                            <input className="form-control" id="From" onChange={e => setFrom(e.target.value)} value={from} />
                        </div>

                        <select className="form-select" onChange={(e) => setRelationship(e.target.value)} value={relationship}>
                            <option value="1" >Single</option>
                            <option value="2">Marry</option>
                            <option value="3">Dating</option>
                        </select>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdate()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdate;