<template>
    <DefaultTitleH1>Restablecer contraseña</DefaultTitleH1>
    <div class="max-w-[480px] flex flex-col items-center gap-4 lg:gap-6">
        <p class="lg:text-xl">
            Se envió un correo electrónico a {{ email }} para poder
            reestablecer la contraseña.
        </p>
        <div class="w-full">
            <p class="lg:text-xl">¿El correo electrónico indicado no es correcto?</p>
            <NuxtLink :to="ROUTE_NAMES.FORGOT_PASSWORD" class="text-black lg:text-xl underline">
                Modificar.
            </NuxtLink>
        </div>
        <ButtonSecondary :to="ROUTE_NAMES.LOGIN">
            Volver a Iniciar Sesión
        </ButtonSecondary>
    </div>
</template>

<script setup>
import { ROUTE_NAMES } from '~/constants/ROUTE_NAMES';

definePageMeta({
    layout: "auth",
});

const route = useRoute();
const email = ref('');

watch(() => route.query.email, (newEmail) => {
    if (newEmail) {
        email.value = newEmail;
    }
}, { immediate: true });
</script>