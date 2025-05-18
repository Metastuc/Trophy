import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { title } = await req.json();
    try {
        const { data } = await axios.post(
            "https://api.huddle01.com/api/v1/create-room",
            { title },
            {
                headers: { "x-api-key": process.env.API_KEY },
            },
        );
        console.log(data);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
