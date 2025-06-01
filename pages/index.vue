<template>
    <h1>Index</h1>
    <button @click="signOut()">Log Out</button>
</template>

<script setup>
import { ROUTE_NAMES } from "~/constants/ROUTE_NAMES";

const router = useRouter();
const loggingOut = ref(false);

async function signOut() {
    if (loggingOut.value) return;

    loggingOut.value = true;

    try {
        const supabase = useSupabaseClient();
        const { error } = await supabase.auth.signOut();
        if (error) throw error;

        // localStorage.removeItem('lastLoginEmail');

        router.push(ROUTE_NAMES.LOGIN);
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
    } finally {
        loggingOut.value = false;
    }
}
</script>