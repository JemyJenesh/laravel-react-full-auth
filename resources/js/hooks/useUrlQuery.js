import { useLocation } from "react-router-dom";

export default function useUrlQuery() {
	return new URLSearchParams(useLocation().search);
}
