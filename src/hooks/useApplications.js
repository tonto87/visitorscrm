import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchApplications,
  addApplication,
  deleteApplication,
  fetchApplication,
  updateApplication,
  blockApplicationApi,
  fetchDocumentTypes,
  fetchApplicationComplaints,
  fetchInfoByDoc,
  startVisit,
  endVisit,
  unblockApplicationApi,
} from "../api/applicationsApi";

import useQueryParams from "./useQueryParams";

export const useFetchApplications = () => {
  const [queryParams, queryParamsKey] = useQueryParams();

  const query = useQuery({
    queryKey: ["applications", queryParamsKey],
    queryFn: () => fetchApplications(queryParams),
  });

  return query;
};

export const useFetchApplicationById = (id) => {
  return useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplication(id),
  });
};
export const useAddApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (Application) => {
      console.log("Отправляемые данные:", Application);
      return addApplication(Application);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      console.error(
        "Ошибка при добавлении заявки:",
        error.response?.data || error.message,
      );
    },
  });
};

export const useFetchApplicationComplaints = (id) => {
  return useQuery({
    queryKey: ["applicationComplaint", id],
    queryFn: () => fetchApplicationComplaints(id),
  });
};

export const useUpdateApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      updateApplication(data.id, {
        ...data.application,
        visit_time: data.visit_time.replace("T", " "),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application", variables?.id?.toString()],
      });
    },
  });
};

export const useBlockApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => blockApplicationApi(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application", id.toString()],
      });
    },
    onError: (error) => {
      console.error("Error blocking Application:", error);
      console.error(`Failed to block Application: ${error.message}`);
    },
  });
};

export const useUnBlockApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ docId }) => unblockApplicationApi(docId),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application", id.toString()],
      });
    },
    onError: (error) => {
      console.error("Error unblocking Application:", error);
      console.error(`Failed to unblock Application: ${error.message}`);
    },
  });
};

export const useDeleteApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export const useFetchDocumentTypes = () => {
  return useQuery({
    queryKey: ["documentTypes"],
    queryFn: fetchDocumentTypes,
  });
};

export const useInfoByDoc = () => {
  return useMutation({
    mutationFn: fetchInfoByDoc,
  });
};

export const useStartVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: ["startVisit"],
    mutationFn: startVisit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application", id.toString()],
      });
    },
  });
};

export const useEndVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: ["endVisit"],
    mutationFn: endVisit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({
        queryKey: ["application", id.toString()],
      });
    },
  });
};
