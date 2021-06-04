import React, { FC } from "react";
import "./App.css";
import User from "./components/User";

interface Props {}

const App: FC<Props> = (props: Props) => {
	return (
		<div className="App">
			<User />
		</div>
	);
};

export default App;
