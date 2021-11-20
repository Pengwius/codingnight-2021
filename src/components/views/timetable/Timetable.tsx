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
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import './Timetable.css'
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
  lesson: string,
  monday: string,
  tuesday: string,
  wednesday: string,
  thursday: string,
	friday: string,
) {
  return { lesson, monday, tuesday, wednesday, thursday, friday};
}
var rows: Array<any> = [];

const openAddLessonWindow = () => {
  console.log(document.querySelector(`.addLessonWindow`));
  document.querySelector<HTMLElement>('.addLessonWindow').style.display = 'block';
};

const closeAddLessonWindow = () => {
  console.log(document.querySelector(`.addLessonWindow`));
  document.querySelector<HTMLElement>('.addLessonWindow').style.display = 'none';
};

const hideDetails = () => {
  console.log(document.querySelector(`.details`));
  document.querySelector<HTMLElement>(`.details`).style.display = 'none';
  //document.querySelector<HTMLElement>(`.details`).innerHTML = `<IconButton className="hideDetails" onClick={hideDetails}><Close style={{ color: "red" }} /></IconButton>`;
};


export default function Timetable() {
  React.useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = () => {
    rows = [];
    var lessons = localStorage.getItem('timetable');
    if (lessons == null) {
      lessons = '[]';
    }
    var timetable: Array<JSON> = JSON.parse(lessons);

    for (var i = 0; i < timetable.length; i++) {
      switch((timetable[i] as any).day) {
        case 'Monday':
          rows.push(createData(
            `${new Date((timetable[i] as any).startTime).toLocaleTimeString()} - ${new Date((timetable[i] as any).endTime).toLocaleTimeString()}`,
            (timetable[i] as any).subject,
            '',
            '',
            '',
            ''));
          break;

        case 'Tuesday':
          rows.push(createData(
            `${new Date((timetable[i] as any).startTime).toLocaleTimeString()} - ${new Date((timetable[i] as any).endTime).toLocaleTimeString()}`,
            '',
            (timetable[i] as any).subject,
            '',
            '',
            ''));
          break;

        case 'Wednesday':
          rows.push(createData(
            `${new Date((timetable[i] as any).startTime).toLocaleTimeString()} - ${new Date((timetable[i] as any).endTime).toLocaleTimeString()}`,
            '',
            '',
            (timetable[i] as any).subject,
            '',
            ''));
          break;

        case 'Thursday':
          rows.push(createData(
            `${new Date((timetable[i] as any).startTime).toLocaleTimeString()} - ${new Date((timetable[i] as any).endTime).toLocaleTimeString()}`,
            '',
            '',
            '',
            (timetable[i] as any).subject,
            ''));
          break;

        case 'Friday':
          rows.push(createData(
            `${new Date((timetable[i] as any).startTime).toLocaleTimeString()} - ${new Date((timetable[i] as any).endTime).toLocaleTimeString()}`,
            '',
            '',
            '',
            '',
            (timetable[i] as any).subject));
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

  const showDetails = () => {
    document.querySelector<HTMLElement>('.details').style.display = 'block';
    //document.querySelector<HTMLElement>('.details').innerHTML += `<br />Nauczyciel: ${teacher} <br />`;
  };


  const printDocument = () => {
    window.print();
  };

  const addLesson = () => {
    let newLesson = {
      'startTime': startLesson,
      'endTime': endLesson,
      'teacher': teacher,
      'room': room,
      'lesson': lesson,
      'subject': subject,
      'day': day
    };

    var old = localStorage.getItem('timetable');
    if (old == null) {
      old = '[]';
    }
    var timetable = JSON.parse(old);
    timetable.push(newLesson);
    localStorage.setItem('timetable', JSON.stringify(timetable));
    closeAddLessonWindow();
    fetchTimetable();
  };

	return(
    fetchTimetable(),
    <div>
      <div className="details">
        <IconButton className="hideDetailsButton" onClick={hideDetails}><Close style={{ color: "red" }} /></IconButton>
        Nauczyciel: <br />
      </div>
      <div className='addLessonWindow'>
        <IconButton className="closeAddLessonWindow" onClick={closeAddLessonWindow}><Close style={{ color: "red" }} /></IconButton>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="addLessonForm"
        >
        <div className="addLessonTitle"><h1>Dodaj lekcje</h1></div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Rozpoczęcie lekcji"
            value={startLesson}
            onChange={handleChangeStartLesson}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Zakończenie lekcji"
            value={endLesson}
            onChange={handleChangeEndLesson}
            renderInput={(params) => <TextField {...params} />}
            />
          <Select
            labelId="label"
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
          <Button className="addLessonWindowButton" onClick={addLesson} variant="contained">Dodaj lekcje</Button>
        </LocalizationProvider>
        </Box>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Lekcja</StyledTableCell>
              <StyledTableCell>Poniedziałek</StyledTableCell>
              <StyledTableCell>Wtorek</StyledTableCell>
              <StyledTableCell>Środa</StyledTableCell>
              <StyledTableCell>Czwartek</StyledTableCell>
              <StyledTableCell>Piątek</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.lesson}>
                <StyledTableCell component="th" scope="row">
                  {row.lesson}
                </StyledTableCell>
                <StyledTableCell><Button onClick={showDetails}>{row.monday}</Button></StyledTableCell>
                <StyledTableCell><Button onClick={showDetails}>{row.tuesday}</Button></StyledTableCell>
                <StyledTableCell><Button onClick={showDetails}>{row.wednesday}</Button></StyledTableCell>
                <StyledTableCell><Button onClick={showDetails}>{row.thursday}</Button></StyledTableCell>
                <StyledTableCell><Button onClick={showDetails}>{row.friday}</Button></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div className="addLessonButton">
        <Button onClick={openAddLessonWindow} variant="contained">Dodaj lekcje</Button>
      </div>
      <div>
        <Button onClick={printDocument} variant="contained">Drukuj</Button>
      </div>
    </div>
  );
};
