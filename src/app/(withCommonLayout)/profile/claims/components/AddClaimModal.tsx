import LFInput from '@/components/Forms/LFInput';
import LFForm from '@/components/Forms/PHForm';
import LFModal from '@/components/LFModal/LFModal';
import { Button, Grid } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
const AddClaimModal = ({ open, setOpen }: TProps) => {
    const handleFormSubmit = async (values: FieldValues) => {
        /*
        const data = modifyPayload(values);
        try {
          const res = await createSpecialty(data).unwrap();
          // console.log(res);
          if (res?.id) {
            toast.success("Specialty created successfully!!");
            setOpen(false);
          }
        } catch (err: any) {
          console.error(err.message);
        }
        */
      };

    return (
        <LFModal open={open} setOpen={setOpen} title="Add a claim">
            <LFForm onSubmit={handleFormSubmit}>
                <Grid container spacing={2}>
                <Grid item md={6}>
                    <LFInput name="title" label="Title" />
                </Grid>
                <Grid item md={6}>
                    <LFInput name="file" label="Upload File" />
                </Grid>
                </Grid>
                <Button sx={{ mt: 1 }} type="submit">
                    Claim
                </Button>
            </LFForm>
        </LFModal>
    );
};

export default AddClaimModal;