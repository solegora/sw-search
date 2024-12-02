export const successResponse = (response) => (
    {
        data: response.results,
        error: null,
    })

export const errorResponse = (response, action = {}) => {
    return {
        data: action.payload,
    }
}
