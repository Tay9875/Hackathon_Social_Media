<script setup>
import { addUser } from "@/api/signupApi";
import { ref } from "vue";
import { useRouter } from "vue-router";

const avatarUrl = ref("");
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const birthdate = ref("");
const gender = ref("");
const address = ref("");
const errorMessage = ref("");

const router = useRouter();
const firstnameError = ref("");
const lastnameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const birthdateError = ref("");
const genderError = ref("");

const validateFields = () => {
  let valid = true;

  firstnameError.value = firstname.value ? "" : "Firstname is required";
  lastnameError.value = lastname.value ? "" : "Lastname is required";
  emailError.value = email.value ? "" : "Email is required";
  passwordError.value = password.value ? "" : "Password is required";
  birthdateError.value = birthdate.value ? "" : "Birthdate is required";
  genderError.value = gender.value ? "" : "Gender is required";

  if (!firstname.value || !lastname.value || !email.value || !password.value || !birthdate.value || !gender.value) {
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
  if (email.value && !emailRegex.test(email.value)) {
    emailError.value = "Invalid email address";
    valid = false;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/;
  if (password.value) {
    if (password.value.length < 8) {
      passwordError.value = "Password must be at least 8 characters long";
      valid = false;
    } else if (!passwordRegex.test(password.value)) {
      passwordError.value = "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be 8 to 64 characters long.";
      valid = false;
    }
  }

  return valid;
};

const handleSignup = async () => {
  errorMessage.value = "";

  if (!validateFields()) {
    return;
  }

  try {
    await addUser({
      firstname: firstname.value,
      email: email.value,
      avatar: avatarUrl.value,
      password: password.value,
      description: "",
      gender: gender.value,
      lastname: lastname.value,
      birthdate: birthdate.value,
      address: address.value,
    });
  } catch (error) {
    errorMessage.value = error.message + ". Please try again.";
    return;
  }

  firstnameError.value =
    lastnameError.value =
    emailError.value =
    passwordError.value =
    birthdateError.value =
    genderError.value =
    "";

  router.push("/");
};
</script>

<template>
  <div class="min-h-[calc(100vh-128px)] flex justify-center">
    <div
      class="max-w-screen-xl m-0 bg-white shadow sm:rounded-lg flex justify-center flex-1"
    >
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold">Sign Up</h1>
          <div class="w-full flex-1 mt-8">
            <form
              @submit.prevent="handleSignup()"
              class="mx-auto flex flex-col gap-3.5"
            >
              <div class="flex flex-col items-center mb-4">
                <div
                  class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 mb-2"
                >
                  <img
                    v-if="avatarUrl"
                    :src="avatarUrl"
                    alt="Avatar"
                    class="w-full h-full object-cover rounded-full"
                    @error="avatarUrl = ''"
                  />
                  <span v-else class="text-gray-400">Avatar</span>
                </div>
                <input
                  class="w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Avatar image URL"
                  v-model="avatarUrl"
                />
              </div>
              <div class="flex space-x-4">
                <div class="w-full text-left">
                  <input
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Firstname"
                    v-model="firstname"
                  />
                  <span v-if="firstnameError" class="text-red-500 text-xs">{{ firstnameError }}</span>
                </div>
                <div class="w-full text-left">
                  <input
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Lastname"
                    v-model="lastname"
                  />
                  <span v-if="lastnameError" class="text-red-500 text-xs">{{ lastnameError }}</span>
                </div>
              </div>
              <div class="flex space-x-4">
                <div class="w-full text-left">
                  <input
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="date"
                    placeholder="Birthdate"
                    v-model="birthdate"
                  />
                  <span v-if="birthdateError" class="text-red-500 text-xs">{{ birthdateError }}</span>
                </div>
                <div class="w-full text-left">
                  <select
                    class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    v-model="gender"
                  >
                    <option value="" disabled selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <span v-if="genderError" class="text-red-500 text-xs">{{ genderError }}</span>
                </div>
              </div>
              <input
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Address"
                  v-model="address"
                />
              <div class="w-full text-left">
                <input
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                />
                <span v-if="emailError" class="text-red-500 text-xs">{{ emailError }}</span>
              </div>
              <div class="w-full text-left">
                <input
                  class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
                <span v-if="passwordError" class="text-red-500 text-xs">{{ passwordError }}</span>
              </div>
              <div v-if="errorMessage" class="text-red-500 text-sm text-center">
                {{ errorMessage }}
              </div>
              <button
                type="submit"
                class="cursor-pointer mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  class="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span class="ml-3"> Sign Up </span>
              </button>
            </form>
            <div class="mt-6 text-center">
              <span class="text-gray-600">Already have an account?</span>
              <router-link
                to="/login"
                class="text-indigo-500 hover:underline ml-1"
                >Log In</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
