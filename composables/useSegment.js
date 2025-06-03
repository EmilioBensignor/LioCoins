// composables/useSegment.js
export const useSegment = () => {
    const { $i18n } = useNuxtApp()

    // Configuración específica por segmento
    const segmentConfig = {
        es: {
            currency: 'EUR',
            currencySymbol: '€',
            phone: '+34',
            country: 'España'
        },
        ar: {
            currency: 'USD',
            currencySymbol: '$',
            phone: '+54',
            country: 'Argentina'
        },
        mx: {
            currency: 'USD',
            currencySymbol: '$',
            phone: '+52',
            country: 'México'
        },
        us: {
            currency: 'USD',
            currencySymbol: '$',
            phone: '+1',
            country: 'United States'
        }
    }

    const currentSegment = computed(() => {
        return segmentConfig[$i18n.locale.value] || segmentConfig.es
    })

    // Función para formatear precios según el segmento
    const formatPrice = (amount) => {
        const config = currentSegment.value
        return `${config.currencySymbol}${amount} ${config.currency}`
    }

    // Función para obtener datos específicos del segmento desde Supabase
    const getSegmentData = async (table, filters = null) => {
        const supabase = useSupabaseClient()
        const locale = $i18n.locale.value

        // Agregar filtro de segmento a la consulta
        let query = supabase
            .from(table)
            .select('*')
            .eq('segment', locale)

        // Aplicar filtros adicionales si los hay
        if (filters) {
            Object.keys(filters).forEach(key => {
                query = query.eq(key, filters[key])
            })
        }

        return await query
    }

    return {
        currentSegment,
        formatPrice,
        getSegmentData,
        segmentConfig
    }
}