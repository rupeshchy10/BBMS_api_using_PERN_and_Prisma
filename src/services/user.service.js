import { ApiError } from "../utils/ApiError.js";

let users = [
    { id: 1, name: "Rupesh Choudhary", profession: "Coding" },
    { id: 2, name: "Ram Rajbanshi", profession: "Designer" },
    { id: 3, name: "Henry Roy", profession: "Sellsman" },
];

// GET ALL USERS
export const getAllUser = async () => {
    return users;
};

// GET USER BY ID
export const getUser = async (id) => {
    const user = users.find((t) => t.id === id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

// CREATE USER
export const createUser = async (data) => {
    const { name, profession } = data;
    if (!name || name.trim() === "") {
        throw new ApiError(404, "Name is required");
    }

    if (!profession || profession.trim() === "") {
        throw new ApiError(404, "Profession is required");
    }

    const newUser = {
        id: users.length + 1,
        name,
        profession,
    };

    users.push(newUser);

    return newUser;
};

// UPDATE USER
export const updateUser = async (id, data) => {
    const user = users.find((t) => t.id === id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (data.name !== undefined) {
        user.name = data.name;
    }

    if (data.profession !== undefined) {
        user.profession = data.profession;
    }

    return user;
};

// DELETE USER
export const deleteUser = async (id) => {
    const index = users.findIndex((t) => t.id === id);

    if (index === -1) {
        throw new ApiError(404, "User not found");
    }

    return users.splice(index, 1)[0];
};
