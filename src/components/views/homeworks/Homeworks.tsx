import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './Homeworks.css'
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TimePicker from '@mui/lab/TimePicker';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  monday: string,
  tuesday: string,
  wednesday: string,
  thursday: string,
	friday: string,
) {
  return { monday, tuesday, wednesday, thursday, friday};
}

var rows: Array<any> = [];

const openAddHomeworkWindow = () => {
  console.log(document.querySelector(`.addHomeworkWindow`));
  document.querySelector<HTMLElement>('.addHomeworkWindow').style.display = 'block';
};

const closeAddHomeworkWindow = () => {
  console.log(document.querySelector(`.addHomeworkWindow`));
  document.querySelector<HTMLElement>('.addHomeworkWindow').style.display = 'none';
};


export default function Homeworks() {
 React.useEffect(() => {
    fetchHomeworks();
  }, []);

  const fetchHomeworks = () => {
    rows = [];
    var homeworks = localStorage.getItem('homeworks');
    if (homeworks == null) {
      homeworks= '[]';
    }
    var homeworksFinal: Array<JSON> = JSON.parse(homeworks);

    for (var i = 0; i < homeworksFinal.length; i++) {
      switch((homeworksFinal[i] as any).day) {
        case 'Monday':
          rows.push(createData(
            (homeworksFinal[i] as any).subject,
            '',
            '',
            '',
            ''));
          break;

        case 'Tuesday':
          rows.push(createData(
            '',
            (homeworksFinal[i] as any).subject,
            '',
            '',
            ''));
          break;

        case 'Wednesday':
          rows.push(createData(
            '',
            '',
            (homeworksFinal[i] as any).subject,
            '',
            ''));
          break;

        case 'Thursday':
          rows.push(createData(
            '',
            '',
            '',
            (homeworksFinal[i] as any).subject,
            ''));
          break;

        case 'Friday':
          rows.push(createData(
            '',
            '',
            '',
            '',
            (homeworksFinal[i] as any).subject));
          break;
      }
    }
  };


  const [subject, setSubject] = React.useState<string | null>();
  const [content, setContent] = React.useState<string | null>();
  const [day, setDay] = React.useState('');

  const handleChangeDay = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };


  const handleChangeSubject = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setSubject((value.target as HTMLInputElement).value);
  };

  const handleChangeContent = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setContent((value.target as HTMLInputElement).value);
  };



  const printDocument = () => {
    window.print();
  };

  const addHomework = () => {
    let newHomework = {
      'subject': subject,
      'day': day,
      'content': content
    };

    var old = localStorage.getItem('homeworks');
    if (old == null) {
      old = '[]';
    }
    var homeworks = JSON.parse(old);
    homeworks.push(newHomework);
    localStorage.setItem('homeworks', JSON.stringify(homeworks));
    closeAddHomeworkWindow();
    fetchHomeworks();
  };

	return(
    fetchHomeworks(),
    <div>
      <div className='addHomeworkWindow'>
        <IconButton className="closeAddHomeworkWindow" onClick={closeAddHomeworkWindow}><Close style={{ color: "red" }} /></IconButton>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="addHomeworkForm"
        >
        <div className="addHomeworkTitle"><h1>Dodaj zadanie domowe</h1></div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Select
          labelId="label"
          label="Dzień tygodnia"
          onChange={handleChangeDay}
        >
          <MenuItem value={"Monday"}>Poniedziałek</MenuItem>
          <MenuItem value={"Tuesday"}>Wtorek</MenuItem>
          <MenuItem value={"Wednesday"}>Środa</MenuItem>
          <MenuItem value={"Thursday"}>Czwartek</MenuItem>
          <MenuItem value={"Friday"}>Piątek</MenuItem>
        </Select>
          <TextField
            id="outlined-required"
            label="Przedmiot"
            onChange={handleChangeSubject}
          />
          <TextField
            id="outlined-required"
            label="Treść"
            onChange={handleChangeContent}
          />
          <br />
          <Button className="addHomeworkWindowButton" onClick={addHomework} variant="contained">Dodaj zadanie domowe</Button>
        </LocalizationProvider>
        </Box>
      </div>
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Poniedziałek</StyledTableCell>
              <StyledTableCell>Wtorek</StyledTableCell>
              <StyledTableCell>Środa</StyledTableCell>
              <StyledTableCell>Czwartek</StyledTableCell>
              <StyledTableCell>Piątek</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow>
                <StyledTableCell>{row.monday}</StyledTableCell>
                <StyledTableCell>{row.tuesday}</StyledTableCell>
                <StyledTableCell>{row.wednesday}</StyledTableCell>
                <StyledTableCell>{row.thursday}</StyledTableCell>
                <StyledTableCell>{row.friday}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div className="addHomeworkButton">
      <Button onClick={openAddHomeworkWindow} variant="contained">Dodaj zadanie domowe</Button>
      </div>
      <div>
        <Button variant="contained" onClick={printDocument}>Drukuj</Button>
      </div>
    </div>
    </div>
	);
};
