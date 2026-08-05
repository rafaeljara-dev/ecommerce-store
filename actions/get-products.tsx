import { db } from "@/lib/firebase";
import { Product } from "@/types";

const STORE_ID = process.env.STORE_ID!;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    try {
        let firestoreQuery: FirebaseFirestore.Query = db
            .collection('stores')
            .doc(STORE_ID)
            .collection('products')
            .where('isArchived', '==', false);

        if (query.categoryId) {
            firestoreQuery = firestoreQuery.where('categoryId', '==', query.categoryId);
        }

        if (query.colorId) {
            firestoreQuery = firestoreQuery.where('colorId', '==', query.colorId);
        }

        if (query.sizeId) {
            firestoreQuery = firestoreQuery.where('sizeId', '==', query.sizeId);
        }

        if (query.isFeatured) {
            firestoreQuery = firestoreQuery.where('isFeatured', '==', true);
        }

        const productsSnapshot = await firestoreQuery
            .orderBy('createdAt', 'desc')
            .get();

        const products: Product[] = productsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                price: String(data.price || 0),
                isFeatured: data.isFeatured || false,
                category: {
                    id: data.categoryId || '',
                    name: data.categoryName || '',
                    billboard: {
                        id: '',
                        label: '',
                        imageUrl: ''
                    }
                },
                size: {
                    id: data.sizeId || '',
                    name: data.sizeName || '',
                    value: data.sizeValue || ''
                },
                color: {
                    id: data.colorId || '',
                    name: data.colorName || '',
                    value: data.colorValue || ''
                },
                images: (data.images || []).map((img: any, index: number) => ({
                    id: `${doc.id}-${index}`,
                    url: img.url
                }))
            };
        });

        return products;
    } catch (error) {
        console.warn('Error fetching products:', error);
        return [];
    }
};

export default getProducts;
