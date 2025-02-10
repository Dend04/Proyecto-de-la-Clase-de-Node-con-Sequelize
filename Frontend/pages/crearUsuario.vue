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
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
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
                <EyeIcon
                  v-if="showConfirmPassword"
                  class="h-5 w-5 text-gray-500"
                />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <!-- Advertencia de contraseñas no coincidentes -->
            <p
              v-if="
                passwordMatchError && createUserForm.confirmPassword.length > 0
              "
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
      <div v-if="step === 3" class="relative">
        <h2 class="text-2xl font-semibold mb-6 text-center">
          Crear Usuario - Paso 3
        </h2>
        <form @submit.prevent="handleCreateUser">
          <!-- Contenedor del cropper -->
          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-700 mb-4"
              >Foto de Perfil</label
            >

            <div
              v-if="!createUserForm.fotoPerfil"
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-teal-500 transition-colors"
              @click="$refs.fileInput.click()"
            >
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p class="mt-2 text-sm text-gray-600">
                Haz clic para subir una foto
              </p>
              <p class="text-xs text-gray-500">PNG, JPG hasta 2MB</p>
              <input
                ref="fileInput"
                type="file"
                hidden
                @change="handleFileUpload"
                accept="image/*"
              />
            </div>

            <!-- Cropper y previsualización -->
            <div v-if="createUserForm.fotoPerfil" class="relative group">
              <div
                class="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg"
              >
                <img
                  :src="croppedImagePreview"
                  class="w-full h-full object-cover"
                  alt="Previsualización de perfil"
                />

                <div
                  class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    type="button"
                    @click="showCropper = true"
                    class="p-2 rounded-full bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    <PencilIcon class="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>

              <!-- Cropper Modal -->

              <div
                v-if="showCropper"
                class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              >
                <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
                  <div class="h-96">
                    <Cropper
                      ref="cropper"
                      class="cropper rounded-lg"
                      :src="imagePreview"
                      :stencil-props="{
                        aspectRatio: 1,
                        previewClass: 'circle-preview',
                        handlersClass: 'circle-handlers',
                        movable: false,
                        scalable: false,
                      }"
                      :stencil-component="CircleStencil"
                    />
                  </div>

                  <div class="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      @click="showCropper = false"
                      class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      @click="cropImage"
                      class="px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
                    >
                      Aplicar Recorte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones de navegación -->
          <div class="flex justify-between border-t pt-6">
            <button
              type="button"
              @click="prevStep"
              class="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              ← Anterior
            </button>
            <button
              type="submit"
              class="px-6 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>

      <!-- Mensaje de éxito -->
      <div
        v-if="successMessage"
        class="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center"
      >
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
import "vue-advanced-cropper/dist/style.css";
import { PencilIcon } from "@heroicons/vue/outline";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const runtimeConfig = useRuntimeConfig();
const router = useRouter();
const apiBaseUrl = runtimeConfig.public.BACKEND_URL;
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordError = ref(false); // Estado para la advertencia de contraseña corta
const passwordMatchError = ref(false); // Estado para la advertencia de contraseñas no coincidentes
const showCropper = ref(false);
const cropper = ref(null);
const croppedImagePreview = ref(null);

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
    createUserForm.value.fotoPerfil = file; // Establecer el archivo inmediatamente
    
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
      croppedImagePreview.value = e.target.result; // Mostrar imagen sin recortar inicialmente
      showCropper.value = true; // Mostrar el cropper automáticamente
    };
    reader.readAsDataURL(file);
  }
};
// Función para procesar el recorte
const cropImage = () => {
  if (cropper.value) {
    const { canvas } = cropper.value.getResult();
    
    canvas.toBlob((blob) => {
      const file = new File([blob], "profile-image.png", {
        type: "image/png",
        lastModified: Date.now()
      });
      
      // Actualizar ambos valores
      createUserForm.value.fotoPerfil = file;
      croppedImagePreview.value = URL.createObjectURL(blob);
      showCropper.value = false;
      
    }, "image/png");
  }
};

// Función para manejar la creación de usuario
const handleCreateUser = async () => {
  try {
    // Validar que las contraseñas coincidan
    if (
      createUserForm.value.password !== createUserForm.value.confirmPassword
    ) {
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
    formData.append(
      "enfermedadCronica",
      createUserForm.value.enfermedadCronica
    );
    formData.append(
      "estadoFisicoActual",
      createUserForm.value.estadoFisicoActual
    );

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

<style>
.cropper {
  background: #f3f4f6;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.circle-preview {
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 2px white;
}

.circle-handlers {
  --color: theme("colors.teal.600");
}

.vue-advanced-cropper__background {
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z' fill='%23e5e7eb' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
}
</style>
