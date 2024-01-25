const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const headers = {
  "Content-Type": "application/json",
};

export const fetchMe = async () => {
  try {
    const data = await fetch(`${baseURL}/users/me`, { headers });
    return data.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
