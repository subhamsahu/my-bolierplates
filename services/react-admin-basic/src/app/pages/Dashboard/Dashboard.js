import React from 'react'
import { ContentBox } from '../../styles/AppStyles'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  minHeight: '600px'
}));


const Dashboard = () => {
  const topQuestions = [
    { label: 'Generate a 3gpp testcase with attach of 5 ue', year: 1994 },
    { label: 'Create a testcase of rrc restablishment', year: 1972 },
  ]
  const handleChange = () => {

  }
  return (
    <ContentBox>
      <Box sx={{ flexGrow: 1 }}>
        <h6 className='text-blue'>Your AI Assistant</h6>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
                options={topQuestions}
                renderInput={(params) => <TextField {...params} label="Hi, How i can help  ?" />}
              />
              <button className='btn btn-sm bg-blue-outline  mt-4'>Submit Request</button>
            </div>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Item sx={{ minHeight: '490px',border:'1px solid #033b8e' }}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">User Stories</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Story1"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="Story1" control={<Radio />} label="Story1" />
                      <FormControlLabel value="Story2" control={<Radio />} label="Story2" />
                      <FormControlLabel value="Story3" control={<Radio />} label="Story3" />
                    </RadioGroup>
                  </FormControl>

                </Item>
              </Grid>
              <Grid item xs={9}>
                <Item sx={{ minHeight: '490px', border:'1px solid #033b8e' }}>

                </Item>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <div style={{ textAlign: 'center' }}>
                <img src='https://img.freepik.com/free-vector/illustration-robot_53876-5576.jpg?w=740&t=st=1687759836~exp=1687760436~hmac=a43923aa97bb8435add70283b188f2f1f28c2d32c3dd32b7109bab779c0ac1b7' alt='chatbot image' height={200} width={200} />
              </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Project</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="{Project}"
                  label="Project"
                  size="small"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Project 1</MenuItem>
                  <MenuItem value={20}>Project 2</MenuItem>
                </Select>
              </FormControl>
              <Box className='mt-4'>
                <h6 className='text-blue'>Previous Requests</h6>
                <Stack>
                  <p>Requests 1</p>
                  <p>Requests 2</p>
                  <p>Requests 3</p>
                  <p>Requests 4</p>
                </Stack>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ContentBox >
  )
}

export default Dashboard