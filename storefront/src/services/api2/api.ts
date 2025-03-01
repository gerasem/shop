import { sdk } from '@/services/medusa/config'
import { useLoader } from '@/composables/useLoader'
import { useToastStore } from '@/stores/ToastStore'

const loader = useLoader()

class ApiService {
    static async handleRequest<T>(id: string, callback: () => Promise<T>): Promise<T | null> {
        try {
            loader.stopLoading(id)
            return await callback();
        } catch (error: unknown) {
            const toastStore = useToastStore()

            if (error instanceof Error) {
                console.error('API Error:', error.message)
                toastStore.addError('API Error', error.message)
            } else {
                console.error('API Error:', error)
            }

            throw error
        }
        finally {
            loader.stopLoading(id)
        }
    }

    static async getCategories() {
        return this.handleRequest('get-categories', async () => {
            const { product_categories } = await sdk.store.category.list();
            return product_categories.map((product) => ({
                ...product,
                image: `https://placehold.co/200?text=${product.name}`,
            }));
        });
    }
}

export default ApiService;