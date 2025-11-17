import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
    trigger?: any;
}

const scrollToTop = ({ trigger }: ScrollToTopProps) => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname, trigger])

    useEffect(() => {
        // if ('scrollRestoration' in history) {
        //     history.scrollRestoration = 'manual';
        // }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [])

    return null;
}

export default scrollToTop;




// interface ScrollToTopProps {
//     trigger?: any; // Accept any value to re-trigger on step change
// }

// const ScrollToTop = ({ trigger }: ScrollToTopProps) => {
//     const { pathname } = useLocation();

//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, [pathname, trigger]);

//     return null;
// };

// export default ScrollToTop;