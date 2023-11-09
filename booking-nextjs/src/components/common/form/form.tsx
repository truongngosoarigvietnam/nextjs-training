'use client'
import { ServerStatusCode } from '@/components/constants/enum';
import { apiRouters } from '@/components/constants/router';
import { LoadingContext } from '@/components/contexts/Loading';
import api from '@/services/api';
import { emailRules, fieldRules } from '@/utils/Validatetor';
import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

type Props = {};
type CreateUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    gender: string;
    roleId: string;
    positionId: string;
    image: File;
};

export default function Form({}: Props) {
    const { setIsLoading } = useContext(LoadingContext);
    const {
        register,
        handleSubmit,
        reset,
        trigger,
        setError,
        getValues,
        formState: { errors },
        watch,
    } = useForm<CreateUser>();

    // ACTION LOGIN
    const userCreateLogin = async (data: CreateUser): Promise<any> => {
        setIsLoading(true);
        return await api.post(apiRouters.USER_LOGIN, data);
    };
    const { mutate: userLoginRequest, isLoading } = useMutation('userLoginRequest', userCreateLogin, {
        onSuccess: async (response) => {
            if (response.status === ServerStatusCode.OK) {
            }
        },
        onError: () => {},
        onSettled: () => {
            setIsLoading(false);
        },
    });
    const onSubmit: SubmitHandler<CreateUser> = (data) => {
        userLoginRequest(data);
    };
    return (
        <div>
            <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                </p>

                <form className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                            First name
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                {...register('firstName', fieldRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                            Last name
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                {...register('lastName', fieldRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            Email address
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="email"
                                {...register('firstName', emailRules(true))}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                            htmlFor="country"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                            Country
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                            Street address
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                name="street-address"
                                id="street-address"
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xl sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            City
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5">
                            State / Province
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                name="region"
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
                        <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
                        >
                            ZIP / Postal code
                        </label>
                        <div className="mt-2 sm:col-span-2 sm:mt-0">
                            <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
