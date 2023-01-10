import dayjs from "dayjs"

export const cleanTourForm = (data) => {
    return {...data,
            game_id : '',
            img_splash : '',
            contest_name : '',
            recurring : false,
            recurring_duration : 0,
            recurring_interval : 0,
            blackout_start : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
            blackout_end : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
            start_datetime : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
            end_datetime : dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ssZ').toString(),
            entry_fee : 0,
            entry_currency : 0,
            foreshadow_duration : 0,
            notification_duration : 0,
            notification_segments : 0,
            hardstop_duration : 0,
            winning_currency : 0,
            slots : 0,
            infinite_play : false,
            play_limit : 0,
            winners_percentage : 0,
            prize_guaranteed : false,
            game_properties : ''
      }
}