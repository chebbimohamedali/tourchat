import "./AddEventModal.css"
import { Modal, useMantineTheme } from '@mantine/core';


function AddEventModal ({modalOpened, setModalOpened}) {
    const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="30%"
      padding="xs"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >     
    <form className="infoForm">
        <h3>Add event</h3>
       {/* <DateInput
          placeholder="Date event"
          maw={400}
          mx="auto"
          size="xs"
       /> */}
       <input type="date" placeholder="Add event" />
           <button className="button infoButton">Share</button>
    </form>
      </Modal>
  );
}

export default AddEventModal