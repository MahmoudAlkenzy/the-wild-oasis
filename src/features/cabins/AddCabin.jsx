import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>
        </Modal>
    );
}
// function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//         <Row>
//             <Button
//                 onClick={() => setIsOpenModal((state) => !state)}
//                 variation="primary"
//                 size="medium"
//             >
//                 Add new cabin
//             </Button>

//             {isOpenModal && (
//                 <Modal
//                     isClose={() => {
//                         setIsOpenModal(false);
//                     }}
//                 >
//                     <CreateCabinForm
//                         isCloseModal={() => {
//                             setIsOpenModal(false);
//                         }}
//                     />
//                 </Modal>
//             )}
//         </Row>
//     );
// }

export default AddCabin;
