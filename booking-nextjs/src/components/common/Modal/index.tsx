'use client'
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { IDataBooking } from '@/interfaces/common';
import Input from '../Input';
import { fieldRules } from '@/utils/Validatetor';

export default function index() {
    const [open, setOpen] = useState(true);

    const cancelButtonRef = useRef(null);


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
       } = useForm<IDataBooking>();



    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full lg:min-w-[700px]  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-2">
                                <div>
                                    <div className="w-full flex justify-center">
                                        <Dialog.Title
                                            as="h3"
                                            className="!text-lg h-12 flex items-center font-semibold leading-6 text-gray-900"
                                        >
                                            Thông tin đặt lịch khám
                                        </Dialog.Title>
                                    </div>
                                    <div className="absolute top-2 right-2 flex justify-end w-full">
                                        <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />{' '}
                                        </div>
                                    </div>
                                    <div className="mt-3 sm:mt-5 px-2">
                                        <form>
                                            <Input
                                                labelName="text-sm !font-medium"
                                                label="Họ & tên"
                                                placeholder="Họ và tên"
                                                autoComplete="on"
                                                className="w-full max-w-[90%]"
                                                register={register('fullName', fieldRules(true))}
                                            />
                                        </form>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
