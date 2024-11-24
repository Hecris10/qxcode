import { DatePicker, Portal } from "@ark-ui/react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsFillCalendarFill,
} from "react-icons/bs";

export const SingleDatePicker = ({
  name,
  defaultValue,
  onDateChange,
}: {
  name?: string;
  defaultValue?: Date;
  onDateChange?: (value: string) => void;
}) => {
  return (
    <DatePicker.Root
      name={name}
      onValueChange={(e) => onDateChange && onDateChange(e.valueAsString[0])}
    >
      <DatePicker.Control className="w-full flex relative gap-2 align-middle">
        <DatePicker.Input maxLength={10} />
        <DatePicker.Trigger className="absolute right-3 top-[7px]">
          <BsFillCalendarFill className="w-7 h-7 text-slate-500  hover:text-slate-400 my-auto" />
        </DatePicker.Trigger>
        {/* <DatePicker.ClearTrigger>Clear</DatePicker.ClearTrigger> */}
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content className="min-w-[400px] bg-blue1 rounded-lg pt-2 pb-4 shadow-lg">
            {/* <DatePicker.YearSelect />
            <DatePicker.MonthSelect /> */}
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="mx-auto flex w-[90%] justify-between py-4">
                      <DatePicker.PrevTrigger className="p-2 rounded-lg hover:bg-slate-800 duration-150 transition-all ease-in-out">
                        <BsChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText className="font-bold text-lg" />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger className="p-2 rounded-lg hover:bg-slate-800 duration-150 transition-all ease-in-out">
                        <BsChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="mx-auto w-[90%]">
                      <DatePicker.TableHead className="mx-auto">
                        <DatePicker.TableRow className="mx-auto">
                          {datePicker.weekDays.map((weekDay, id) => (
                            <DatePicker.TableHeader key={id}>
                              {weekDay.short}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {datePicker.weeks.map((week, id) => (
                          <DatePicker.TableRow key={id}>
                            {week.map((day, id) => (
                              <DatePicker.TableCell
                                className="text-center duration-200 transition-all ease-in-out justify-center [&[aria-selected=true]]:bg-slate-700 hover:[&[aria-selected=true]]:bg-slate-500 [&[aria-selected=true]]:shadow-lg hover:bg-blue2 [&[aria-current=date]]:bg-slate-600 hover:[&[aria-current=date]]:bg-blue2 w-10 h-10 p-1 rounded-xl"
                                key={id}
                                value={day}
                              >
                                <DatePicker.TableCellTrigger className="">
                                  <p className="m-auto"> {day.day}</p>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="month">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="mx-auto flex w-[90%] justify-between py-4">
                      <DatePicker.PrevTrigger className="p-2 rounded-lg hover:bg-slate-800 duration-150 transition-all ease-in-out">
                        <BsChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText className="font-bold text-lg" />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger className="p-2 rounded-lg hover:bg-slate-800 duration-150 transition-all ease-in-out">
                        <BsChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="mx-auto w-[90%]">
                      <DatePicker.TableBody>
                        {datePicker
                          .getMonthsGrid({ columns: 4, format: "short" })
                          .map((months, id) => (
                            <DatePicker.TableRow className="mx-auto" key={id}>
                              {months.map((month, id) => (
                                <DatePicker.TableCell
                                  key={id}
                                  value={month.value}
                                >
                                  <DatePicker.TableCellTrigger className="text-center [&[data-focus]]:bg-slate-700 hover:[&[data-focus]]:bg-slate-500 [&[data-focus]]:shadow-lg hover:bg-blue2 rounded-xl py-3">
                                    {month.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
            <DatePicker.View view="year">
              <DatePicker.Context>
                {(datePicker) => (
                  <>
                    <DatePicker.ViewControl className="mx-auto flex w-[90%] justify-between py-4">
                      <DatePicker.PrevTrigger className="p-2 rounded-lg hover:bg-slate-800 duration-150 transition-all ease-in-out">
                        <BsChevronLeft />
                      </DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText className="font-bold text-lg" />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger className="p-2 rounded-lg hover:bg-slate-800 duration-150 transition-all ease-in-out">
                        <BsChevronRight />
                      </DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table className="mx-auto w-[90%]">
                      <DatePicker.TableBody>
                        {datePicker
                          .getYearsGrid({ columns: 4 })
                          .map((years, id) => (
                            <DatePicker.TableRow className="mx-auto" key={id}>
                              {years.map((year, id) => (
                                <DatePicker.TableCell
                                  key={id}
                                  value={year.value}
                                >
                                  <DatePicker.TableCellTrigger className="text-center [&[data-focus]]:bg-slate-700 hover:[&[data-focus]]:bg-slate-500 [&[data-focus]]:shadow-lg hover:bg-blue2 rounded-xl py-3">
                                    {year.label}
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                      </DatePicker.TableBody>
                    </DatePicker.Table>
                  </>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  );
};
