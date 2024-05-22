// export async function getLogin() {
//   const res = await fetch("https://dummyjson.com/auth/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       username: username,
//       password: password,
//       // expiresInMins: 60, // optional
//     }),
//   });
//   const data = await res.json();
//   console.log(data);
// }

export async function login(username, password) {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    return data;

    // Check if login was successful
  } catch (error) {
    console.error("Error during login:", error);
  }
}
