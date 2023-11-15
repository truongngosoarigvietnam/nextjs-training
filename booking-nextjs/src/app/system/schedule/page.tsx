'use client';
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import SelectDoctor from '@/components/common/Selection/SelectDoctor';
import { LoadingContext } from '@/components/contexts/Loading';
import FormSchedule from '@/components/common/formSchedule/formSchedule';
import { IdataTime } from '@/interfaces/common';

type Props = {};

type ScheduleDoctor = {
    doctorId: number;
    timeSelected: IdataTime[];
};
export default function Schedule({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const [dataTime, setDataTime] = useState<IdataTime[]>();

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        setError,
        getValues,
        setValue,
        formState: { errors },
        watch,
    } = useForm<ScheduleDoctor>();
    const [selected, setSelected] = useState<Date | undefined>();

    let footer = <p className="mt-5 pl-2 text-red-300 text-xs">Please pick a day.</p>;
    if (selected) {
        footer = (
            <p className="mt-5 pl-2 text-xs">
                You picked : <span className="text-primary"> {format(selected, 'PP')}</span>.
            </p>
        );
    }
    const onSubmit: SubmitHandler<ScheduleDoctor> = (data) => {
        let result: { doctorId: number; date: number; timeType: string }[] = [];
        let selectedTime = dataTime?.filter((item) => item.isSelected === true);
        if (selectedTime && selectedTime.length > 0) {
            selectedTime.map((time) => {
                let object = {
                    doctorId: NaN,
                    date: NaN,
                    timeType: '',
                };
                object.doctorId = data.doctorId;
                object.date = selected ? selected?.getTime() : new Date().getTime();
                object.timeType = time.keyMap;
                result.push(object);
            });
        } else {
            console.log('lỗi rồi');
        }
        console.log(result);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Schedule</p>
            <div className=" mt-10 max-w-7xl">
                <SelectDoctor register={register('doctorId')} />
                <div className="ml-10">
                    <DayPicker
                        disabled={(date) => date < new Date()}
                        showOutsideDays
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        footer={footer}
                    />
                </div>
            </div>
            <div>
                <FormSchedule dataTime={dataTime} setDataTime={setDataTime} />
            </div>
            <button
                type="submit"
                className="rounded-md mt-3 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save
            </button>
        </form>
    );
}
