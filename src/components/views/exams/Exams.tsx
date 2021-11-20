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
import './Exams.css'
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

const openAddExamWindow = () => {
  console.log(document.querySelector(`.addExamWindow`));
  document.querySelector<HTMLElement>('.addExamWindow').style.display = 'block';
};

const closeAddExamWindow = () => {
  console.log(document.querySelector(`.addExamWindow`));
  document.querySelector<HTMLElement>('.addExamWindow').style.display = 'none';
};


export default function Exams() {
  React.useEffect(() => {
    fetchExams();
  }, []);

  const printDocument = () => {
    window.print();
  };

  const fetchExams = () => {
    rows = [];
    var examList = localStorage.getItem('exams');
    if (examList == null) {
      examList = '[]';
    }
    var exams: Array<JSON> = JSON.parse(examList);

    for (var i = 0; i < exams.length; i++) {
      switch((exams[i] as any).day) {
        case 'Monday':
          rows.push(createData(
            (exams[i] as any).subject,
            '',
            '',
            '',
            ''));
          break;

        case 'Tuesday':
          rows.push(createData(
            '',
            (exams[i] as any).subject,
            '',
            '',
            ''));
          break;

        case 'Wednesday':
          rows.push(createData(
            '',
            '',
            (exams[i] as any).subject,
            '',
            ''));
          break;

        case 'Thursday':
          rows.push(createData(
            '',
            '',
            '',
            (exams[i] as any).subject,
            ''));
          break;

        case 'Friday':
          rows.push(createData(
            '',
            '',
            '',
            '',
            (exams[i] as any).subject));
          break;
      }
    }
  };

  const [day, setDay] = React.useState('');

  const handleChangeDay = (event: SelectChangeEvent) => {
    setDay(event.target.value as string);
  };
  const [startLesson, setStartLesson] = React.useState<Date | null>(
      new Date('1970-01-01T00:00:00'),
  );

  const [endLesson, setEndLesson] = React.useState<Date | null>(
      new Date('1970-01-01T00:00:45'),
  );

  const [teacher, setTeacher] = React.useState<string | null>();

  const [room, setRoom] = React.useState<string | null>();

  const [lesson, setLesson] = React.useState<string | null>();

  const [subject, setSubject] = React.useState<string | null>();

  const handleChangeStartLesson = (newValue: Date | null) => {
    setStartLesson(newValue);
  };

  const handleChangeEndLesson = (newValue: Date | null) => {
    setEndLesson(newValue);
  };

  const handleChangeTeacher = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setTeacher((value.target as HTMLInputElement).value);
  };

  const handleChangeRoom = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setRoom((value.target as HTMLInputElement).value);
  };

  const handleChangeLesson = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setLesson((value.target as HTMLInputElement).value);
  };

  const handleChangeSubject = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setSubject((value.target as HTMLInputElement).value);
  };

  const addExam = () => {
    let newExam = {
      'teacher': teacher,
      'room': room,
      'lesson': lesson,
      'subject': subject,
      'day': day
    };

    var old = localStorage.getItem('exams');
    if (old == null) {
      old = '[]';
    }
    var exams = JSON.parse(old);
    exams.push(newExam);
    localStorage.setItem('exams', JSON.stringify(exams));
    closeAddExamWindow();
    fetchExams();
  };
	return(
    fetchExams(),
    <div>
      <div className='addExamWindow'>
        <IconButton className="closeAddExamWindow" onClick={closeAddExamWindow}><Close style={{ color: "red" }} /></IconButton>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="addExamForm"
        >
        <div className="addExamTitle"><h1>Dodaj sprawdzian</h1></div>
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
            label="Temat"
            onChange={handleChangeLesson}
          />
          <TextField
            id="outlined-required"
            label="Przedmiot"
            onChange={handleChangeSubject}
          />
          <TextField
            id="outlined-required"
            label="Sala"
            onChange={handleChangeRoom}
          />
          <TextField
            id="outlined-required"
            label="Nauczyciel"
            onChange={handleChangeTeacher}
          />
          <br />
          <Button className="addLessonWindowButton" onClick={addExam} variant="contained">Dodaj sprawdzian</Button>
        </LocalizationProvider>
        </Box>
      </div>
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
      <div className="addExamButton">
      <Button onClick={openAddExamWindow} variant="contained">Dodaj sprawdzian</Button>
      </div>
      <div>
        <Button variant="contained" onClick={printDocument}>Drukuj</Button>
      </div>
    </div>
	);
};
