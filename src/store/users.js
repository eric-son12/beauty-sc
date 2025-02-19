import axios from "../utils/axiosConfig";

const BASE_URL = `https://spacesport.pro/api`;

export const initialUsers = {
  users: undefined,
};

export function usersActions(set, get) {
  return {
    fetchUsers: async () => {
      set((state) => {
        state.loading.isLoading = true;
      });
      try {
        const body = {
          name: "",
          status: "",
          role: "",
          pageSize: 500,
          pageNumber: 1,
        };
        const response = await axios.post(`${BASE_URL}/users/list`, body);
        const userList = response.data?.data?.list || undefined;
        set((state) => {
          state.users.users = userList;
        });
      } catch (error) {
        set((state) => {
          const message = error?.response?.data?.message || error?.message;
          state.notification.data.push({
            status: "ERROR",
            content: message,
          });
        });
      } finally {
        set((state) => {
          state.loading.isLoading = false;
        });
      }
    },
    getVolunteerDetail: async (userId) => {
      set((state) => {
        state.loading.isLoading = true;
      });
      try {
        const response = await axios.post(
          `${BASE_URL}/volunteers/detail?userId=${userId}`
        );
        return response.data?.data || undefined;
      } catch (error) {
        set((state) => {
          const message = error?.response?.data?.message || error?.message;
          state.notification.data.push({
            status: "ERROR",
            content: message,
          });
        });
      } finally {
        set((state) => {
          state.loading.isLoading = false;
        });
      }
    },
    confirmVolunteer: async (userId, status) => {
      set((state) => {
        state.loading.isLoading = true;
      });
      try {
        const body = {
          volunteerId: userId,
          status: status, // Waiting, Reject
        };
        await axios.post(`${BASE_URL}/volunteers/confirm`, body);
        set((state) => {
          state.notification.data.push({
            status: "SUCCESS",
            content: "Change application volunteer successfully",
          });
        });
        return true;
      } catch (error) {
        set((state) => {
          const message = error?.response?.data?.message || error?.message;
          state.notification.data.push({
            status: "ERROR",
            content: message,
          });
        });
        return false;
      } finally {
        set((state) => {
          state.loading.isLoading = false;
        });
      }
    },
    deactivateUser: async (userId) => {
      set((state) => {
        state.loading.isLoading = true;
      });
      try {
        await axios.post(`${BASE_URL}/users/deactivate?userId=${userId}`);
        set((state) => {
          state.notification.data.push({
            status: "SUCCESS",
            content: "Deactivate user successfully",
          });
        });
      } catch (error) {
        set((state) => {
          const message = error?.response?.data?.message || error?.message;
          state.notification.data.push({
            status: "ERROR",
            content: message,
          });
        });
      } finally {
        set((state) => {
          state.loading.isLoading = false;
        });
      }
    },
  };
}
