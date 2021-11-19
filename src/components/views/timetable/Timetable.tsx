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
import './Timetable.css'

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

const rows = [
  createData('Test', 'Test', 'Test', 'Test', 'Test', 'Test'),
];

const openAddLessonWindow = () => {
  console.log(document.querySelector(`.addLessonWindow`));
  document.querySelector<HTMLElement>('.addLessonWindow').style.display = 'block';
};

const closeAddLessonWindow = () => {
  console.log(document.querySelector(`.addLessonWindow`));
  document.querySelector<HTMLElement>('.addLessonWindow').style.display = 'none';
};

export default function Timetable() {
	return(
    <div>
      <div className='addLessonWindow'>
        <Button onClick={closeAddLessonWindow}>Close</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Lekcja</StyledTableCell>
              <StyledTableCell align="right">Poniedziałek</StyledTableCell>
              <StyledTableCell align="right">Wtorek</StyledTableCell>
              <StyledTableCell align="right">Środa</StyledTableCell>
              <StyledTableCell align="right">Czwartek</StyledTableCell>
              <StyledTableCell align="right">Piątek</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.lesson}>
                <StyledTableCell component="th" scope="row">
                  {row.lesson}
                </StyledTableCell>
                <StyledTableCell align="right">{row.monday}</StyledTableCell>
                <StyledTableCell align="right">{row.tuesday}</StyledTableCell>
                <StyledTableCell align="right">{row.wednesday}</StyledTableCell>
                <StyledTableCell align="right">{row.thursday}</StyledTableCell>
                <StyledTableCell align="right">{row.friday}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <div className="addLessonButton">
        <Button onClick={openAddLessonWindow} variant="contained">Dodaj lekcję</Button>
      </div>
    </div>
  );
};
