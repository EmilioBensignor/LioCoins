<template>
    <div>
        <h2>Página Principal - Segmento: {{ locale.toUpperCase() }}</h2>

        <div class="mt-4">
            <h3>Tours Destacados</h3>

            <div class="grid gap-4 mt-2">
                <div class="border p-4 rounded">
                    <h4>Tour Ciudad</h4>
                    <p>Precio: {{ formatPrice(299) }}</p>
                </div>

                <div class="border p-4 rounded">
                    <h4>Tour Aventura</h4>
                    <p>Precio: {{ formatPrice(599) }}</p>
                    <p>Contacto: {{ currentSegment.country }}</p>
                </div>
            </div>
        </div>

        <div class="mt-6">
            <h3>Tours desde Base de Datos</h3>
            <button @click="loadTours" class="bg-blue-500 text-white px-4 py-2 rounded">
                Cargar Tours del Segmento {{ locale.toUpperCase() }}
            </button>

            <div v-if="tours.length" class="mt-4">
                <div v-for="tour in tours" :key="tour.id" class="border p-3 mb-2">
                    <h4>{{ tour.name }}</h4>
                    <p>{{ formatPrice(tour.price) }}</p>
                </div>
            </div>
        </div>

        <div class="mt-6">
            <nav class="space-x-4">
                <NuxtLink :to="localePath('/tours')" class="text-blue-600">
                    Ver Todos los Tours
                </NuxtLink>
                <NuxtLink :to="localePath('/about')" class="text-blue-600">
                    Acerca de
                </NuxtLink>
                <button @click="signOut()" class="bg-red-500 text-white px-3 rounded-md">Log Out</button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ROUTE_NAMES } from "~/constants/ROUTE_NAMES";

const router = useRouter();
const loggingOut = ref(false);

// Importar composables de i18n correctamente
const { locale } = useI18n()
const localePath = useLocalePath()

// Usar el composable de segmentos
const { currentSegment, formatPrice, getSegmentData } = useSegment()

// Estado reactivo para tours
const tours = ref([])

// Función para cargar tours específicos del segmento
const loadTours = async () => {
    try {
        // Consulta real a Supabase filtrada por segmento
        const { data, error } = await getSegmentData('tours', { active: true })

        if (error) {
            console.error('Error cargando tours:', error)
            // Datos de fallback si falla Supabase
            tours.value = [
                { id: 1, name: `Tour Local ${currentSegment.value.country}`, price: 199 },
                { id: 2, name: `Excursión Premium ${currentSegment.value.country}`, price: 399 }
            ]
            return
        }

        tours.value = data || []

        // Si no hay datos en la BD, mostrar datos de ejemplo
        if (tours.value.length === 0) {
            tours.value = [
                { id: 1, name: `No hay tours para ${currentSegment.value.country}`, price: 0 }
            ]
        }

    } catch (error) {
        console.error('Error conectando a Supabase:', error)
        // Datos de fallback
        tours.value = [
            { id: 1, name: `Tour Local ${currentSegment.value.country}`, price: 199 },
            { id: 2, name: `Excursión Premium ${currentSegment.value.country}`, price: 399 }
        ]
    }
}

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

// Configuración SEO específica por segmento
useHead({
    title: `TourExperto ${currentSegment.value.country}`,
    meta: [
        {
            name: 'description',
            content: `Descubre los mejores tours en ${currentSegment.value.country} con precios en ${currentSegment.value.currency}`
        }
    ]
})
</script>