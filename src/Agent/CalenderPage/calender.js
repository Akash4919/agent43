import Paper from "@mui/material/Paper";
import moment from "moment";

import { ViewState } from "@devexpress/dx-react-scheduler";

import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  MonthView,
  ViewSwitcher,
  DayView,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

import { appointments } from "./calenderData";

const Calender = () => {
  const currentDate = moment();
  //   const currentDate = "2022-08-24";
  //   const currentDate = "2018-06-24";
  const Appointment = ({ children, style, ...restProps }) => (
    <Appointments.Appointment
      {...restProps}
      style={{
        ...style,
        backgroundColor: "#FFC107",
        borderRadius: "8px",
      }}
    >
      {children}
    </Appointments.Appointment>
  );
  return (
    <div>
      <Paper>
        <Scheduler data={appointments}>
          <ViewState defaultCurrentDate={currentDate} />
          <MonthView startDayHour={9} endDayHour={20} />
          <DayView startDayHour={9} endDayHour={20} />
          <WeekView startDayHour={9} endDayHour={20} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton />
        </Scheduler>
      </Paper>
    </div>
  );
};

export default Calender;
