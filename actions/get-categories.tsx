import { db } from "@/lib/firebase";
import { Category } from "@/types";

const STORE_ID = process.env.STORE_ID!;

const getCategories = async (): Promise<Category[]> => {
    try {
        const categoriesSnapshot = await db
            .collection('stores')
            .doc(STORE_ID)
            .collection('categories')
            .orderBy('createdAt', 'desc')
            .get();

        const categories: Category[] = categoriesSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                billboard: {
                    id: data.billboardId,
                    label: data.billboardLabel,
                    imageUrl: data.billboardImageUrl
                }
            };
        });

        return categories;
    } catch (error) {
        console.warn('Error fetching categories:', error);
        return [];
    }
};

export default getCategories;
