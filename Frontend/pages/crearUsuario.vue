<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <!-- Paso 1: Datos básicos -->
      <div v-if="step === 1">
        <h2 class="text-2xl font-semibold mb-6 text-center">
          Crear Usuario - Paso 1
        </h2>
        <form @submit.prevent="nextStep">
          <!-- Nombre -->
          <div class="mb-4">
            <label for="nombre" class="block text-sm font-medium text-gray-700"
              >Nombre</label
            >
            <input
              v-model="createUserForm.nombre"
              type="text"
              id="nombre"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ej: Juan"
              required
            />
          </div>
          <!-- Segundo Nombre -->
          <div class="mb-4">
            <label
              for="segundoNombre"
              class="block text-sm font-medium text-gray-700"
              >Segundo Nombre</label
            >
            <input
              v-model="createUserForm.segundoNombre"
              type="text"
              id="segundoNombre"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ej: Antonio"
            />
          </div>
          <!-- Apellidos -->
          <div class="mb-4">
            <label
              for="apellidos"
              class="block text-sm font-medium text-gray-700"
              >Apellidos</label
            >
            <input
              v-model="createUserForm.apellidos"
              type="text"
              id="apellidos"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ej: Pérez García"
              required
            />
          </div>
          <!-- Peso -->
          <div class="mb-4">
            <label for="peso" class="block text-sm font-medium text-gray-700"
              >Peso (kg)</label
            >
            <input
              v-model="createUserForm.peso"
              type="number"
              id="peso"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ej: 75.5"
              required
            />
          </div>
          <!-- Altura -->
          <div class="mb-4">
            <label for="altura" class="block text-sm font-medium text-gray-700"
              >Altura (cm)</label
            >
            <input
              v-model="createUserForm.altura"
              type="number"
              id="altura"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ej: 175.5"
              required
            />
          </div>
          <!-- Enfermedad Crónica -->
          <div class="mb-4">
            <label
              for="enfermedadCronica"
              class="block text-sm font-medium text-gray-700"
              >Enfermedad Crónica</label
            >
            <select
              v-model="createUserForm.enfermedadCronica"
              id="enfermedadCronica"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="Ninguna">Ninguna</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Hipertensión">Hipertensión</option>
              <option value="Asma">Asma</option>
              <option value="Artritis">Artritis</option>
              <option value="Enfermedad cardíaca">Enfermedad cardíaca</option>
            </select>
          </div>
          <!-- Estado Físico Actual -->
          <div class="mb-6">
            <label
              for="estadoFisicoActual"
              class="block text-sm font-medium text-gray-700"
              >Estado Físico Actual</label
            >
            <select
              v-model="createUserForm.estadoFisicoActual"
              id="estadoFisicoActual"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="Poco saludable">Poco saludable</option>
              <option value="Saludable">Saludable</option>
              <option value="Muy saludable">Muy saludable</option>
              <option value="Atleta">Atleta</option>
            </select>
          </div>
          <!-- Botón para avanzar al siguiente paso -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-800"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>

      <!-- Paso 2: Datos adicionales -->
      <div v-if="step === 2">
        <h2 class="text-2xl font-semibold mb-6 text-center">
          Crear Usuario - Paso 2
        </h2>
        <form @submit.prevent="nextStep">
          <!-- Nombre de Usuario -->
          <div class="mb-4">
            <label
              for="nombreUsuario"
              class="block text-sm font-medium text-gray-700"
              >Nombre de Usuario</label
            >
            <input
              v-model="createUserForm.nombreUsuario"
              type="text"
              id="nombreUsuario"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ej: juanperez"
              required
            />
          </div>
          <!-- Correo Electrónico -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo Electrónico</label
            >
            <input
              v-model="createUserForm.email"
              type="email"
              id="email"
              class="mt-1 p-2 w-full border border-gray-300 rounded-md"
              placeholder="Ej: juan@ejemplo.com"
              required
            />
          </div>
          <!-- Campo de Contraseña -->
          <div class="mb-4 relative">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div class="relative">
              <input
                v-model="createUserForm.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md pr-10"
                placeholder="Ej: password123"
                required
                @input="validatePassword"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <EyeIcon v-if="showPassword" class="h-5 w-5 text-gray-500" />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <!-- Advertencia de contraseña corta -->
            <p
              v-if="passwordError && createUserForm.password.length > 0"
              class="text-sm text-red-500 mt-1"
            >
              La contraseña debe tener al menos 8 caracteres.
            </p>
          </div>
          <!-- Campo de Confirmar Contraseña -->
          <div class="mb-6 relative">
            <label
              for="confirmPassword"
              class="block text-sm font-medium text-gray-700"
            >
              Confirmar Contraseña
            </label>
            <div class="relative">
              <input
                v-model="createUserForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                class="mt-1 p-2 w-full border border-gray-300 rounded-md pr-10"
                placeholder="Ej: password123"
                required
                @input="validatePasswordMatch"
              />
              <button
                type="button"
                @click="toggleConfirmPasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                <EyeIcon v-if="showConfirmPassword" class="h-5 w-5 text-gray-500" />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <!-- Advertencia de contraseñas no coincidentes -->
            <p
              v-if="passwordMatchError && createUserForm.confirmPassword.length > 0"
              class="text-sm text-red-500 mt-1"
            >
              Las contraseñas no coinciden.
            </p>
          </div>
          <!-- Botón para avanzar al siguiente paso -->
          <div class="flex justify-between">
            <button
              type="button"
              @click="prevStep"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Anterior
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-800"
            >
              Siguiente
            </button>
          </div>
        </form>
      </div>

      <!-- Paso 3: Subir foto de perfil -->
      <div v-if="step === 3">
        <h2 class="text-2xl font-semibold mb-6 text-center">Crear Usuario - Paso 3</h2>
        <form @submit.prevent="handleCreateUser">
          <!-- Foto de Perfil -->
          <div class="mb-4">
            <label for="fotoPerfil" class="block text-sm font-medium text-gray-700">Foto de Perfil</label>
            <div class="mt-1 flex items-center justify-center">
              <div class="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                <!-- Mostrar la imagen seleccionada o el ícono predeterminado -->
                <img
                  v-if="createUserForm.fotoPerfil"
                  :src="imagePreview"
                  alt="Foto de perfil"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gray-200">
                  <!-- Ícono de perfil predeterminado de Heroicons -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <input
              type="file"
              id="fotoPerfil"
              name="fotoPerfil"
              @change="handleFileUpload"
              class="mt-4 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <!-- Botón para crear usuario -->
          <div class="flex justify-between">
            <button
              type="button"
              @click="prevStep"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Anterior
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-teal-700 rounded-md hover:bg-teal-800"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>

      <!-- Mensaje de éxito -->
      <div v-if="successMessage" class="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center">
        {{ successMessage }}
      </div>
      <!-- Enlace para iniciar sesión -->
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          ¿Ya tienes una cuenta?
          <NuxtLink to="/login" class="text-teal-700 hover:underline">
            Iniciar Sesión
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { EyeIcon, EyeOffIcon } from "@heroicons/vue/solid"; // Importa los íconos

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordError = ref(false); // Estado para la advertencia de contraseña corta
const passwordMatchError = ref(false); // Estado para la advertencia de contraseñas no coincidentes

// Función para alternar la visibilidad de la contraseña
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Función para alternar la visibilidad de la confirmación de contraseña
const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

// Función para validar la longitud de la contraseña
const validatePassword = () => {
  passwordError.value = createUserForm.value.password.length < 8;
};

// Función para validar que las contraseñas coincidan
const validatePasswordMatch = () => {
  passwordMatchError.value =
    createUserForm.value.password !== createUserForm.value.confirmPassword;
};

// Estado para el formulario de creación de usuario
const createUserForm = ref({
  nombre: "",
  segundoNombre: "",
  apellidos: "",
  nombreUsuario: "",
  email: "",
  password: "",
  confirmPassword: "",
  peso: null,
  altura: null,
  enfermedadCronica: "Ninguna", // Valor predeterminado
  estadoFisicoActual: "Poco saludable", // Valor predeterminado
  fotoPerfil: null,
});

// Estado para la vista previa de la imagen
const imagePreview = ref(null);

// Estado para el mensaje de éxito
const successMessage = ref("");

// Estado para el paso actual
const step = ref(1);

// Función para avanzar al siguiente paso
const nextStep = () => {
  step.value++;
};

// Función para retroceder al paso anterior
const prevStep = () => {
  step.value--;
};

// Función para manejar la subida de archivos
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    createUserForm.value.fotoPerfil = file;
    // Crear una URL temporal para la vista previa de la imagen
    imagePreview.value = URL.createObjectURL(file);
  }
};

// Función para manejar la creación de usuario
const handleCreateUser = async () => {
  try {
    // Validar que las contraseñas coincidan
    if (createUserForm.value.password !== createUserForm.value.confirmPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    // Validar la longitud de la contraseña
    if (createUserForm.value.password.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    // Crear un FormData para enviar los datos del formulario
    const formData = new FormData();

    // Agregar todos los campos al FormData
    formData.append("nombre", createUserForm.value.nombre);
    formData.append("segundoNombre", createUserForm.value.segundoNombre);
    formData.append("apellidos", createUserForm.value.apellidos);
    formData.append("nombreUsuario", createUserForm.value.nombreUsuario);
    formData.append("email", createUserForm.value.email);
    formData.append("password", createUserForm.value.password);
    formData.append("peso", createUserForm.value.peso);
    formData.append("altura", createUserForm.value.altura);
    formData.append("enfermedadCronica", createUserForm.value.enfermedadCronica);
    formData.append("estadoFisicoActual", createUserForm.value.estadoFisicoActual);

    // Agregar la foto de perfil si existe
    if (createUserForm.value.fotoPerfil) {
      formData.append("fotoPerfil", createUserForm.value.fotoPerfil);
    }

    // Enviar la solicitud al backend
    const response = await fetch(`${apiBaseUrl}/crearUsuario`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }

    // Mostrar mensaje de éxito
    successMessage.value = "Usuario creado con éxito. Redirigiendo al login...";

    // Redirigir al usuario al login después de 3 segundos
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
  }
};
</script>