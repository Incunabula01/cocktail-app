import { NextResponse } from "next/server";
import { serialize } from "cookie";

export const POST = async (req: Request, res: Response) => {
    try {
        const expiredCookie = serialize('OutSiteJWT', '', {
            expires: new Date(0),
            path: '/'
        });

        return NextResponse.json({ message: "Successfully Logged Out!" }, {
            status: 200,
            headers: {
                'Set-Cookie': expiredCookie
            }
        });

    } catch (error: any) {
        console.error(`An error has occured! ${error}`);
        return NextResponse.json({ error: error.message }, { status: 500 });
    } 
}