import React from "react";
import { IconPanel } from "../component/panel";
import {DateTime} from "luxon";
import {
  FaUser,
  FaDoorOpen,
  FaCalendarAlt,
  FaCalendarTimes,
  FaCommentDots, FaRegFileAlt, FaInfo, FaSwimmer, FaRegEdit, FaStickyNote, FaRegCalendar, FaUserCog
} from 'react-icons/fa';
import { Grid, Typography } from '@mui/material';


const TimeDisplay: React.FC = () => {
 const [currentTime, setCurrentTime] = React.useState(DateTime.now().setZone('Asia/Tokyo'))
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(DateTime.now().setZone('Asia/Tokyo'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <Typography style={{ marginBottom: "8px", marginRight: "8px", textAlign:"right", fontSize:20}}>
      {currentTime.toFormat('yyyy/MM/dd(EEE) a h:mm')}
    </Typography>
  )
}

export const Portal: React.FC = () => {
  return (
    <div>
      <h1>Portal</h1>

      <TimeDisplay />

      <Grid container spacing={1} style={{ marginBottom: "8px", marginLeft: "80px" }}>
        <IconPanel icon={<FaInfo size={48}/>} label="お知らせ" link="/users"/>
        <IconPanel icon={<FaRegCalendar size={48}/>} label="スケジュール" link="/rooms"/>
        <IconPanel icon={<FaSwimmer size={48}/>} label="イベント" link="/bookings"/>
        <IconPanel icon={<FaStickyNote size={48}/>} label="Todo" link="/users"/>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: "8px", marginLeft: "80px" }}>
        <IconPanel icon={<FaCalendarTimes size={48}/>} label="タイムカード" link="/rooms"/>
        <IconPanel icon={<FaCalendarAlt size={48}/>} label="勤怠表" link="/bookings"/>
        <IconPanel icon={<FaDoorOpen size={48}/>} label="1on1" link="/rooms"/>
        <IconPanel icon={<FaRegEdit size={48}/>} label="会議室予約" link="/bookings/new"/>
      </Grid>
      <Grid container spacing={1} style={{ marginBottom: "8px", marginLeft: "80px" }}>
        <IconPanel icon={<FaCommentDots size={48}/>} label="チャット" link="/rooms"/>
        <IconPanel icon={<FaRegFileAlt size={48}/>} label="各種申請" link="/rooms"/>
        <IconPanel icon={<FaUser size={48}/>} label="ユーザー" link="/users"/>
        <IconPanel icon={<FaUserCog size={48}/>} label="設定" link="/bookings"/>
      </Grid>
    </div>
  );
};
