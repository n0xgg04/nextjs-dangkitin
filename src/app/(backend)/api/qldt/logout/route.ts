export const dynamic = "force-dynamic";
import axios from "lta/lib/axios";
export async function GET(request: Request) {
    const token = request.headers.get("Authorization");
    try {
        const res = await axios.post(
            "/api/auth/logout",
            {},
            {
                headers: {
                    Authorization: token,
                },
            },
        );
        return Response.json({
            message: "success",
            res,
            token,
        });
    } catch (e) {
        return Response.json({
            message: "failed",
            error: e,
            token,
        });
    }
}
