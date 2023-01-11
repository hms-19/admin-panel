import { Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ImageUpload from 'image-upload-react'
import 'image-upload-react/dist/index.css'
import { Add, ClearAll, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
import Swal from 'sweetalert2'
import { createTournaments } from '../../endpoints/tournaments';
import { Helmet } from 'react-helmet-async';
import { cleanTourForm } from './tourUtils';

const CreateTournaments = () => {
  
  //original state
  const [data, setData] = useState({
    game_id : '',
    img_splash : '',
    contest_name : '',
    recurring : false,
    recurring_duration : '',
    recurring_interval : '',
    blackout_start : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
    blackout_end : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
    start_datetime : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
    end_datetime : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
    entry_fee : '',
    entry_currency : '',
    foreshadow_duration : '',
    notification_duration : '',
    notification_segments : '',
    hardstop_duration : '',
    winning_currency : '',
    slots : '',
    infinite_play : false,
    play_limit : '',
    winners_percentage : '',
    prize_guaranteed : false,
    game_properties : ''
  })

  const [loading, setLoading] = useState(false)

  const [prizeMoney, setPrizeMoney] = useState([
    {start_rank: '', end_rank: '', cash_money: '', game_token: ''}
  ])

  const [games, setGames] = useState([
    {
      id : 'GM001',
      property: {
        ball_hit_rate: 75
      }
    }
  ])

  // change image to base64
  const handleImageSelect = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setData({...data, img_splash : reader.result})
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
  }

  //prize money add row
  const addFields = () => {
    let newfield = {start_rank: '', end_rank: '', cash_money: '', game_token: ''}
    setPrizeMoney([...prizeMoney, newfield])
  }

  //prize money remove row
  const removeFields = (index) => {
    let field = [...prizeMoney]
    field = field.filter((d,i) => i !== index)
    setPrizeMoney(field)
  }

  //prize money state update
  const handleChange = (index, event) => {
    let prize = [...prizeMoney];
    prize[index][event.target.id] = event.target.value;
    setPrizeMoney(prize);
  }

  // state update
  const EnterTextField = (key, value) => {
    setData({...data, [key]: value})
  }
  

  //change game properties
  useEffect(() => {
    let prop = games.filter(game => game.id == data.game_id)
    prop = prop[0]
    EnterTextField('game_properties',prop?.property)
  },[data.game_id])
  

  // request to create
  const makeTourRequest = async () => {
    setLoading(true)
    const res = await createTournaments({
      access_token: 'test',
      ...data,
      prizeMoney
    })

    // console.log(res)

    if(res.code !== 0){
      setLoading(false)
      Swal.fire({
        title: 'Warning!',
        text: res?.message,
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }

    setData(cleanTourForm(data))
    setPrizeMoney([
      {start_rank: '', end_rank: '', cash_money: '', game_token: ''}
    ])
    Swal.fire({
      title: 'Success!',
      text: 'Tournament created successfully !',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    
  }

  // handle submit
  const handleFormSubmit = (type) => {

    // form cancel
    if(type == 'cancel'){
      setData(cleanTourForm(data))
      setPrizeMoney([
        {start_rank: '', end_rank: '', cash_money: '', game_token: ''}
      ])
      setLoading(false)
    }

    //form submit
    if(type == 'submit'){
        // console.log(data)
        // all field check
        if(
            data.game_id !== '' && 
            data.img_splash !== '' &&
            data.contest_name !== '' &&
            data.entry_fee !== '' &&
            data.foreshadow_duration !== '' &&
            data.notification_duration !== '' &&
            data.hardstop_duration !== '' &&
            data.slots !== '' &&
            data.winners_percentage !== '' &&
            data.game_properties !== '' &&
            prizeMoney.length !== 0 
          ){
            // prize money check
            if( prizeMoney[0].start_rank !== '' && 
                prizeMoney[0].end_rank !== '' &&
                prizeMoney[0].cash_money !== '' &&
                prizeMoney[0].game_token !== '' 
            ){

              // infinite check
              if(!data.infinite_play){
                if(data.play_limit !== ''){

                  //recurring check
                  if(data.recurring){
                    if( data.recurring_duration !== '' &&
                        data.recurring_interval !== '' &&
                        data.blackout_start !== '' &&
                        data.blackout_end !== '' 
                      ){
                          makeTourRequest()
                      }
                      else{
                        Swal.fire({
                          title: 'Warning!',
                          text: 'Recurring fields are required fields!',
                          icon: 'warning',
                          confirmButtonText: 'OK'
                        })
                      }
                  }
                  else{
                    if( data.start_datetime !== '' &&
                        data.end_datetime !== '' ){
                         
                        makeTourRequest()
                    }
                    else{
                      Swal.fire({
                        title: 'Warning!',
                        text: 'Start date and end date are required fields!',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                      })
                    }
                  }
                }
                else{
                  Swal.fire({
                    title: 'Warning!',
                    text: 'Play limit is required !',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                  })
                }
              }
            }
            else{
              Swal.fire({
                title: 'Warning!',
                text: 'Prize Money fields are required !',
                icon: 'warning',
                confirmButtonText: 'OK'
              })
            }
          }
          else{
            Swal.fire({
              title: 'Warning!',
              text: 'All fields are required !',
              icon: 'warning',
              confirmButtonText: 'OK'
            })
          }
    }
  }

  return (
    <>
      <Helmet>
        <title> Create Tournaments </title>
      </Helmet>
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
                    imageSrc={data.img_splash}
                    value={data.img_splash}
                    setImageSrc={e => setData({...data,img_splash: e.target.value})}
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
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="game_id-label">Game ID</InputLabel>
                    <Select
                      labelId="game_id-label"
                      id="game_id"
                      fullWidth
                      value={data.game_id}
                      onChange={(e) => EnterTextField('game_id',e.target.value)} 
                      label="Game ID" 
                    >
                      {
                        games.map(game => (
                          <MenuItem key={game.id} value={game.id}>{game.id}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item sm={12} md={6}>
                  <TextField 
                    id="contest_name" 
                    label="Contest Name" 
                    fullWidth
                    value={data.contest_name}
                    onChange={(e) => EnterTextField('contest_name',e.target.value)}
                    variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel control={<Switch checked={data.recurring} onChange={(e) => EnterTextField('recurring',!Boolean(data.recurring))} />} label="Recurring" />
                  </FormGroup>
                </Grid>

                {
                  data.recurring ?
                  <>
                    <Grid item sm={12} md={6}>
                      <TextField 
                        id="recurring_duration" 
                        label="Recuring Duration" 
                        fullWidth
                        value={data.recurring_duration}
                        onChange={(e) => EnterTextField('recurring_duration',e.target.value)}
                        variant="outlined" />
                    </Grid>

                    <Grid item sm={12} md={6}>
                      <TextField 
                        id="recurring_interval" 
                        label="Recuring Interval" 
                        fullWidth
                        value={data.recurring_interval}
                        onChange={(e) => EnterTextField('recurring_interval',e.target.value)}
                        variant="outlined" />
                    </Grid>

                    <Grid item sm={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          label="Blackout Start"
                          id="blackout_start"  
                          inputFormat={dayjs(data.blackout_start).format('YYYY-MM-DDTHH:mm:ssZ')}
                          fullWidth
                          value={data.blackout_start}
                          onChange={(e) => EnterTextField('blackout_start',dayjs(e).format('YYYY-MM-DDTHH:mm:ssZ'))}               
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item sm={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          label="Blackout End"
                          id="blackout_end"  
                          minDate={data.blackout_start}
                          fullWidth
                          inputFormat={dayjs(data.blackout_end).format('YYYY-MM-DDTHH:mm:ssZ')}
                          value={data.blackout_end}
                          onChange={(e) => EnterTextField('blackout_end',dayjs(e).format('YYYY-MM-DDTHH:mm:ssZ'))}             
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
                          id="start_datetime"  
                          fullWidth
                          inputFormat={dayjs(data.start_datetime).format('YYYY-MM-DDTHH:mm:ssZ')}
                          value={data.start_datetime}
                          onChange={(e) => EnterTextField('start_datetime',dayjs(e).format('YYYY-MM-DDTHH:mm:ssZ'))}                 
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item sm={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          label="End Date"
                          id="end_datetime"  
                          minDate={data.start_datetime}
                          fullWidth
                          inputFormat={dayjs(data.end_datetime).format('YYYY-MM-DDTHH:mm:ssZ')}
                          value={data.end_datetime}
                          onChange={(e) => EnterTextField('end_datetime',dayjs(e).format('YYYY-MM-DDTHH:mm:ssZ'))}                  
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
                    type='number'
                    value={data.entry_fee}
                    onChange={(e) => EnterTextField('entry_fee',e.target.value)} 
                    variant="outlined" />
                </Grid>

                <Grid item sm={12} md={6}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="entry_currency-label">Entry Currency</InputLabel>
                    <Select
                      labelId="entry_currency-label"
                      id="entry_currency"
                      fullWidth
                      value={data.entry_currency}
                      onChange={(e) => EnterTextField('entry_currency',e.target.value)} 
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
                    type='number'
                    value={data.foreshadow_duration}
                    onChange={(e) => EnterTextField('foreshadow_duration',e.target.value)} 
                    variant="outlined" />
                </Grid>

                <Grid item sm={12} md={6}>
                  <TextField 
                    id="notification_duration" 
                    label="Notification Duration" 
                    fullWidth
                    type='number'
                    value={data.notification_duration}
                    onChange={(e) => EnterTextField('notification_duration',e.target.value)} 
                    variant="outlined" />
                </Grid>

                <Grid item sm={12} md={6}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="notification_segments-label">Notification Segments</InputLabel>
                    <Select
                      labelId="notification_segments-label"
                      id="notification_segments"
                      value={data.notification_segments}
                      onChange={(e) => EnterTextField('notification_segments',e.target.value)} 
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
                    type='number'
                    value={data.hardstop_duration}
                    onChange={(e) => EnterTextField('hardstop_duration',e.target.value)} 
                    variant="outlined" />
                </Grid>

                <Grid item sm={12} md={6}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="winning_currency-label">Winning Currency</InputLabel>
                    <Select
                      labelId="winning_currency-label"
                      id="winning_currency"
                      value={data.winning_currency}
                      onChange={(e) => EnterTextField('winning_currency',e.target.value)} 
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
                    type='number'
                    value={data.slots}
                    onChange={(e) => EnterTextField('slots',e.target.value)}
                    variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel control={<Switch checked={data.infinite_play} onChange={(e) => EnterTextField('infinite_play',!Boolean(data.infinite_play))} />} label="Infinite Play" />
                  </FormGroup>
                </Grid>

                {
                  data.infinite_play ?
                  <Grid item sm={12} md={6}></Grid>
                  :
                  <Grid item sm={12} md={6}>
                    <TextField 
                      id="play_limit" 
                      label="Play Limit" 
                      fullWidth
                      type='number'
                      value={data.play_limit}
                      onChange={(e) => EnterTextField('play_limit',e.target.value)}
                      variant="outlined" />
                  </Grid>
                }

                  <Grid item sm={12} md={6}>
                    <TextField 
                      id="winners_percentage" 
                      label="Winners Percentage" 
                      fullWidth
                      type='number'
                      value={data.winners_percentage}
                      onChange={(e) => EnterTextField('winners_percentage',e.target.value)}
                      variant="outlined" />
                  </Grid>

                  <Grid item xs={12}>
                    <FormGroup>
                      <FormControlLabel control={<Switch checked={data.prize_guaranteed} onChange={(e) => EnterTextField('prize_guaranteed',!Boolean(data.prize_guaranteed))} />} label="Prize Guaranteed" />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant='title' component='h3'>
                      Prize Money
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sx={{ mr: '25px' }}>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                      {
                      prizeMoney.map((item,index) => (
                        <React.Fragment key={index}>
                            <Grid item sm={12} md={6} lg={3}>
                              <TextField 
                                id='start_rank'
                                onChange={e => handleChange(index, e)}
                                value={item.start_rank}
                                label="Start Rank" 
                                        fullWidth
                                variant="outlined" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={3}>
                              <TextField 
                                id='end_rank'
                                onChange={e => handleChange(index, e)}
                                value={item.end_rank}
                                label="End Rank" 
                                fullWidth
                                        variant="outlined" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={3}>
                              <TextField 
                                id='cash_money'
                                onChange={e => handleChange(index, e)}
                                value={item.cash_money}
                                label="Cash Money" 
                                fullWidth
                                        variant="outlined" />
                            </Grid>
                            <Grid item sm={12} md={6} lg={3}>
                              <TextField 
                                id='game_token'
                                onChange={e => handleChange(index, e)}
                                value={item.game_token}
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
                    </Grid>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Button variant='contained' startIcon={<Add />} onClick={addFields}>Add Prize Money</Button>
                  </Grid>   

                  <Grid item sm={12} md={6}>
                    <TextField 
                      id='game_properties'
                      label="Game Properties" 
                      fullWidth
                      disabled
                      value={JSON.stringify(data.game_properties)}
                      variant="outlined" />
                  </Grid>  
                  <Grid item xs={12}>
                    {
                      loading ? <Button variant='contained' startIcon={<Add />} sx={{ float: 'right' }} disabled>Create</Button>
                      : 
                      <Button variant='contained' startIcon={<Add />} sx={{ float: 'right' }} onClick={() => handleFormSubmit('submit')}>Create</Button>
                    }
                    <Button variant='contained' color='warning' startIcon={<ClearAll />} sx={{ float: 'right', m: '0 10px' }} onClick={() => handleFormSubmit('cancel')}>Clear</Button>
                  </Grid>           
              </Grid>
            </CardContent>
          </Card>
      </Container>
    </>
  )
}

export default CreateTournaments