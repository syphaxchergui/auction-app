import { useLocalStorage } from "react-use";

const useToken = (tokenName) => useLocalStorage(tokenName);

export default useToken;
