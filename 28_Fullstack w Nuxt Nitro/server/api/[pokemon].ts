export default defineEventHandler(async event => {
    try {
        const { pokemon } = event.context.params
        const data  = await $fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        const cusomizedResponse = {
            id: data.id,
            name: data.name,
            sprite: data.sprites.front_default
        }
        
        return cusomizedResponse
    } catch (error) {
        throw createError({
            statusCode: 404,
            message: 'Pokemon not found!'
        })
    }
    
})