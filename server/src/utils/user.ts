import { UserEntity, UserPropType } from "../types/user";

export const getSafeUserData = (data: UserEntity) => {
	let user = Object.assign({}, data);
	const excludeKeys = ["tokens", "__v"];

	excludeKeys.forEach((key) => {
		delete user[<UserPropType>key];
	});

	console.log(`[utils > getSafeUserData > user]`, user);

	return user;
};
