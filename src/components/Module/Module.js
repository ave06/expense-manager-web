import { Outlet, createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Page1 from "./Page1";
const Page2 = () => {
    return (
        <div>"this Page 2</div>
    );
}
export const SubRouter = [
    { index: true, element: <Page1 /> },
    { path: "*/Page2", element: <Page2 /> }
];


const Module = () => {
    return (
        <>
            <div>"this is module</div>
            < Outlet />
        </>

    );
}
export default Module;