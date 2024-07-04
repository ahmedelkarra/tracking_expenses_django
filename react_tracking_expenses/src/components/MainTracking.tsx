import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import EuroSymbolIcon from '@mui/icons-material/EuroSymbol';
import EuroIcon from '@mui/icons-material/Euro';
import AddTransaction from "./AddTransaction";
import { useContext, useEffect, useState } from "react";
import { TransactionsInfo } from "../context/TransactionsInfo";
import OptionTransaction from "./OptionTransaction";
import { IsUser } from "../context/IsUser";




function MainTracking() {
    const [entrancesCounter, setEntrancesCounter] = useState<number>(0);
    const [exitsCounter, setExitsCounter] = useState<number>(0);
    const [totalCounter, setTotalCounter] = useState<number>(0);
    const transactionsInfoContext = useContext(TransactionsInfo);
    const isUserContext = useContext(IsUser)
    if (!transactionsInfoContext) {
        throw new Error('This must be used within an ITransactions provider');
    }
    if (!isUserContext) {
        throw new Error('this field must be only boolean')
    }
    const { isUser } = isUserContext
    const { transactions } = transactionsInfoContext;

    useEffect(() => {
        let totalEntrances = 0;
        let totalExits = 0;

        transactions.forEach((ele) => {
            const price = Number(ele?.price);
            if (ele.transaction_type.includes("entrance")) {
                totalEntrances += price;
            }
            if (ele.transaction_type.includes("exit")) {
                totalExits += price;
            }
        });

        setEntrancesCounter(totalEntrances);
        setExitsCounter(totalExits);
        setTotalCounter(totalEntrances - totalExits);
    }, [transactions]);
    return (
        <Grid position={'relative'} container height={'100dvh'}>
            <Grid height={'40dvh'} xs={12} item display={'flex'} flexDirection={'column'} >

                <Grid bgcolor={'#333333'} height={'30dvh'} >

                    <Typography component={'div'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} marginY={'30px'}>
                        <Typography component={'h2'} display={'flex'} justifyContent={'center'} alignItems={'center'} color={'white'} sx={{ border: '1px solid green', fontSize: { sx: '15px', md: '20px' }, padding: '10px', borderRadius: '30px', gap: { xs: '5px', md: '10px' } }}>
                            <EuroSymbolIcon color="success" sx={{ fontSize: { xs: '25px', md: '30px' } }} />
                            Transaction
                        </Typography>
                        {isUser && <AddTransaction />}
                    </Typography>
                </Grid>

                <Grid position={'absolute'} display={'flex'} flexWrap={'wrap'} width={'100%'} height={'180px'} justifyContent={'space-around'} alignItems={'center'} top={'25%'} sx={{ flexDirection: { xs: 'row', md: 'row' }, translate: '0% -25%' }}>
                    <Typography component={'div'} bgcolor={'white'} border={'1px solid black'} borderRadius={'10px'} width={'25%'} height={'160px'} padding={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>

                        <Typography component={'div'} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', md: 'start' }, width: '100%' }}>
                            <Typography component={'h2'} sx={{ fontSize: { xs: '15px', md: '20px' } }}>
                                Entrances
                            </Typography>
                            <ArrowCircleUpIcon color="success" sx={{ fontSize: { xs: '28px', md: '35px' } }} />
                        </Typography>

                        <Typography component={'h3'} sx={{ fontSize: '20px', textWrap: 'balance', width: '70px', overflowWrap: 'break-word', textAlign: 'center' }} color={'green'}>
                            &#8364;{entrancesCounter}
                        </Typography>

                    </Typography>

                    <Typography component={'div'} bgcolor={'white'} border={'1px solid black'} borderRadius={'10px'} width={'25%'} height={'160px'} padding={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                        <Typography component={'div'} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', md: 'start' }, width: '100%' }}>
                            <Typography component={'h2'} sx={{ fontSize: { xs: '15px', md: '20px' } }}>
                                Exits
                            </Typography>
                            <ArrowCircleDownIcon color="error" sx={{ fontSize: { xs: '28px', md: '35px' } }} />
                        </Typography>
                        <Typography component={'h3'} sx={{ fontSize: '20px', textWrap: 'balance', width: '70px', overflowWrap: 'break-word', textAlign: 'center' }} color={'red'}>
                            &#8364;{exitsCounter}
                        </Typography>

                    </Typography>

                    <Typography component={'div'} bgcolor={'#50C878'} border={'1px solid black'} borderRadius={'10px'} width={'25%'} height={'160px'} padding={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'start' } }}>
                        <Typography component={'div'} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { xs: 'center', md: 'space-between' }, alignItems: { xs: 'center', md: 'start' }, width: '100%' }}>
                            <Typography component={'h2'} sx={{ fontSize: { xs: '15px', md: '20px' }, color: 'white' }}>
                                Total
                            </Typography>
                            <EuroIcon sx={{ fontSize: { xs: '28px', md: '35px' }, color: 'white' }} />
                        </Typography>

                        <Typography component={'h3'} sx={{ fontSize: '20px', textWrap: 'balance', width: '70px', overflowWrap: 'break-word', textAlign: 'center', color: 'white' }}>
                            &#8364;{totalCounter}
                        </Typography>

                    </Typography>
                </Grid>

            </Grid>
            <Grid container display='flex' flexWrap='wrap' width='100%' justifyContent='space-around' sx={{ flexDirection: { xs: 'row', md: 'row' }, marginY: '10px', alignItems: { xs: 'center', md: 'start' } }}>
                <Grid item sx={{ width: { xs: '98%', md: '70%' } }}>
                    <TableContainer component={Paper} sx={{ maxHeight: '50dvh', overflowY: 'auto' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">Date</TableCell>
                                    <TableCell align="right">Option</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions?.map((ele, index) => (
                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: ele?.transaction_type == "exit" ? 'red' : 'green' }}>
                                        <TableCell component="th" scope="row" sx={{ color: 'white', textWrap: 'balance', overflowWrap: 'break-word' }}>{ele.title}</TableCell>
                                        <TableCell align="right" sx={{ color: 'white' }}>{ele.price}</TableCell>
                                        <TableCell align="right" sx={{ color: 'white' }}>{ele.date}</TableCell>
                                        <OptionTransaction transaction={ele} />
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MainTracking