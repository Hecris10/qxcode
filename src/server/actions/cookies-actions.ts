"use server"

import { cookies } from "next/headers";

export const getQrCodeViewMode = async () => {
    const cookieStore = await cookies();
    const viewMode = cookieStore.get("qrCodeViewMode");
    if (viewMode) {
        return viewMode.value;
    }
    return "grid";
}

export const setQrCodeViewMode = async (viewMode: 'grid' | "list") => {
    const cookieStore = await cookies();
    cookieStore.set("qrCodeViewMode", viewMode);
    return viewMode;
}
