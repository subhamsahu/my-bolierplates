
import Modal from '../Modal/Modal';
import Spinner from './Spinner';

const TopSpinner = (props) => {
    return (
        <div>
            <Modal
                open={props.open}>
                <Spinner/>
            </Modal>
        </div>
    )
}

export default TopSpinner