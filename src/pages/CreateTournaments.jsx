import { Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ImageUpload from 'image-upload-react'
import 'image-upload-react/dist/index.css'
import StartIconButton from '../components/Button/StartIconButton';
import { Add, ClearAll, Delete } from '@mui/icons-material';

const CreateTournaments = () => {
  const [recurring, setRecurring] = useState(false)
  const [infinitePlay, setInfinitePlay] = useState(false)
  const [age, setAge] = React.useState('');
  const [imageSrc, setImageSrc] = useState()
  const [prizeMoney, setPrizeMoney] = useState([
    {start_rank: '', end_rank: '', cash_money: '', game_token: ''}
  ])

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]))
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const addFields = () => {
    let newfield = {start_rank: '', end_rank: '', cash_money: '', game_token: ''}

    setPrizeMoney([...prizeMoney, newfield])
  }

  const removeFields = (index) => {
    let data = [...prizeMoney];
    data.splice(index, 1)
    setPrizeMoney(data)
  }

  const handleFormChange = (index, event) => {
    let data = [...prizeMoney];
    data[index][event.target.name] = event.target.value;
    setPrizeMoney(data);
  }

  return (
    <Container maxWidth='100%'>
        <Card sx={{ 
            marginTop: '6px'
         }}>
          <CardHeader title='Add New Tournament' sx={{ 
            padding: '20px',
           }} />
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sx={{ m: '0 auto' }}>
                <ImageUpload
                  handleImageSelect={handleImageSelect}
                  imageSrc={imageSrc}
                  setImageSrc={setImageSrc}
                  style={{
                    width: 120,
                    height: 120,
                    background: 'white',
                    boxShadow: '0px 0px 0.6px rgba(0,0,0,0.4)',
                    borderRadius: '5px',
                    margin: '0 auto',
                  }}
                />
                <Typography variant='title' component='h5' align='center' sx={{ m: '10px 0 0 0' }}>Upload Image</Typography>
              </Grid>
              
              <Grid item sm={12} md={6}>
                <TextField 
                  id="game_id" 
                  label="Game ID" 
                  fullWidth
                  variant="outlined" />
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField 
                  id="contest_name" 
                  label="Contest Name" 
                  fullWidth
                  variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel control={<Switch defaultChecked={recurring} onChange={() => setRecurring(!recurring)} />} label="Recurring" />
                </FormGroup>
              </Grid>

              {
                recurring ?
                <>
                  <Grid item sm={12} md={6}>
                    <TextField 
                      id="recurring_duration" 
                      label="Recuring Duration" 
                      fullWidth
                      variant="outlined" />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <TextField 
                      id="recurring_interval" 
                      label="Recuring Interval" 
                      fullWidth
                      variant="outlined" />
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Blackout Start"
                        id="blackout_start"  
                        fullWidth
                        value={'2023-1-20'}
                        onChange={(e) => console.log(e.target.value)}                
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Blackout End"
                        id="blackout_start"  
                        fullWidth
                        value={'2023-1-20'}
                        onChange={(e) => console.log(e.target.value)}                
                      />
                    </LocalizationProvider>
                  </Grid>
                </> :
                <>
                  <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Date"
                        id="blackout_start"  
                        fullWidth
                        value={'2023-1-20'}
                        onChange={(e) => console.log(e.target.value)}                
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date"
                        id="blackout_start"  
                        fullWidth
                        value={'2023-1-20'}
                        onChange={(e) => console.log(e.target.value)}                
                      />
                    </LocalizationProvider>
                  </Grid>
                </>
              }

              <Grid item sm={12} md={6}>
                <TextField 
                  id="entry_fee" 
                  label="Entry Fee" 
                  fullWidth
                  variant="outlined" />
              </Grid>

              <Grid item sm={12} md={6}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="entry_currency-label">Entry Currency</InputLabel>
                  <Select
                    labelId="entry_currency-label"
                    id="entry_currency"
                    value={age}
                    onChange={handleChange}
                    fullWidth
                    label="Entry Currency"
                  >
                    <MenuItem value={0}>Real Cash</MenuItem>
                    <MenuItem value={1}>Game Tokens</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField 
                  id="foreshadow_duration" 
                  label="Foreshadow Duration" 
                  fullWidth
                  variant="outlined" />
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField 
                  id="notification_duration" 
                  label="Notification Duration" 
                  fullWidth
                  variant="outlined" />
              </Grid>

              <Grid item sm={12} md={6}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="notification_segments-label">Notification Segments</InputLabel>
                  <Select
                    labelId="notification_segments-label"
                    id="notification_segments"
                    // value={age}
                    // onChange={handleChange}
                    fullWidth
                    label="Notification Segments"
                  >
                    <MenuItem value={0}>All Users</MenuItem>
                    <MenuItem value={1}>All Participants</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField 
                  id="hardstop_duration" 
                  label="Hardstop Duration" 
                  fullWidth
                  variant="outlined" />
              </Grid>

              <Grid item sm={12} md={6}>
                <FormControl sx={{ minWidth: '100%' }}>
                  <InputLabel id="winning_currency-label">Winning Currency</InputLabel>
                  <Select
                    labelId="winning_currency-label"
                    id="winning_currency"
                    // value={age}
                    // onChange={handleChange}
                    fullWidth
                    label="Winning Currency"
                  >
                    <MenuItem value={0}>Real Cash</MenuItem>
                    <MenuItem value={1}>Game Tokens</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12} md={6}>
                <TextField 
                  id="slots" 
                  label="Slots" 
                  fullWidth
                  variant="outlined" />
              </Grid>

              <Grid item sm={12} md={6}>
                <FormGroup>
                  <FormControlLabel control={<Switch defaultChecked={infinitePlay} onChange={() => setInfinitePlay(!infinitePlay)} />} label="Infinite Play" />
                </FormGroup>
              </Grid>

              {
                infinitePlay ?
                <Grid item sm={12} md={6}></Grid>
                :
                <Grid item sm={12} md={6}>
                  <TextField 
                    id="play_limit" 
                    label="Play Limit" 
                    fullWidth
                    variant="outlined" />
                </Grid>
              }

                <Grid item sm={12} md={6}>
                  <TextField 
                    id="winners_percentage" 
                    label="Winners Percentage" 
                    fullWidth
                    variant="outlined" />
                </Grid>

                <Grid item sm={12} md={6}>
                  <TextField 
                    id="prize_guaranteed" 
                    label="Prize Guaranteed" 
                    fullWidth
                    variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant='title' component='h3'>
                    Prize Money
                  </Typography>
                </Grid>

                {
                  prizeMoney.map((item,index) => (
                    <React.Fragment key={index}>
                        <Grid item sm={12} md={6}>
                          <TextField 
                            id={item.start_rank}
                            label="Start Rank" 
                            fullWidth
                            variant="outlined" />
                        </Grid>
                        <Grid item sm={12} md={6}>
                          <TextField 
                            id={item.start_rank}
                            label="End Rank" 
                            fullWidth
                            variant="outlined" />
                        </Grid>
                        <Grid item sm={12} md={6}>
                          <TextField 
                            id={item.cash_money}
                            label="Cash Money" 
                            fullWidth
                            variant="outlined" />
                        </Grid>
                        <Grid item sm={12} md={6}>
                          <TextField 
                            id={item.game_token}
                            label="Game Token" 
                            fullWidth
                            variant="outlined" />
                        </Grid>
                        {
                          index !== 0 ?
                          <Grid item xs={12}>
                            <Button variant='contained' onClick={() => removeFields(index)} color='error'  startIcon={<Delete />}>Remove</Button>
                          </Grid>
                          : 
                          <></>
                        }  
                    </React.Fragment>
                  ))
                }
                <Grid item xs={12}>
                  <Button variant='contained' startIcon={<Add />} onClick={addFields}>Add Prize Money</Button>
                </Grid>   

                <Grid item sm={12} md={6}>
                  <TextField 
                    id='game_properties'
                    label="Game Properties" 
                    fullWidth
                    variant="outlined" />
                </Grid>  
                <Grid item xs={12}>
                  <Button variant='contained' startIcon={<Add />} sx={{ float: 'right' }}>Create</Button>
                  <Button variant='contained' color='warning' startIcon={<ClearAll />} sx={{ float: 'right', m: '0 10px' }}>Cancel</Button>
                </Grid>           
            </Grid>
          </CardContent>
        </Card>
    </Container>
  )
}

export default CreateTournaments