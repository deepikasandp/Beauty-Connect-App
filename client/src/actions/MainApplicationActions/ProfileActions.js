import * as types from '../ActionTypes';

// Create profile
export function createProfile(data, edit) {
    return{
        type: types.CREATE_PROFILE,
        edit: edit,
        data: {
            ...data
        }
    }
};

// Get authenticated user profile
export function getProfile() {
    return{
        type: types.GET_PROFILE
    }
};

// Get all user profiles
export function getAllProfiles() {
    return{
        type: types.GET_ALL_PROFILES
    }
};

// Get profile by ID
export function getProfileByID(user_id) {
    return{
        type: types.GET_PROFILE_BY_ID,
        user_id: user_id
    }
};

// Clear user profile on logout
export function clearProfile() {
    return{
        type: types.CLEAR_PROFILE
    }
};

// Update experience
export function addExperience(data) {
    return{
        type: types.ADD_EXPERIENCE,
        data: {
            ...data
        }
    }
};

// Update education
export function addEducation(data) {
    return{
        type: types.ADD_EDUCATION,
        data: {
            ...data
        }
    }
};

// Delete experience
export function deleteExperience(exp_id) {
    return{
        type: types.DELETE_EXPERIENCE,
        exp_id: exp_id
    }
};

// Delete education
export function deleteEducation(edu_id) {
    return{
        type: types.DELETE_EDUCATION,
        edu_id: edu_id
    }
};
