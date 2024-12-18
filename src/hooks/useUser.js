import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchUsers,
  addUser,
  deleteUser,
  fetchUser,
  updateUser,
  fetchRoles,
} from "../api/usersApi";

import useQueryParams from "./useQueryParams";

export const useFetchUsers = (enabled) => {
  const [queryParams, queryParamsKey] = useQueryParams();

  const query = useQuery({
    queryKey: ["users", queryParamsKey],
    queryFn: () => fetchUsers(queryParams),
    enabled,
  });

  return query;
};

export const useFetchUserById = (id) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id),
  });
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateUser(data.id, data.user),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useFetchRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });
};
