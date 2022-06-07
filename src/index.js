import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Crawl from "./pages/crawl";

const appElement = document.getElementById("app");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Crawl />} />
        </Routes>
    </BrowserRouter>,
    appElement
);