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
import './Events.css'
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const openAddEventWindow = () => {
  console.log(document.querySelector(`.addEventWindow`));
  document.querySelector<HTMLElement>('.addEventWindow').style.display = 'block';
};

const closeAddEventWindow = () => {
  console.log(document.querySelector(`.addEventWindow`));
  document.querySelector<HTMLElement>('.addEventWindow').style.display = 'none';
};

export default function Events() {
  React.useEffect(() => {
    fetchEvents();
  }, []);

  const [username, setUsername] = React.useState<string | null>();

  const handleChangeUsername = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setUsername((value.target as HTMLInputElement).value);
  };

  const [title, setTitle] = React.useState<string | null>();

  const handleChangeTitle = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setTitle((value.target as HTMLInputElement).value);
  };

  const [content, setContent] = React.useState<string | null>();

  const handleChangeContent = (newValue: undefined) => {
    let value = newValue as InputEvent;
    setContent((value.target as HTMLInputElement).value);
  };

  const addEvent = () => {
    const payload = {
      creator: username,
      title: title,
      content: content
    };

    fetch('http://localhost:5000/uploadEvent', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
      closeAddEventWindow();
    };

  const fetchEvents = () => {
    fetch('http://localhost:5000/getEvents')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.response.forEach(event => {
          console.log(event);
          document.querySelector<HTMLElement>('.events').innerHTML += `<div class="event">Od: ${(event as any).creator}<br />Tytuł: ${(event as any).title}<br /><hr />${(event as any).content}<br /><hr />Data: ${(event as any).date}<br /></div>`;
      })
      })
  };

	return(
    <div>
      <div className="events">
      </div>
      <div className="addEventWindow">
        <IconButton className="closeAddEventWindow" onClick={closeAddEventWindow}><Close style={{ color: "red" }} /></IconButton>
        <h1>Dodaj event</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          className="addEventForm"
        >
          <TextField
            id="outlined-required"
            label="Nazwa użytkownika"
            onChange={handleChangeUsername}
          />
          <TextField
            id="outlined-required"
            label="Tytuł"
            onChange={handleChangeTitle}
          />
          <TextareaAutosize
            placeholder="Treść"
            onChange={handleChangeContent}
          />

          <Button className="addEventWindowButton" onClick={addEvent} variant="contained">Dodaj event</Button>
        </Box>
      </div>

      <div className="addEventButton">
        <Button onClick={openAddEventWindow} variant="contained">Dodaj event</Button>
      </div>
    </div>
	);
};
