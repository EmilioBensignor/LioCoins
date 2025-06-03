<template>
    <header class="border-b p-4">
        <div class="flex justify-between items-center">
            <h1 class="text-center">TourExperto {{ currentSegment.country }}</h1>

            <select @change="switchLocale" :value="locale">
                <option value="es">España (EUR)</option>
                <option value="ar">Argentina (USD)</option>
                <option value="mx">México (USD)</option>
                <option value="us">United States (USD)</option>
            </select>
        </div>

        <div class="mt-2 text-sm text-gray-600">
            Segmento: {{ locale }} |
            Moneda: {{ currentSegment.currency }} |
            Teléfono: {{ currentSegment.phone }}
        </div>
    </header>
</template>

<script setup>
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const { currentSegment } = useSegment()

const switchLocale = (event) => {
    const newLocale = event.target.value

    const newPath = switchLocalePath(newLocale)
    router.push(newPath)
}
</script>