export async function handleServiceError(handler: any) {
    try {
        return await handler();
    } catch (e) {
        return Promise.reject(e);
    }
}
