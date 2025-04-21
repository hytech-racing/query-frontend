import { useState } from "react";
import { Modal, Button } from "@mantine/core";

// Get feedback
export default function Feedback() {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleClose = () => {
        setShowModal(false);
    };
    return (
    <>
        <Button color="red" onClick={toggleModal}>Feedback</Button>
        
        <Modal
            opened={showModal}
            onClose={handleClose}
            title="Please Give Us FeedBack!"
            centered
            style={{ textAlign: "center" }}
        >
            <iframe
                width="700px"
                height="700px"
                src="https://forms.office.com/Pages/ResponsePage.aspx?id=u5ghSHuuJUuLem1_Mvqgg7diLk8hlNxLmcRlzu1tHg1UMTdFSUZNVktDMUgwVEsyVldRQ1M5RklIQSQlQCN0PWcu&embed=true"
                frameBorder="0"
                marginWidth={0}
                marginHeight={0}
                style={{ border: "none", maxWidth: "100%", maxHeight: "100vh" }}
                allowFullScreen
            />
        </Modal>
    </>
    )
  }