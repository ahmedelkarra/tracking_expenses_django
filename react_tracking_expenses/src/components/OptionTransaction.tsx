import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, FormControlLabel, Radio, RadioGroup, TableCell, TextField } from '@mui/material';
import { green, pink } from '@mui/material/colors';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { IsChange } from '../context/IsChange';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: '70%', lg: '60%' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ITransactions {
    id: string;
    title: string;
    price: number;
    transaction_type: string;
}

export default function OptionTransaction({ transaction }: { transaction: ITransactions }) {
    const cookie = new Cookies
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [transactions, setTransactions] = React.useState<ITransactions>({ id: '', title: '', transaction_type: '', price: 0 })
    const isChangeContext = React.useContext(IsChange)
    if (!isChangeContext) {
        throw new Error('this must be boolean')
    }
    const { setIsChange } = isChangeContext
    const handleEdit = () => {
        if (transactions.price && transactions.title && transactions.transaction_type) {
            console.log(transactions)
            axios.put(`/api/transactions/${transactions?.id}`, transactions, { headers: { 'X-CSRFToken': cookie.get('csrftoken') } })
                .then((e) => {
                    if (e.data.message) {
                        console.log(e.data.message)
                        setIsChange(true)
                        handleClose()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const handleDelete = () => {
        if (transactions.price && transactions.title && transactions.transaction_type) {
            console.log(transactions)
            axios.delete(`/api/transactions/${transactions?.id}`, { data: transactions, headers: { 'X-CSRFToken': cookie.get('csrftoken') } })
                .then((e) => {
                    if (e.data.message) {
                        console.log(e.data.message)
                        setIsChange(true)
                        handleClose()
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    React.useEffect(() => {
        setTransactions(transaction)
    }, [transaction])
    return (
        <TableCell align="right" sx={{ color: 'white' }}>
            <BorderColorIcon onClick={handleOpen} sx={{ cursor: 'pointer' }} />
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" width={'100%'} textAlign={'center'}>
                        Edit Transaction
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} component={'div'} >
                        <TextField id="filled-basic" label="Title" variant="filled" fullWidth sx={{ marginY: '5px' }} onChange={(e) => setTransactions({ ...transactions, title: e.target.value })} value={transactions?.title} />
                        <TextField
                            onChange={(e) => setTransactions({ ...transactions, price: Number(e.target.value) })}
                            value={transactions?.price}
                            sx={{ marginY: '5px' }}
                            fullWidth
                            id="filled-number"
                            label="Price"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                        <FormControl sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: '5px' }} fullWidth>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="entrance" control={<Radio color='success' onChange={(e) => setTransactions({ ...transactions, transaction_type: e.target.value })} />} label="Entrance" sx={{ color: green[800] }} checked={transactions.transaction_type === 'entrance'} />
                                <FormControlLabel value="exit" control={<Radio color='error' onChange={(e) => setTransactions({ ...transactions, transaction_type: e.target.value })} />} label="Exit" sx={{ color: pink[800] }} checked={transactions.transaction_type === 'exit'} />
                            </RadioGroup>
                        </FormControl>
                    </Typography>
                    <Typography component={'div'} display={'flex'} justifyContent={'center'} alignItems={'center'} margin={'10px 0'}>
                        <Button variant='contained' color='success' sx={{ width: '45%', marginX: '10px' }} onClick={handleEdit}>EDIT</Button>
                        <Button variant='contained' color='error' sx={{ width: '45%', marginX: '10px' }} onClick={handleDelete}>DELETE</Button>
                        <Button variant='contained' color='warning' sx={{ width: '45%', marginX: '10px' }} onClick={handleClose}>Cancel</Button>
                    </Typography>
                </Box>
            </Modal>
        </TableCell>
    );
}
