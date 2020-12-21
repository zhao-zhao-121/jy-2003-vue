import Films from "@/views/Films/Films";
import NowPlaying from "@/views/Films/NowPlaying";
import ComingSoon from "@/views/Films/ComingSoon";
import Detail from "@/views/Films/Detail";

var filmRouter = [
    {
        path: "/films",
        component: Films,
        redirect: "/films/nowplaying",
        children: [
            { path: "nowplaying", component: NowPlaying },
            { path: "comingsoon", component: ComingSoon },
        ],
    },
    {
        path: "/film/:filmId",
        component: Detail,
    },
];

export default filmRouter;