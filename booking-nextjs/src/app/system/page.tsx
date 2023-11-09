import React, { useState } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/dashboard/dashboard";

type Props = {};

export default async function page({}: Props) {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect("/auth/login");
    }
    return (
        <div>
            <Dashboard />
        </div>
    );
}
