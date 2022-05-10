import axios from "axios";

class HttpService {
  async post(route: string, body: any) {
    const url = `${process.env.SERVER_URL}${route}`;
    const response = await axios.post(url, body);
    const { data } = response;
    return data;
  }

  async get(route: string) {
    const url = `${process.env.SERVER_URL}${route}`;
    const response = await axios.get(url);
    const { data } = response;

    return data;
  }
}

export default new HttpService();

//   const address = `https://randomuser.me/api/?results=6`;
//   const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
//   const { data, error } = useSWR(address, fetcher);
