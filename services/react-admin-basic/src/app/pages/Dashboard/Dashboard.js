import React from 'react'
import { ContentBox } from '../../styles/AppStyles'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const topQuestions = [
    { label: 'Generate a 3gpp testcase with attach of 5 ue', year: 1994 },
    { label: 'Create a testcase of rrc restablishment', year: 1972 },
  ]
  return (
    <ContentBox>
      <Box sx={{ flexGrow: 1 }}>
        <h6 className='text-blue'>Your AI Assistant</h6>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              size="small"
              options={topQuestions}
              renderInput={(params) => <TextField {...params} label="Hi, How i can help  ?" />}
            />
            <button className='btn btn-sm bg-blue-outline  mt-4'>Submit Request</button>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <Item>
                  <img src='https://img.freepik.com/free-vector/illustration-robot_53876-5576.jpg?w=740&t=st=1687759836~exp=1687760436~hmac=a43923aa97bb8435add70283b188f2f1f28c2d32c3dd32b7109bab779c0ac1b7' alt='chatbot image' height={200} width={200} />
                </Item>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ContentBox>
  )
}

export default Dashboard