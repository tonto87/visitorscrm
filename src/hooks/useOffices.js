import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchOffices,
  addOffice,
  deleteOffice,
  fetchOffice,
  updateOffice,
} from "../api/officesApi";

import useQueryParams from "./useQueryParams";

export const useFetchOffices = (enabled) => {
  const [queryParams, queryParamsKey] = useQueryParams();

  const query = useQuery({
    queryKey: ["offices", queryParamsKey],
    queryFn: () => fetchOffices(queryParams),
    enabled,
  });

  return query;
};

export const useFetchOfficeById = (id) => {
  return useQuery({
    queryKey: ["office", id],
    queryFn: () => fetchOffice(id),
  });
};

export const useAddOffice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
  });
};

export const useUpdateOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateOffice(data.id, data.office),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["offices"] });
      queryClient.invalidateQueries({ queryKey: ["offices", variables.id] });
    },
  });
};

export const useDeleteOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] });
    },
  });
};
