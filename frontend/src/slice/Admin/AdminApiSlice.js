import { apiSlice } from "../../slice/Admin/ApiSlice";
const ADMIN_URL = 'http://localhost:4000/api/admin'; 

export const AdminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      adminLogin: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/authAdmin`,
          method: 'POST',
          body: data,
        }),
      }),
      adminLogout: builder.mutation({
        query: () => ({
          url: `${ADMIN_URL}/logout`,
          method: 'POST',
        }),
      }),
      adminRegister: builder.mutation({
        query: (data) => ({
          url: `${ADMIN_URL}/adminRegister`,
          method: 'POST',
          body: data,
        }),
       }),
       
    }),
  });
  
  export const { useAdminLoginMutation,useAdminLogoutMutation,useAdminRegisterMutation} = AdminApiSlice;