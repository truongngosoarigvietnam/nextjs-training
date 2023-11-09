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
