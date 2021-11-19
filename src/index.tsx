import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import MiniDrawer from "./components/drawer/MiniDrawer";

ReactDOM.render(
	<div>
		<Router>
			<MiniDrawer />
		</Router>
	</div>,
  document.getElementById("root")
);
