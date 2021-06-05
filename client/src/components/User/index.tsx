import React, { FC, useState } from "react";
import axios from "axios";

interface Props {}

/**
 * @author
 * @function User
 **/

const User: FC<Props> = (props) => {
	const [firstName, setFirstName] = useState<string>("sangeeth");
	const [lastName, setLastName] = useState<string>("ks");
	const [email, setEmail] = useState<string>("sodn@gmail.com");

	const _onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const requestBody = { firstName, lastName, email };

		axios
			.post("/api/v1/user", requestBody)
			.then((response) => {
				console.log(`[_onFormSubmit response]`, response);
			})
			.catch((error) => {
				console.log(error.response.data);
				// console.log(`[_onFormSubmit error]`, error);
			});
	};

	return (
		<div className="form__wrapper">
			<form onSubmit={_onFormSubmit}>
				<div className="form__group">
					<input
						type="text"
						placeholder="First name"
						id=""
						value={firstName}
						onChange={(e: React.FormEvent<HTMLInputElement>) => {
							setFirstName(e.currentTarget.value);
						}}
					/>
				</div>
				<div className="form__group">
					<input
						type="text"
						placeholder="Last name"
						id=""
						value={lastName}
						onChange={(e: React.FormEvent<HTMLInputElement>) => {
							setLastName(e.currentTarget.value);
						}}
					/>
				</div>
				<div className="form__group">
					<input
						type="email"
						placeholder="Email"
						id=""
						value={email}
						onChange={(e: React.FormEvent<HTMLInputElement>) => {
							setEmail(e.currentTarget.value);
						}}
					/>
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default User;
