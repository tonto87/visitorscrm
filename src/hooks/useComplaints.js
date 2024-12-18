import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchComplaints,
  fetchComplaint,
  addComplaint,
  updateComplaint,
  deleteComplaint,
} from "../api/complaintsApi";

export const useFetchComplaints = () => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: fetchComplaints,
  });
};

export const useFetchComplaintById = (id) => {
  return useQuery({
    queryKey: ["complaint", id],
    queryFn: () => fetchComplaint(id),
  });
};

export const useAddComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComplaint,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["complaints"] }),
  });
};

export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data, avatar, name }) =>
      updateComplaint(id, data, avatar, name),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["complaints"] }),
  });
};

export const useDeleteComplaint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComplaint,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["complaints"] }),
  });
};
