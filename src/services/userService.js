import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint + "/register", {
    name: user.name,
    email: user.email,
  });
}
export function getUsersWithLoc() {
  return http.get(apiEndpoint + "/getAll", {});
}

export function getUser(email) {
  return http.post(apiEndpoint + "/getUser", {
    email: email,
  });
}
export function updateCovidInfo(email, data) {
  return http.patch(apiEndpoint + "/updateUserLocation/" + email, {
    lat: data.lat,
    lng: data.lng,
    temperature: data.data.temperature,
    symptoms: data.data.symptoms,
  });
}
export function updateUserInfo(email, data) {
  return http.patch(apiEndpoint + "/updateUserInfo/" + email, {
    name: data.name,
    age: data.age,
    gender: data.gender,
  });
}
export function checkIfNotRegistered(email) {
  return http.post(apiEndpoint + "/check", {
    email: email,
  });
}
