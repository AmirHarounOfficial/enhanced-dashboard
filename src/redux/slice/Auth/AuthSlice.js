import { checkEmail, checkEnterPhone, checkPassEnterPhone, FirstRegistration, forgetPassEnterEmail, forgetPassEnterPhone, forgetPassVerifyEmailOtp, forgetPassVerifyPhoneOtp, getCurrentLogin, login, register, resetPassword, SecondRegistration, sendEmail, signup, UpdateInSignup, VerifyEmailOtp, VerifyPhoneOtp } from "@/redux/api/Auth/AuthApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../../config/api";
import Cookies from "js-cookie";


/* ========== AUTH Slice ========== */

// login form (email and password)
export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (loginData, thunkAPI) => {
    try {
      const data = await login(loginData);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("provider_id", data.provider.id);

      Cookies.set("token", data.access_token, {
        expires: 7, // مدة 7 أيام
        path: "/", // متاحة في كل المسارات
        secure: true, // يفضل لما تكون على https
        sameSite: "strict",
      });

      console.log("After Login -> token:", Cookies.get("token"));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// get current login user in navbar
export const getCurrentLoginThunk = createAsyncThunk('auth/getCurrentLoginThunk',
  async(_,thunkAPI)=>{
    try{
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const data = await getCurrentLogin(token);
      return data;
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
)


/* ========== FORGET PASSWORD Slice ========== */

// forget password - enter email to send otp 
export const forgetPassEnterEmailThunk= createAsyncThunk('auth/forgetPassEnterEmailThunk',
  async({email} , thunkAPI)=>{
    try{
      const data = await forgetPassEnterEmail({email})
      return data
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }
  }
)

// forget password - enter phone to send otp
export const forgetPassEnterPhoneThunk= createAsyncThunk('auth/forgetPassEnterPhoneThunk',
  async({phone} , thunkAPI)=>{
    try{
      const data = await forgetPassEnterPhone({phone})
      return data
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }
  }
)

// forget password - verify email otp
export const forgetPassVerifyEmailOtpThunk= createAsyncThunk('auth/forgetPassVerifyEmailOtpThunk',
  async(payload , thunkAPI)=>{
    try{
      const data = await forgetPassVerifyEmailOtp(payload)
      return data.data
    }
    catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }}
  )

// forget password - verify phone otp
export const forgetPassVerifyPhoneOtpThunk= createAsyncThunk('auth/forgetPassVerifyPhoneOtpThunk',
  async(payload , thunkAPI)=>{
    try{
      const data = await forgetPassVerifyPhoneOtp(payload)
      return data
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }
  })

// Reset password API
export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPasswordThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await resetPassword(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Password reset failed");
    }
  }
);


/* ========== old SIGNUP Slice ========== */

//❌signup form
export const signupThunk = createAsyncThunk(
  "auth/signupThunk",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await signup(formData); 

      // save temp token in sessionStorage
      const token = data.access_token;
      sessionStorage.setItem("tempToken", token);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

//❌check email if exists
export const checkEmailThunk = createAsyncThunk('auth/checkEmailThunk',
  async(email , thunkAPI)=>{
    try{
      const data = await checkEmail(email)
      return data;
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }
  }
)

//✔️enter phone to send otp for new phone number
export const checkEnterPhoneThunk= createAsyncThunk('auth/checkPassEnterPhoneThunk',
  async({phone} , thunkAPI)=>{
    try{
      const data = await checkEnterPhone({phone})
      return data
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }
  }
)

//✔️verify phone otp
export const VerifyPhoneOtpThunk= createAsyncThunk('auth/VerifyPhoneOtpThunk',
  async(payload , thunkAPI)=>{
    try{
      const data = await VerifyPhoneOtp(payload)
      return data
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }
  })

//✔️ send email to send otp for new email
export const sendEmailThunk= createAsyncThunk('auth/sendEmailThunk',
  async({email} , thunkAPI)=>{
    try{
      const data = await sendEmail({email})
      return data
    }catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }
  }
)

//✔️forget password - verify email otp
export const VerifyEmailOtpThunk= createAsyncThunk('auth/VerifyEmailOtpThunk',
  async(payload , thunkAPI)=>{
    try{
      const data = await VerifyEmailOtp(payload)
      return data.data
    }
    catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Request failed'
      )
    }}
  )

/* ==========  ✔️NEW SIGNUP Slice ========== */
export const FirstRegistrationThunk = createAsyncThunk('auth/FirstRegistrationThunk',
  async(formData , {rejectWithValue})=>{
    try{
      const response = await FirstRegistration(formData)
      console.log('FirstRegistrationThunk' ,response );
      return response
    }catch(error){
      return rejectWithValue(error.response?.data?.message || "Failed to sign up data");
    }
  }
)

export const SecondRegistrationThunk = createAsyncThunk('auth/SecondRegistrationThunk',
  async({formData,token} , {rejectWithValue})=>{
    try{
      const response = await SecondRegistration(formData,token)
      console.log('SecondRegistrationThunk' ,response );
      return response
    }catch(error){
      return rejectWithValue(error.response?.data?.message || "Failed to sign up data");
    }
  }
)






/**update-profile (very important) */
export const UpdateInSignupThunk = createAsyncThunk('auth/UpdateInSignupThunk',
    async(formData,{rejectWithValue})=>{
      try{
        const response = await UpdateInSignup(formData)
        return response.data;
      }catch(error){
        return rejectWithValue(error.response?.data || { message: error.message });

      }
    }
  )

  




const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

// forget password
  otpSent: false,
  method: null,
  verified: false,
  email: "",
  phone: "",

  //signup
  emailExists: null,
  registerationData:null,
  role: "", // Add role here

};

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("provider_id");
      Cookies.remove("token");

      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.role = "";
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },

  
  extraReducers:(builder)=>{
    builder

/* ========== Login ========== */
    // loginThunk
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.provider; 
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
        state.isAuthenticated = false;
      })

    // getCurrentLoginThunk
      .addCase(getCurrentLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentLoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.provider;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

/* ========== FORGET PASSWORD APIs ========== */
    // forgetPassEnterEmailThunk
      .addCase(forgetPassEnterEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassEnterEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.method = "email";
      })
      .addCase(forgetPassEnterEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //forgetPassEnterPhoneThunk
      .addCase(forgetPassEnterPhoneThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassEnterPhoneThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.method = "phone";
      })
      .addCase(forgetPassEnterPhoneThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // // forgetPassVerifyEmailOtpThunk
      .addCase(forgetPassVerifyEmailOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassVerifyEmailOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(forgetPassVerifyEmailOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  
      
      // // forgetPassVerifyPhoneOtpThunk
      .addCase(forgetPassVerifyPhoneOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      } )
      .addCase(forgetPassVerifyPhoneOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(forgetPassVerifyPhoneOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset password
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
/* ==========  ❌old SIGNUP APIs ========== */
      // signupThunk
      .addCase(signupThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // checkEmailThunk
      .addCase(checkEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.emailExists = action.payload.exists;
      })
      .addCase(checkEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.emailExists = null;
      })

      //forgetPassEnterPhoneThunk
      .addCase(checkEnterPhoneThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkEnterPhoneThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.method = "phone";
      })
      .addCase(checkEnterPhoneThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //VerifyPhoneOtpThunk
      .addCase(VerifyPhoneOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyPhoneOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.method = "phone";
      })
      .addCase(VerifyPhoneOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // sendEmailThunk
      .addCase(sendEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.method = "email";
      })
      .addCase(sendEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // VerifyEmailOtpThunk
      .addCase(VerifyEmailOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyEmailOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(VerifyEmailOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  
/* ==========  ✔️NEW SIGNUP APIs ========== */
      // FirstRegistrationThunk
      .addCase(FirstRegistrationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FirstRegistrationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.registerationData = action.payload;
      })
      .addCase(FirstRegistrationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // SecondRegistrationThunk
      .addCase(SecondRegistrationThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SecondRegistrationThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.registerationData = action.payload;
      })
      .addCase(SecondRegistrationThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })













        // UpdateInSignupThunk
      .addCase(UpdateInSignupThunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(UpdateInSignupThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UpdateInSignupThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })





    
    
    
  }
})

export const {logout, setRole } = authSlice.actions;

export default authSlice.reducer;
