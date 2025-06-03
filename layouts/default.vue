<template>
    <div>
        <!-- Header mínimo -->
        <header class="border-b p-4">
            <div class="flex justify-between items-center">
                <h1>TourExperto {{ currentSegment.country }}</h1>

                <!-- Selector de segmento -->
                <select @change="switchLocale" :value="locale">
                    <option value="es">España (EUR)</option>
                    <option value="ar">Argentina (USD)</option>
                    <option value="mx">México (USD)</option>
                    <option value="us">United States (USD)</option>
                </select>
            </div>

            <!-- Info del segmento actual -->
            <div class="mt-2 text-sm text-gray-600">
                Segmento: {{ locale }} |
                Moneda: {{ currentSegment.currency }} |
                Teléfono: {{ currentSegment.phone }}
            </div>
        </header>

        <!-- Contenido -->
        <main class="p-4">
            <slot />
        </main>
    </div>
</template>

<script setup>
// Importar composables de i18n correctamente
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

// Usar el composable de segmentos
const { currentSegment } = useSegment()

// Función para cambiar de segmento
const switchLocale = (event) => {
    const newLocale = event.target.value

    // Usar switchLocalePath para mantener la ruta actual
    const newPath = switchLocalePath(newLocale)
    router.push(newPath)
}
</script>