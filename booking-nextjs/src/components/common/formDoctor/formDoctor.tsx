'use client';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';

import SelectDoctor from '../Selection/SelectDoctor';
import { LoadingContext } from '@/components/contexts/Loading';
import { apiRouters } from '@/components/constants/router';
import api from '@/services/api';
import CheckboxOptions from '../Checkbox/checkboxOptions';
import { DoctorInforData, PositionType } from '@/interfaces/common';
import SelectSpecial from '../Selection/SelectSpecial';
import SelectClinics from '../Selection/SelectClinics';
import Markdowns from '../Markdown/Markdown';
import { useForm } from 'react-hook-form';

export default function FormDoctor() {
    const { setIsLoading } = useContext(LoadingContext);

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
    } = useForm<DoctorInforData>();

    // ACTION GET ALL PRICE
    const getListPrice = async (): Promise<PositionType[]> => {
        setIsLoading(true);
        const type = 'PRICE';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listPrice, refetch: refetchGetListPrice } = useQuery('getListPrice', getListPrice, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {},
        onError: () => {
            setIsLoading(false);
        },
        onSettled: () => {},
        refetchOnMount: true,
    });
    // ACTION GET ALL PAYMENT
    const getListPayment = async (): Promise<PositionType[]> => {
        setIsLoading(true);
        const type = 'PAYMENT';
        const { data } = await api.get(`${apiRouters.ALL_CODE(type)}`);
        return data.data;
    };
    const { data: listPayment, refetch: refetchGetListPayment } = useQuery('getListPayment', getListPayment, {
        staleTime: Infinity,
        enabled: true,
        retry: 0,
        onSuccess: (res) => {},
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
        refetchOnMount: true,
    });
    return (
        <form>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <SelectDoctor register={register} />
                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="about"
                                    {...register('description')}
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Write a few sentences about yourself.
                            </p>
                        </div>
                        <SelectSpecial register={register} />
                        <SelectClinics register={register} />
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear
                        about.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <CheckboxOptions title="Price" type="PRICE" listData={listPrice ? listPrice : []} />
                        <CheckboxOptions title="Payment" type="PAYMENT" listData={listPayment ? listPayment : []} />
                    </div>
                </div>
                <div>
                    <Markdowns />
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
