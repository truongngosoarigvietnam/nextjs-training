import React from 'react';
import { PositionType } from '@/interfaces/common';
import { formatVND } from '@/utils';

type Props = {
    listData: PositionType[];
    type?: string;
    title : string
};

export default function CheckboxOptions({ listData, type  , title}: Props) {
    return (
        <fieldset className="sm:col-span-3">
            <legend className="text-sm font-semibold leading-6 text-gray-900">{title}</legend>
            <div className="mt-6 space-y-6">
                {listData?.map((item) => {
                    return (
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                    id="comments"
                                    name="comments"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                {type === 'PRICE' && (
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                        {formatVND(parseInt(item.valueVi))}
                                    </label>
                                )}
                                {type === 'PAYMENT' && (
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                        {item.valueVi}
                                    </label>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </fieldset>
    );
}
