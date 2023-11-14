import { StatusComponent, positionEnum } from "@/components/constants/enum";


export interface UserRes {
    errCode: number;
    errMessage: string;
    users: {
        data: UserList[];
        totalPages: number;
    };
}
export interface UserList {
    id: number;
    email: string;
    address: string;
    gender: string;
    image: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    roleId: StatusComponent;
    positionId: positionEnum;
    createdAt : string;
}
export type ProvinceType = {
    name: string;
    code: number;
};
export type PositionType = {
    keyMap: string;
    type: string;
    valueVi : string
}
 export type CreateUser = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
    district: string;
    gender: string;
    roleId: string;
    positionId: string;
    image: File;
};
export type SpecialData = {
    id: number;
    name: string;
    image: string;
    descriptionHTML: string;
};
export type DoctorInforData = {
    doctorId: string,
    description: string,
    paymentId: string,
    priceId: string,
    provinceId: string,
    specialtyId: number,
    clinicId : number 
}
