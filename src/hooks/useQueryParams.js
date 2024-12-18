import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const queryParamsKey = useMemo(() => queryParams.toString(), [queryParams]);

  return [queryParams, queryParamsKey];
};

export default useQueryParams;
