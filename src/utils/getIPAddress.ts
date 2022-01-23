import axios from "axios"

export async function getIPAddress(): Promise<string> {
  const res = await axios.get("https://api.ipify.org")
  if (typeof res.data === "string") {
    return res.data
  } else {
    throw new Error("wrong api response type")
  }
}
