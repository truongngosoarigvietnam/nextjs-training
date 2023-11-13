'use client';
import React, { useContext } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { useQuery } from 'react-query';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import { DoctorInforData } from '@/interfaces/common';
import api from '@/services/api';
import { register } from 'module';

type Props = {
    register: UseFormRegister<DoctorInforData>;
};
type AllDoctor = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: string;
    roleId: string;
    positionId: string;
};

export default function SelectDoctor({ register }: Props) {
    const { setIsLoading } = useContext(LoadingContext);

    // ACTION GET ALL DOCTOR
    const getListDoctor = async (): Promise<AllDoctor[]> => {
        setIsLoading(true);
        const { data } = await api.get(`${apiRouters.LIST_DOCTOR}`);
        return data.data;
    };
    const { data: listDoctor, refetch: refetchGetListDoctor } = useQuery('getListDoctor', getListDoctor, {
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
        <div className="sm:col-span-3">
            <label htmlFor="doctor" className="block text-sm font-medium leading-6 text-gray-900">
                Doctor
            </label>
            <div className="mt-2">
                <select
                    {...register('doctorId')}
                    id="doctor"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    {listDoctor?.map((item) => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.firstName} {item.lastName}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
