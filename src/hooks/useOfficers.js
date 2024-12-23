import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchOfficers,
  addOfficer,
  deleteOfficer,
  fetchOfficer,
  updateOfficer,
} from "../api/officersApi";

import useQueryParams from "./useQueryParams";

export const useFetchOfficers = () => {
  const [queryParams, queryParamsKey] = useQueryParams();

  const query = useQuery({
    queryKey: ["officers", queryParamsKey],
    queryFn: () => fetchOfficers(queryParams),
  });

  return query;
};

export const useFetchOfficerById = (id) => {
  return useQuery({
    queryKey: ["officer", id],
    queryFn: () => fetchOfficer(id),
  });
};

export const useAddOfficer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOfficer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["officers"] });
    },
  });
};

export const useUpdateOfficer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateOfficer(data.id, data.officer),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["officers"] });
      queryClient.invalidateQueries({ queryKey: ["officers", variables.id] });
    },
  });
};

export const useDeleteOfficer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOfficer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["officers"] });
    },
  });
};
