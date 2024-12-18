import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchDepartments,
  fetchDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentsApi";

import useQueryParams from "./useQueryParams";

export const useFetchDepartments = (enabled) => {
  const [queryParams, queryParamsKey] = useQueryParams();

  const query = useQuery({
    queryKey: ["departments", queryParamsKey],
    queryFn: () => fetchDepartments(queryParams),
    enabled,
  });

  return query;
};

export const useFetchDepartmentById = (id) => {
  return useQuery({
    queryKey: ["department", id],
    queryFn: () => fetchDepartment(id),
  });
};

export const useAddDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateDepartment(data.id, data.department),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["department", variables.id] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
